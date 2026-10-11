import { describe, expect, it } from "vitest";
import { dailyQuizzes } from "./dailyQuiz";

describe("오늘의 퀴즈 데이터", () => {
  it("모든 퀴즈의 정답 인덱스가 보기 범위 안에 있다", () => {
    expect(dailyQuizzes.length).toBeGreaterThan(0);
    dailyQuizzes.forEach((quiz) => {
      expect(quiz.options.length).toBeGreaterThan(1);
      expect(quiz.answer).toBeGreaterThanOrEqual(0);
      expect(quiz.answer).toBeLessThan(quiz.options.length);
      expect(quiz.explanation.length).toBeGreaterThan(0);
    });
  });
});
