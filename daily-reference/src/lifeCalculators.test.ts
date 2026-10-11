import { describe, expect, it } from "vitest";
import { calculateDilution, calculateBudgetBalance, addStorageDays } from "./lifeCalculators";

describe("생활 계산기", () => {
  it("희석 비율에 맞는 물과 원액 양을 계산한다", () => {
    expect(calculateDilution(1000, 10)).toEqual({ concentrate: 100, water: 900 });
  });
  it("월 생활비 잔액을 계산한다", () => {
    expect(calculateBudgetBalance(3000000, 1200000, 800000)).toBe(1000000);
  });
  it("보관 시작일에 보관 일수를 더한다", () => {
    expect(addStorageDays("2026-10-11", 7)).toBe("2026-10-18");
  });
});
