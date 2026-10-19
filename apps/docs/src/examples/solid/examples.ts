import type { Component } from "solid-js";

// Eager, so an island hydrates in one pass. With lazy(), islands that hydrate at the same time
// interleave their hydration and mismatch.
// The glob lives in a .ts file: Vite's dependency scan keeps JSX in .tsx files and then reads the
// result as plain JS, which fails to parse.
export const examples = import.meta.glob<Component>("./*/*.tsx", {
  eager: true,
  import: "default",
});
