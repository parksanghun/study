// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

describe("앱 런타임 렌더링", () => {
  it("초기 렌더링에서 빈 화면 예외가 발생하지 않는다", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        current: { temperature_2m: 20, relative_humidity_2m: 50, wind_speed_10m: 2, weather_code: 0 },
        daily: { temperature_2m_min: [15], temperature_2m_max: [25], sunrise: ["2026-10-12T06:20"], sunset: ["2026-10-12T17:50"] },
      }),
    }) as typeof fetch;
    render(<App />);
    expect(document.body.textContent).toContain("오늘의 날씨");
    expect(document.body.textContent).toContain("오늘의 증시");
    expect(document.querySelector("input[aria-label=\"생활팁 검색\"]")).not.toBeNull();
    await waitFor(() => expect(document.querySelector(".weather-main")?.getAttribute("aria-live")).toBe("polite"));
    expect(document.querySelector(".temperature-range")?.textContent).toContain("최저 15° · 최고 25°");
    expect([...document.querySelectorAll(".news-card img")].every(image => image.getAttribute("alt"))).toBe(true);
  });

  it("모바일에서도 날씨 로딩 상태를 안내한다", () => {
    globalThis.fetch = vi.fn(() => new Promise(() => {})) as typeof fetch;
    render(<App />);
    expect(document.querySelector(".weather-status")?.textContent).toContain("날씨 정보를 확인하고 있어요");
  });
});
