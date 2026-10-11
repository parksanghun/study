import { describe, expect, it } from "vitest";
import { summarizeWeather } from "./weatherUtils";

describe("날씨 요약", () => {
  it("날씨 코드별 생활 안내를 제공한다", () => {
    expect(summarizeWeather(0).label).toBe("맑음");
    expect(summarizeWeather(63).label).toBe("비");
    expect(summarizeWeather(75).label).toBe("눈");
  });
  it("알 수 없는 코드에도 기본 안내를 제공한다", () => {
    expect(summarizeWeather(999).icon).toBe("🌤️");
  });
});
