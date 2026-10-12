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
  const cache=caches.default; const cacheKey=new Request(new URL(`/rankings.json?v=8&date=${date}`,request.url),request);
  const cached=await cache.match(cacheKey); if(cached)return cached;
  const countries=[{code:"kr",name:"한국",flag:"🇰🇷"},{code:"us",name:"미국",flag:"🇺🇸"},{code:"jp",name:"일본",flag:"🇯🇵"},{code:"gb",name:"영국",flag:"🇬🇧"}];
  const result={date,countries: {}};
  await Promise.all(countries.map(async country=>{
    const data={books:[],songs:[],movies:[]};
    try{const r=await fetch(`https://rss.applemarketingtools.com/api/v2/${country.code}/books/top-paid/10/books.json`,{headers:{"User-Agent":"Mozilla/5.0","Accept":"application/json"}});if(r.ok){const rows=(await r.json()).feed?.results||[];data.books=rows.slice(0,5).map(x=>({title:x.name,artist:x.artistName,url:x.url,image:x.artworkUrl100}))}}catch{}
    if(!data.books.length&&country.code==="kr"){try{const r=await fetch("https://www.aladin.co.kr/shop/common/wbest.aspx?BranchType=1",{headers:{"User-Agent":"Mozilla/5.0","Accept":"text/html"}});if(r.ok){const html=await r.text();const matches=[...html.matchAll(/<a href="(https:\/\/www\.aladin\.co\.kr\/shop\/wproduct\.aspx\?ItemId=\d+)" class="bo3">([^<]+)<\/a>/g)];data.books=matches.slice(0,5).map(x=>({title:x[2].trim(),artist:"알라딘 베스트셀러",url:x[1],image:""}))}}catch{}}
    try{const r=await fetch(`https://rss.applemarketingtools.com/api/v2/${country.code}/music/most-played/10/songs.json`,{headers:{"User-Agent":"Mozilla/5.0","Accept":"application/json"}});if(r.ok){const rows=(await r.json()).feed?.results||[];data.songs=rows.slice(0,5).map(x=>({title:x.name,artist:x.artistName,url:x.url,image:x.artworkUrl100}))}}catch{}
    try{const r=await fetch(`https://itunes.apple.com/${country.code}/rss/topmovies/limit=10/json`,{headers:{"User-Agent":"Mozilla/5.0","Accept":"application/json"}});if(r.ok){const rows=(await r.json()).feed?.entry||[];data.movies=rows.slice(0,5).map(x=>({title:x.title?.label||"",artist:x["im:artist"]?.label||"",url:(x.link?.[0]?.attributes?.href||"").replace(`https://itunes.apple.com/${country.code}/movie/`,`https://itunes.apple.com/us/movie/`),image:x["im:image"]?.[2]?.label||null}))}}catch{}
    if(!data.movies.length){try{const r=await fetch(`https://itunes.apple.com/${country.code}/rss/topmovies/limit=10/json?retry=1`,{headers:{"User-Agent":"Mozilla/5.0","Accept":"application/json","Cache-Control":"no-cache"}});if(r.ok){const rows=(await r.json()).feed?.entry||[];data.movies=rows.slice(0,5).map(x=>({title:x.title?.label||"",artist:x["im:artist"]?.label||"",url:(x.link?.[0]?.attributes?.href||"").replace(`https://itunes.apple.com/${country.code}/movie/`,`https://itunes.apple.com/us/movie/`),image:x["im:image"]?.[2]?.label||null}))}}catch{}}
    if(!data.movies.length&&country.code==="kr"){try{const r=await fetch("https://itunes.apple.com/us/rss/topmovies/limit=10/json?fallback=global",{headers:{"User-Agent":"Mozilla/5.0","Accept":"application/json"}});if(r.ok){const rows=(await r.json()).feed?.entry||[];data.movies=rows.slice(0,5).map(x=>({title:x.title?.label||"",artist:"글로벌 영화 차트",url:(x.link?.[0]?.attributes?.href||"").replace(`https://itunes.apple.com/${country.code}/movie/`,`https://itunes.apple.com/us/movie/`),image:x["im:image"]?.[2]?.label||null}))}}catch{}}
    if(!data.movies.length&&env.TMDB_API_KEY){try{const r=await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${encodeURIComponent(env.TMDB_API_KEY)}&language=ko-KR&region=${country.code.toUpperCase()}`);if(r.ok){const rows=(await r.json()).results||[];data.movies=rows.slice(0,5).map(x=>({title:x.title,artist:x.release_date||"",url:`https://www.themoviedb.org/movie/${x.id}`,image:x.poster_path?`https://image.tmdb.org/t/p/w342${x.poster_path}`:null}))}}catch{}}
    result.countries[country.code]={...country,...data};
  }));
  const response=new Response(JSON.stringify(result),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=3600"}}); await cache.put(cacheKey,response.clone()); return response;
}

function decodeXml(value){return value.replace(/<!\[CDATA\[|\]\]>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#39;/g,"'").replace(/&quot;/g,'"').trim()}
async function getHotIssues(request){
  const cache=caches.default; const cacheKey=new Request(new URL("/api/hot-issues-today.json",request.url),request); const cached=await cache.match(cacheKey); if(cached)return cached;
  const categories=[{key:"entertainment",label:"연예",query:"연예"},{key:"economy",label:"경제",query:"경제"},{key:"society",label:"사회",query:"사회"},{key:"sports",label:"스포츠",query:"스포츠"}]; const issues=[];
  const decode=value=>value.replace(/<!\[CDATA\[|\]\]>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#39;/g,"'").replace(/&quot;/g,'"').trim();
  const formatKst=value=>{const time=Date.parse(value);if(!Number.isFinite(time))return "";return new Intl.DateTimeFormat("ko-KR",{timeZone:"Asia/Seoul",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date(time)).replace(/\./g,"월 ").replace(/\s+/g," ").replace("월 ","월 ").replace(/월 (\d+) /,"월 $1일 ")};
  const feeds=category=>[ {source:"Google News",url:`https://news.google.com/rss/search?q=${encodeURIComponent(category.query)}&hl=ko&gl=KR&ceid=KR:ko`},{source:"Bing News",url:`https://www.bing.com/news/search?q=${encodeURIComponent(category.query)}&format=rss&mkt=ko-KR&setlang=ko-KR`} ];
  await Promise.all(categories.map(async category=>{await Promise.all(feeds(category).map(async feed=>{try{const response=await fetch(feed.url,{headers:{"User-Agent":"Mozilla/5.0","Accept":"application/rss+xml,application/xml"}});if(!response.ok)return;const xml=await response.text();for(const match of [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0,6)){const body=match[1];const title=body.match(/<title>([\s\S]*?)<\/title>/)?.[1];const link=body.match(/<link>([\s\S]*?)<\/link>/)?.[1];const date=body.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1];if(title&&link&&date){const publishedAt=decode(date);issues.push({category:category.key,label:category.label,title:decode(title),link:decode(link),publishedAt,date:formatKst(publishedAt),source:feed.source})}}}catch{}})}));
  const seen=new Set(); const unique=issues.filter(item=>{const key=`${item.title.toLowerCase()}|${item.link}`;if(seen.has(key))return false;seen.add(key);return true}); const now=Date.now(); const recent=unique.filter(item=>{const time=Date.parse(item.publishedAt);return Number.isFinite(time)&&time<=now&&now-time<=48*60*60*1000}); recent.sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt)); const stopwords=new Set(["오늘","관련","대한","통해","위한","있는","에서","으로","그리고","뉴스","실시간"]); const counts={}; recent.forEach(item=>{for(const word of item.title.match(/[가-힣A-Za-z0-9]{2,}/g)||[]){if(!stopwords.has(word))counts[word]=(counts[word]||0)+1}}); const keywords=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,12).map(([word])=>word); const result={updatedAt:new Date().toISOString(),categories:categories.map(({key,label})=>({key,label})),keywords,issues:recent.slice(0,20)}; const response=new Response(JSON.stringify(result),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=900"}}); await cache.put(cacheKey,response.clone()); return response;
  }));
}

export default {async fetch(request, env){const url=new URL(request.url);if(url.pathname==="/market-data.json")return getQuotes(request);if(url.pathname==="/daily-menu.json")return getDailyMenu(request,env);if(url.pathname==="/rankings.json"||url.pathname==="/api/rankings.json")return getRankings(request,env);if((url.pathname==="/api/hot-issues.json"||url.pathname==="/api/hot-issues-today.json"))return getHotIssues(request);return env.ASSETS.fetch(request)}};
