const feeds = {
  KR: "https://www.bing.com/news/search?q=South%20Korea&format=rss",
  US: "https://www.bing.com/news/search?q=United%20States&format=rss",
  JP: "https://www.bing.com/news/search?q=Japan&format=rss",
  GB: "https://www.bing.com/news/search?q=United%20Kingdom&format=rss",
  CN: "https://www.bing.com/news/search?q=China&format=rss",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/internal-news") {
      const country = url.searchParams.get("country") || "KR";
      const feed = feeds[country] || feeds.KR;
      try {
        const response = await fetch(feed, { headers: { "User-Agent": "lifetips.date news reader" } });
        if (!response.ok) return new Response("News feed unavailable", { status: 502 });
        return new Response(await response.text(), { headers: { "Content-Type": "application/xml; charset=utf-8", "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=900" } });
      } catch { return new Response("News feed unavailable", { status: 502 }); }
    }
    return env.ASSETS.fetch(request);
  },
};
