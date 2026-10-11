export const newsCountries = [
  { code: "KR", label: "한국", flag: "🇰🇷", search: "South Korea", url: "https://www.bing.com/news/search?q=South+Korea" },
  { code: "US", label: "미국", flag: "🇺🇸", search: "United States", url: "https://www.bing.com/news/search?q=United+States" },
  { code: "JP", label: "일본", flag: "🇯🇵", search: "Japan", url: "https://www.bing.com/news/search?q=Japan" },
  { code: "GB", label: "영국", flag: "🇬🇧", search: "United Kingdom", url: "https://www.bing.com/news/search?q=United+Kingdom" },
  { code: "CN", label: "중국", flag: "🇨🇳", search: "China", url: "https://www.bing.com/news/search?q=China" },
] as const;

export type NewsItem = { title: string; link: string; source: string; date: string };
