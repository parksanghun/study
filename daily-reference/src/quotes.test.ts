import { describe, expect, it } from "vitest";
import { dailyQuotes } from "./quotes";

describe("오늘의 명언 데이터", () => {
  it("모든 명언에 문장과 출처가 있다", () => {
    expect(dailyQuotes.length).toBeGreaterThan(0);
    dailyQuotes.forEach((quote) => {
      expect(quote.text.length).toBeGreaterThan(10);
      expect(quote.author.length).toBeGreaterThan(0);
    });
  });
});
