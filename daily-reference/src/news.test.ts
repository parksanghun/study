import { describe, expect, it } from "vitest";
import { selectNewsItems } from "./news";

describe("해외 뉴스 표시 데이터", () => {
  it("실시간 응답이 비어 있으면 배포 시점 스냅샷을 유지한다", () => {
    const fallback = [{ title: "기존 기사" }];
    expect(selectNewsItems([], fallback)).toBe(fallback);
    expect(selectNewsItems(undefined, fallback)).toBe(fallback);
  });

  it("실시간 기사가 있으면 스냅샷보다 우선한다", () => {
    const live = [{ title: "최신 기사" }];
    expect(selectNewsItems(live, [{ title: "기존 기사" }])).toBe(live);
  });
});
