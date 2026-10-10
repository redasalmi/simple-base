import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { createSignal } from "solid-js";
import { expect, test } from "vitest";

import { Checkbox } from "./Checkbox";

test("Checkbox toggles when its label is clicked", async () => {
  const user = userEvent.setup();
  const { container } = render(() => (
    <label>
      <Checkbox /> Accept terms
    </label>
  ));

  const checkbox = screen.getByRole<HTMLInputElement>("checkbox", { name: "Accept terms" });
  await user.click(screen.getByText("Accept terms"));

  expect(checkbox.checked).toBe(true);
  expect((await axe.run(container)).violations).toEqual([]);
});

// S1: solid-js 1.9.15 sets `indeterminate` as a property, so no `prop:` is needed.
test("Checkbox sets indeterminate as a property", () => {
  const [indeterminate, setIndeterminate] = createSignal(true);
  render(() => <Checkbox aria-label="Select all" indeterminate={indeterminate()} />);
  const checkbox = screen.getByRole<HTMLInputElement>("checkbox", { name: "Select all" });

  expect(checkbox.indeterminate).toBe(true);

  setIndeterminate(false);

  expect(checkbox.indeterminate).toBe(false);
});
