import solid from "rolldown-plugin-solid";
import { defineConfig } from "tsdown";

export default defineConfig([
  {
    platform: "neutral",
    plugins: [solid()],
  },
  {
    platform: "neutral",
    inputOptions: {
      transform: {
        jsx: "preserve",
      },
    },
    outExtensions: () => ({ js: ".jsx" }),
  },
]);
