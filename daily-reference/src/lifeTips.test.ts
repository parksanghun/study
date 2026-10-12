import { describe, expect, it } from "vitest";
import { lifeTips, matchesLifeTipQuery } from "./lifeTips";

describe("오늘의 하루 콘텐츠", () => {
  it("추천 콘텐츠 100개를 모두 포함한다", () => {
    expect(lifeTips).toHaveLength(150);
  });
  it("각 콘텐츠는 제목, 설명, 주의사항을 가진다", () => {
    expect(lifeTips.every((tip) => tip.title && tip.summary && tip.caution)).toBe(true);
  });
  it("카테고리는 다섯 종류로 구성된다", () => {
    expect(new Set(lifeTips.map((tip) => tip.category)).size).toBe(15);
  });
  it("검색어가 카테고리와 제목을 함께 찾는다", () => {
    const kitchenTip = lifeTips.find((tip) => tip.title === "싱크대 배수구 냄새 제거");
    expect(kitchenTip).toBeDefined();
    expect(matchesLifeTipQuery(kitchenTip!, "주방")).toBe(true);
    expect(matchesLifeTipQuery(kitchenTip!, "  냄새  ")).toBe(true);
  });
});
