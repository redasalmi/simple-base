import solid from "rolldown-plugin-solid";
import { defineConfig } from "tsdown";

export default defineConfig([
  {
    platform: "neutral",
    plugins: [solid()],
  },
  {
    platform: "neutral",
    // The first config already cleans dist/ and emits index.d.ts.
    clean: false,
    dts: false,
    inputOptions: {
      transform: {
        jsx: "preserve",
      },
    },
    outExtensions: () => ({ js: ".jsx" }),
  },
]);
