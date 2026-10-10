import solid from "rolldown-plugin-solid";
import { defineConfig } from "tsdown";

export default defineConfig([
  {
    platform: "neutral",
    plugins: [solid()],
    // Both run once per package, on the packed tarball with both builds in it.
    publint: { strict: true },
    attw: { level: "error" },
  },
  {
    platform: "neutral",
    // The first config already cleans dist/ and emits index.d.ts.
    clean: false,
    dts: false,
    inputOptions: {
      // JSX is preserved for the `solid` export condition. Without a tsconfig, rolldown
      // doesn't warn that this overrides its `jsx` option.
      tsconfig: false,
      transform: {
        jsx: "preserve",
      },
    },
    outExtensions: () => ({ js: ".jsx" }),
  },
]);
