// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

describe("앱 런타임 렌더링", () => {
  it("초기 렌더링에서 빈 화면 예외가 발생하지 않는다", () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: async () => ({
        current: { temperature_2m: 20, relative_humidity_2m: 50, wind_speed_10m: 2, weather_code: 0 },
        daily: { temperature_2m_min: [15], temperature_2m_max: [25] },
      }),
    }) as typeof fetch;
    render(<App />);
    expect(document.body.textContent).toContain("오늘의 날씨");
    expect(document.body.textContent).toContain("오늘의 증시");
    expect([...document.querySelectorAll(".news-card img")].every(image => image.getAttribute("alt"))).toBe(true);
  });
});
