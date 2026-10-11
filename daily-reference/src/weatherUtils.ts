export type WeatherSummary = { label: string; icon: string; advice: string };

export function summarizeWeather(code: number): WeatherSummary {
  if (code === 0) return { label: "맑음", icon: "☀️", advice: "환기와 가벼운 외부 활동을 하기 좋은 날이에요." };
  if ([1, 2, 3].includes(code)) return { label: "구름 많음", icon: "⛅", advice: "얇은 겉옷과 실내 환기를 준비해보세요." };
  if ([45, 48].includes(code)) return { label: "안개", icon: "🌫️", advice: "아침 외출 시 시야를 확인하고 천천히 이동하세요." };
  if ([51, 53, 55, 56, 57].includes(code)) return { label: "이슬비", icon: "🌦️", advice: "빨래는 실내 건조를 준비하고 우산을 챙기세요." };
  if ([61, 63, 65, 80, 81, 82].includes(code)) return { label: "비", icon: "🌧️", advice: "외출 전 우산을 확인하고 실내 습기를 관리하세요." };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: "눈", icon: "❄️", advice: "미끄러운 바닥을 확인하고 외풍을 점검하세요." };
  if ([95, 96, 99].includes(code)) return { label: "뇌우", icon: "⛈️", advice: "외출을 줄이고 창문과 전기 제품을 확인하세요." };
  return { label: "날씨 확인 중", icon: "🌤️", advice: "오늘의 날씨에 맞춰 생활 계획을 세워보세요." };
}
