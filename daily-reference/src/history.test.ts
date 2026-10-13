import { describe, expect, it } from "vitest";
import { getKoreaDateKey } from "./history";

describe("한국 시간 기준 오늘의 역사 날짜", () => {
  it("UTC 날짜가 바뀌기 전에도 한국의 다음 날짜를 선택한다", () => {
    expect(getKoreaDateKey(new Date("2026-10-12T15:30:00.000Z"))).toBe("10-13");
  });

  it("한국 자정 직전은 현재 날짜로 유지한다", () => {
    expect(getKoreaDateKey(new Date("2026-10-12T14:59:59.000Z"))).toBe("10-12");
  });
});
