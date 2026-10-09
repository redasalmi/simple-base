import { playwright } from "@vitest/browser-playwright";
import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [solid()],
        test: {
          name: "browser",
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: ["src/**/*.ssr.test.{ts,tsx}"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
      {
        plugins: [solid({ ssr: true })],
        test: {
          name: "ssr",
          include: ["src/**/*.ssr.test.{ts,tsx}"],
          environment: "node",
        },
      },
    ],
  },
});
