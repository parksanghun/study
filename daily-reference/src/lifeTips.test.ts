import { describe, expect, it } from "vitest";
import { lifeTips } from "./lifeTips";

describe("생활팁 콘텐츠", () => {
  it("추천 콘텐츠 100개를 모두 포함한다", () => {
    expect(lifeTips).toHaveLength(100);
  });
  it("각 콘텐츠는 제목, 설명, 주의사항을 가진다", () => {
    expect(lifeTips.every((tip) => tip.title && tip.summary && tip.caution)).toBe(true);
  });
  it("카테고리는 다섯 종류로 구성된다", () => {
    expect(new Set(lifeTips.map((tip) => tip.category)).size).toBe(10);
  });
});
