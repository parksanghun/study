import { describe, expect, it } from "vitest";
import { normalizeWeatherData, summarizeWeather } from "./weatherUtils";

describe("날씨 요약", () => {
  it("날씨 코드별 생활 안내를 제공한다", () => {
    expect(summarizeWeather(0).label).toBe("맑음");
    expect(summarizeWeather(63).label).toBe("비");
    expect(summarizeWeather(75).label).toBe("눈");
  });
  it("알 수 없는 코드에도 기본 안내를 제공한다", () => {
    expect(summarizeWeather(999).icon).toBe("🌤️");
  });
  it("불완전한 API 응답은 안전하게 거부한다", () => {
    expect(normalizeWeatherData({ current: { temperature_2m: 20 }, daily: {} })).toBeNull();
    expect(normalizeWeatherData({ current: { temperature_2m: 20, relative_humidity_2m: 50, wind_speed_10m: 2, weather_code: 0 }, daily: { temperature_2m_min: [15], temperature_2m_max: [25], sunrise: ["2026-10-12T06:20"], sunset: ["2026-10-12T17:50"] } })).toMatchObject({ temperature: 20, min: 15, max: 25, sunrise: "06:20" });
  });
});
