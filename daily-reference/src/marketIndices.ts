export type MarketIndex = { country: string; flag: string; name: string; symbol: string; url: string };

export const marketIndices: MarketIndex[] = [
  { country: "한국", flag: "🇰🇷", name: "코스피", symbol: "KOSPI", url: "https://finance.naver.com/sise/sise_index.naver?code=KOSPI" },
  { country: "한국", flag: "🇰🇷", name: "코스닥", symbol: "KOSDAQ", url: "https://finance.naver.com/sise/sise_index.naver?code=KOSDAQ" },
  { country: "미국", flag: "🇺🇸", name: "S&P 500", symbol: "^GSPC", url: "https://www.google.com/finance/quote/.INX:INDEXSP" },
  { country: "미국", flag: "🇺🇸", name: "나스닥 종합", symbol: "^IXIC", url: "https://www.google.com/finance/quote/IXIC:INDEXNASDAQ" },
  { country: "미국", flag: "🇺🇸", name: "다우존스", symbol: "^DJI", url: "https://www.google.com/finance/quote/INDU:INDEXDJX" },
  { country: "일본", flag: "🇯🇵", name: "닛케이 225", symbol: "^N225", url: "https://www.google.com/finance/quote/NI225:INDEXNIKKEI" },
  { country: "일본", flag: "🇯🇵", name: "TOPIX", symbol: "TOPIX", url: "https://www.google.com/finance/quote/TPX:INDEXTOPIX" },
  { country: "영국", flag: "🇬🇧", name: "FTSE 100", symbol: "^FTSE", url: "https://www.google.com/finance/quote/UKX:INDEXFTSE" },
  { country: "영국", flag: "🇬🇧", name: "FTSE 250", symbol: "MCX:INDEXFTSE", url: "https://www.google.com/finance/quote/MCX:INDEXFTSE" },
  { country: "중국", flag: "🇨🇳", name: "상하이 종합", symbol: "000001", url: "https://www.google.com/finance/quote/000001:SHA" },
  { country: "중국", flag: "🇨🇳", name: "선전 종합", symbol: "399106", url: "https://www.google.com/finance/quote/399106:SHE" },
];
