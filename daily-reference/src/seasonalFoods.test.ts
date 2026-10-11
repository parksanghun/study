import { describe, expect, it } from "vitest";
import { getSeasonalFood, seasonalFoods } from "./seasonalFoods";

describe("오늘의 제철 식재료", () => {
  it("모든 달에 식재료가 있고 필수 정보가 있다", () => {
    expect(seasonalFoods.length).toBe(6);
    for (let month = 1; month <= 12; month += 1) {
      const food = getSeasonalFood(month);
      expect(food.name).toBeTruthy();
      expect(food.selection).toBeTruthy();
      expect(food.storage).toBeTruthy();
      expect(food.use).toBeTruthy();
    }
  });
});
