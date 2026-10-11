import { describe, expect, it } from "vitest";
import { languageTips } from "./languageTips";

describe("오늘의 영어·일본어 생활 문장", () => {
  it("각 날짜 콘텐츠에 세 언어 문장과 단어 3개가 있다", () => {
    expect(languageTips.length).toBeGreaterThanOrEqual(7);
    for (const tip of languageTips) {
      expect(tip.korean).toBeTruthy();
      expect(tip.english).toBeTruthy();
      expect(tip.japanese).toBeTruthy();
      expect(tip.words).toHaveLength(3);
      expect(tip.words.every(word => word.english && word.japanese)).toBe(true);
    }
  });
});
