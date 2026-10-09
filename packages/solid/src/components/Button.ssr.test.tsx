import { renderToString } from "solid-js/web";
import { expect, test } from "vitest";

import { Button } from "./Button";

test("Button renders on the server", () => {
  const html = renderToString(() => <Button>Save</Button>);

  expect(html).toContain('data-variant="primary"');
  expect(html).toContain(">Save</button>");
});
