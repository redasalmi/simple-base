import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import { fixtures } from "../test/fixtures";

function focusedCell() {
  const element = document.activeElement;
  return `${element?.getAttribute("data-view")} ${element?.getAttribute("data-value")}`;
}

// P1: only the current view renders, so Zag has to find the focused cell in the view it just mounted.
test("DatePickerCalendar moves keyboard focus between views", async () => {
  const user = userEvent.setup();
  render(fixtures.DatePicker);

  await user.click(screen.getByRole("button", { name: "Open calendar" }));
  await expect.poll(focusedCell).toBe("day 2026-10-12");
  expect(screen.getAllByRole("grid")).toHaveLength(1);

  screen.getByRole("button", { name: /^October 2026,/ }).focus();
  await user.keyboard("{Enter}");
  await expect.poll(focusedCell).toBe("month 10");

  screen.getByRole("button", { name: /^2026,/ }).focus();
  await user.keyboard("{Enter}");
  await expect.poll(focusedCell).toBe("year 2026");

  await user.keyboard("{ArrowRight}{Enter}");
  await expect.poll(focusedCell).toBe("month 10");

  await user.keyboard("{ArrowRight}{Enter}");
  await expect.poll(focusedCell).toBe("day 2027-11-12");
  expect(screen.getAllByRole("grid")).toHaveLength(1);
});
