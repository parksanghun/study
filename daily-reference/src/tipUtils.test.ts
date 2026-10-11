import { describe, expect, it } from "vitest";
import { getDailyTipIndex } from "./tipUtils";

describe("생활팁 개인화", () => {
  it("날짜에 따라 오늘의 팁 위치를 정한다", () => {
    expect(getDailyTipIndex(150, new Date("2026-01-01T12:00:00"))).toBe(1);
    expect(getDailyTipIndex(150, new Date("2026-01-02T12:00:00"))).toBe(2);
  });
  it("빈 목록에서도 안전한 위치를 반환한다", () => {
    expect(getDailyTipIndex(0, new Date("2026-01-01T12:00:00"))).toBe(0);
  });
});
