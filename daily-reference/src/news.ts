export const newsCountries = [
  { code: "KR", label: "한국", flag: "🇰🇷", query: "hl=ko&gl=KR&ceid=KR:ko" },
  { code: "US", label: "미국", flag: "🇺🇸", query: "hl=en&gl=US&ceid=US:en" },
  { code: "JP", label: "일본", flag: "🇯🇵", query: "hl=ja&gl=JP&ceid=JP:ja" },
  { code: "GB", label: "영국", flag: "🇬🇧", query: "hl=en-GB&gl=GB&ceid=GB:en" },
  { code: "CN", label: "중국", flag: "🇨🇳", query: "hl=zh-CN&gl=CN&ceid=CN:zh-Hans" },
] as const;

export type NewsItem = { title: string; link: string; source: string; date: string };
