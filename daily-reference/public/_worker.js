const feeds = {
  KR: "https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko",
  US: "https://news.google.com/rss?hl=en&gl=US&ceid=US:en",
  JP: "https://news.google.com/rss?hl=ja&gl=JP&ceid=JP:ja",
  GB: "https://news.google.com/rss?hl=en-GB&gl=GB&ceid=GB:en",
  CN: "https://news.google.com/rss?hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/news") {
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
