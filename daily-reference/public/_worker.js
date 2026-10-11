const symbols = ["KOSPI", "KOSDAQ", "^GSPC", "^IXIC", "^DJI", "^N225", "TOPIX", "^FTSE", "MCX:INDEXFTSE", "000001", "399106"];
const yahooSymbols = {"KOSPI":"%5EKS11","KOSDAQ":"%5EKQ11","^GSPC":"%5EGSPC","^IXIC":"%5EIXIC","^DJI":"%5EDJI","^N225":"%5EN225","TOPIX":"%5ETOPIX","^FTSE":"%5EFTSE","MCX:INDEXFTSE":"%5EMCX","000001":"000001.SS","399106":"399106.SZ"};

async function getQuotes(request){
  const cache = caches.default;
  const cacheKey = new Request(new URL("/market-data.json", request.url), request);
  const cached = await cache.match(cacheKey);
  if(cached) return cached;
  const quotes = {};
  await Promise.all(symbols.map(async symbol=>{
    try {
      const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbols[symbol]}?range=1d&interval=1d`, {headers:{"User-Agent":"Mozilla/5.0"}});
      if(!response.ok) return;
      const result = (await response.json()).chart?.result?.[0];
      const meta = result?.meta;
      const value = meta?.regularMarketPrice;
      const previous = meta?.previousClose;
      if(typeof value === "number") quotes[symbol] = {value, change:typeof previous === "number" ? value-previous : null, percent:typeof previous === "number" && previous ? ((value-previous)/previous)*100 : null};
    } catch {}
  }));
  const response = new Response(JSON.stringify({updatedAt:new Date().toISOString(),quotes}), {headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=600"}});
  await cache.put(cacheKey,response.clone());
  return response;
}

export default {async fetch(request, env){const url=new URL(request.url);if(url.pathname==="/market-data.json")return getQuotes(request);return env.ASSETS.fetch(request)}};
