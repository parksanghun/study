export type SeasonalFood = { name: string; season: string; selection: string; storage: string; use: string };

export const seasonalFoods: SeasonalFood[] = [
  { name: "딸기", season: "1~3월", selection: "꼭지가 선명하고 과육이 단단한 것", storage: "씻지 않고 냉장 보관하며 가능한 빨리 먹기", use: "요거트, 샐러드, 간단한 디저트" },
  { name: "주꾸미", season: "3~5월", selection: "몸통이 탄력 있고 윤기가 나는 것", storage: "손질 후 밀폐해 냉장 또는 냉동 보관", use: "볶음, 샤브샤브, 데침" },
  { name: "참외", season: "5~6월", selection: "향이 좋고 표면의 골이 선명한 것", storage: "신문지나 종이에 싸서 냉장 보관", use: "차갑게 먹거나 과일 샐러드" },
  { name: "옥수수", season: "7~8월", selection: "알이 촘촘하고 껍질이 싱싱한 것", storage: "껍질째 냉장하거나 쪄서 냉동 보관", use: "찜, 샐러드, 콘버터" },
  { name: "전어", season: "9~10월", selection: "눈이 맑고 비늘이 고르게 붙은 것", storage: "손질 후 물기를 제거해 냉장 보관", use: "구이, 회무침, 소금구이" },
  { name: "굴", season: "11~12월", selection: "살이 통통하고 냄새가 깨끗한 것", storage: "찬물에 담가 냉장하고 가급적 바로 조리", use: "국, 전, 굴밥" },
];

export function getSeasonalFood(month: number): SeasonalFood {
  const normalizedMonth = Math.min(12, Math.max(1, month));
  return seasonalFoods[Math.floor((normalizedMonth - 1) / 2)];
}

export type SeasonalFruit = { name: string; season: string; selection: string; storage: string; use: string };

export const seasonalFruits: SeasonalFruit[] = [
  { name: "귤", season: "1~2월", selection: "껍질이 탄탄하고 향이 선명한 것", storage: "통풍되는 서늘한 곳에 두고 무른 것은 분리", use: "간식, 샐러드, 따뜻한 차" },
  { name: "딸기", season: "3~4월", selection: "꼭지가 싱싱하고 과육이 단단한 것", storage: "씻지 않고 냉장 보관하며 빠르게 먹기", use: "요거트, 샐러드, 디저트" },
  { name: "복숭아", season: "5~6월", selection: "향이 좋고 표면에 상처가 없는 것", storage: "무르기 전까지 서늘한 곳, 먹기 직전 냉장", use: "생과일, 샐러드, 콤포트" },
  { name: "수박", season: "7~8월", selection: "두드렸을 때 맑은 소리가 나고 꼭지가 마르지 않은 것", storage: "자른 뒤 밀폐해 냉장 보관", use: "생과일, 주스, 화채" },
  { name: "사과", season: "9~10월", selection: "껍질이 팽팽하고 묵직한 것", storage: "다른 과일과 분리해 냉장 보관", use: "생과일, 샐러드, 구이" },
  { name: "유자", season: "11~12월", selection: "향이 진하고 껍질이 단단한 것", storage: "냉장 보관하고 오래 두려면 껍질째 냉동", use: "유자차, 드레싱, 디저트" },
];

export function getSeasonalFruit(month: number): SeasonalFruit {
  const normalizedMonth = Math.min(12, Math.max(1, month));
  return seasonalFruits[Math.floor((normalizedMonth - 1) / 2)];
}
