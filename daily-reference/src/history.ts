export type HistoryItem = { country: string; flag: string; type: string; year: string; title: string; reason: string; };
export const historyByDate: Record<string, HistoryItem[]> = {
  "10-12": [
    {country:"스페인",flag:"🇪🇸",type:"국가 기념일",year:"1492",title:"스페인 국경일",reason:"콜럼버스 원정대가 아메리카 대륙에 도착한 날을 계기로 스페인의 역사와 문화를 돌아보는 날입니다."},
    {country:"적도기니",flag:"🇬🇶",type:"독립 기념일",year:"1968",title:"독립 기념일",reason:"스페인으로부터 독립한 날로, 국가 수립과 자주권 회복을 기념합니다."},
    {country:"독일",flag:"🇩🇪",type:"역사 사건",year:"1810",title:"첫 옥토버페스트",reason:"바이에른 왕세자 루트비히와 테레제 공주의 결혼을 축하하는 행사가 열렸고, 오늘날 축제의 시작으로 알려져 있습니다."},
    {country:"세계",flag:"🌐",type:"세계 기념일",year:"1996",title:"세계 관절염의 날",reason:"관절염 인식을 높이고 조기 진단과 치료의 중요성을 알리기 위해 매년 10월 12일에 열립니다."}
  ]
};
