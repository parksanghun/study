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
