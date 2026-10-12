const symbols = ["KOSPI", "KOSDAQ", "^GSPC", "^IXIC", "^DJI", "^N225", "TOPIX", "^FTSE", "MCX:INDEXFTSE", "000001", "399106"];
const yahooSymbols = {"KOSPI":"%5EKS11","KOSDAQ":"%5EKQ11","^GSPC":"%5EGSPC","^IXIC":"%5EIXIC","^DJI":"%5EDJI","^N225":"%5EN225","TOPIX":"%5ETOPIX","^FTSE":"%5EFTSE","MCX:INDEXFTSE":"%5EMCX","000001":"000001.SS","399106":"399106.SZ"};

async function getQuotes(request){
  const cache = caches.default;
  const cacheKey = new Request(new URL("/market-data.json?v=2", request.url), request);
  const cached = await cache.match(cacheKey);
  if(cached) return cached;
  const quotes = {};
  await Promise.all(symbols.map(async symbol=>{
    try {
      const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbols[symbol]}?range=5d&interval=1d`, {headers:{"User-Agent":"Mozilla/5.0"}});
      if(!response.ok) return;
      const result = (await response.json()).chart?.result?.[0];
      const meta = result?.meta;
      const value = meta?.regularMarketPrice;
      const closes = result?.indicators?.quote?.[0]?.close?.filter(item => typeof item === "number") || [];
      const previous = typeof meta?.previousClose === "number" ? meta.previousClose : closes.length > 1 ? closes[closes.length - 2] : null;
      if(typeof value === "number") quotes[symbol] = {value, change:typeof previous === "number" ? value-previous : null, percent:typeof previous === "number" && previous ? ((value-previous)/previous)*100 : null};
    } catch {}
  }));
  const response = new Response(JSON.stringify({updatedAt:new Date().toISOString(),quotes}), {headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=600"}});
  await cache.put(cacheKey,response.clone());
  return response;
}

async function getDailyMenu(request,env){
  const kst=new Date(Date.now()+9*60*60*1000);
  const date=kst.toISOString().slice(0,10);
  const cache=caches.default;
  const cacheKey=new Request(new URL(`/daily-menu.json?date=${date}`,request.url),request);
  const cached=await cache.match(cacheKey);
  if(cached)return cached;
  const apiKey=env.FOODSAFETY_API_KEY||"sample";
  const endpoint=apiKey==="sample"?"https://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/5":`https://openapi.foodsafetykorea.go.kr/api/${apiKey}/COOKRCP01/json/1/1000`;
  let menus=[];
  try{
    const response=await fetch(endpoint);
    if(response.ok){
      const rows=(await response.json()).COOKRCP01?.row||[];
      menus=rows.filter(row=>row?.RCP_NM).map(row=>({name:row.RCP_NM,type:row.RCP_PAT2||"오늘의 레시피",description:`${row.RCP_WAY2||"간편한 조리"} 방식으로 만들어 보는 오늘의 메뉴예요.`,tags:[row.RCP_PAT2||"레시피",row.RCP_WAY2||"요리"],image:row.ATT_FILE_NO_MAIN||null,source:"식품안전나라"}));
    }
  }catch{}
  const result=new Response(JSON.stringify({date,count:menus.length,menus}),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=86400"}});
  await cache.put(cacheKey,result.clone());
  return result;
}

async function getRankings(request,env){
  const kst=new Date(Date.now()+9*60*60*1000); const date=kst.toISOString().slice(0,10);
  const cache=caches.default; const cacheKey=new Request(new URL(`/rankings.json?v=6&date=${date}`,request.url),request);
  const cached=await cache.match(cacheKey); if(cached)return cached;
  const countries=[{code:"kr",name:"한국",flag:"🇰🇷"},{code:"us",name:"미국",flag:"🇺🇸"},{code:"jp",name:"일본",flag:"🇯🇵"},{code:"gb",name:"영국",flag:"🇬🇧"}];
  const result={date,countries: {}};
  await Promise.all(countries.map(async country=>{
    const data={books:[],songs:[],movies:[]};
    try{const r=await fetch(`https://rss.applemarketingtools.com/api/v2/${country.code}/books/top-paid/10/books.json`,{headers:{"User-Agent":"Mozilla/5.0","Accept":"application/json"}});if(r.ok){const rows=(await r.json()).feed?.results||[];data.books=rows.slice(0,5).map(x=>({title:x.name,artist:x.artistName,url:x.url,image:x.artworkUrl100}))}}catch{}
    if(!data.books.length&&country.code==="kr"){try{const r=await fetch("https://www.aladin.co.kr/shop/common/wbest.aspx?BranchType=1",{headers:{"User-Agent":"Mozilla/5.0","Accept":"text/html"}});if(r.ok){const html=await r.text();const matches=[...html.matchAll(/<a href="(https:\/\/www\.aladin\.co\.kr\/shop\/wproduct\.aspx\?ItemId=\d+)" class="bo3">([^<]+)<\/a>/g)];data.books=matches.slice(0,5).map(x=>({title:x[2].trim(),artist:"알라딘 베스트셀러",url:x[1],image:""}))}}catch{}}
    try{const r=await fetch(`https://rss.applemarketingtools.com/api/v2/${country.code}/music/most-played/10/songs.json`,{headers:{"User-Agent":"Mozilla/5.0","Accept":"application/json"}});if(r.ok){const rows=(await r.json()).feed?.results||[];data.songs=rows.slice(0,5).map(x=>({title:x.name,artist:x.artistName,url:x.url,image:x.artworkUrl100}))}}catch{}
    try{const r=await fetch(`https://itunes.apple.com/${country.code}/rss/topmovies/limit=10/json`,{headers:{"User-Agent":"Mozilla/5.0","Accept":"application/json"}});if(r.ok){const rows=(await r.json()).feed?.entry||[];data.movies=rows.slice(0,5).map(x=>({title:x.title?.label||"",artist:x["im:artist"]?.label||"",url:x.link?.[0]?.attributes?.href||"",image:x["im:image"]?.[2]?.label||null}))}}catch{}
    if(!data.movies.length){try{const r=await fetch(`https://itunes.apple.com/${country.code}/rss/topmovies/limit=10/json?retry=1`,{headers:{"User-Agent":"Mozilla/5.0","Accept":"application/json","Cache-Control":"no-cache"}});if(r.ok){const rows=(await r.json()).feed?.entry||[];data.movies=rows.slice(0,5).map(x=>({title:x.title?.label||"",artist:x["im:artist"]?.label||"",url:x.link?.[0]?.attributes?.href||"",image:x["im:image"]?.[2]?.label||null}))}}catch{}}
    if(!data.movies.length&&env.TMDB_API_KEY){try{const r=await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${encodeURIComponent(env.TMDB_API_KEY)}&language=ko-KR&region=${country.code.toUpperCase()}`);if(r.ok){const rows=(await r.json()).results||[];data.movies=rows.slice(0,5).map(x=>({title:x.title,artist:x.release_date||"",url:`https://www.themoviedb.org/movie/${x.id}`,image:x.poster_path?`https://image.tmdb.org/t/p/w342${x.poster_path}`:null}))}}catch{}}
    result.countries[country.code]={...country,...data};
  }));
  const response=new Response(JSON.stringify(result),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=3600"}}); await cache.put(cacheKey,response.clone()); return response;
}

export default {async fetch(request, env){const url=new URL(request.url);if(url.pathname==="/market-data.json")return getQuotes(request);if(url.pathname==="/daily-menu.json")return getDailyMenu(request,env);if(url.pathname==="/rankings.json")return getRankings(request,env);return env.ASSETS.fetch(request)}};
