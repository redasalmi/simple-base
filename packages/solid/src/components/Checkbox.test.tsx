import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
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
