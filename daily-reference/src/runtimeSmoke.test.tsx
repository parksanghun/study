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
    await waitFor(() => expect(document.querySelector(".weather-main")?.getAttribute("aria-live")).toBe("polite"));
    expect(document.querySelector(".temperature-current")?.textContent).toContain("현재 20°");
    expect([...document.querySelectorAll(".news-card img")].every(image => image.getAttribute("alt"))).toBe(true);
  });
});
