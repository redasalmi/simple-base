import { renderToString } from "solid-js/web";
import { expect, test } from "vitest";

import { type FixtureName, fixtures } from "./fixtures";

// Node has no `document` or `window`, so a component that touches them outside `onMount` or an
// effect throws here (K8). server.hydration.test.tsx checks that the markup matches the client's.
test.each(Object.keys(fixtures) as FixtureName[])("%s renders on the server", (name) => {
  const html = renderToString(fixtures[name]);

  expect(html).toMatch(/^<[a-z]/);
});
