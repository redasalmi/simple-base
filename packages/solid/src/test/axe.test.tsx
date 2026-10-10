import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, test } from "vitest";

import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPortal,
  ComboboxPositioner,
  Dialog,
  DialogContent,
  Field,
  FieldLabel,
  Menu,
  MenuContent,
  MenuItem,
  MenuPortal,
  MenuPositioner,
  MenuTrigger,
  Select,
  SelectContent,
  SelectControl,
  SelectItem,
  SelectList,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "../index";
import { currencies, type FixtureName, fixtures } from "./fixtures";

// Popups render in a portal, so axe checks the whole body. `region` is a page-level rule; a
// component on its own isn't inside a landmark.
async function violations() {
  const results = await axe.run(document.body, { rules: { region: { enabled: false } } });
  return results.violations.map(({ id, nodes }) => ({
    id,
    targets: nodes.map((node) => node.target),
  }));
}

describe("default rendering", () => {
  test.each(Object.keys(fixtures) as FixtureName[])("%s", async (name) => {
    render(fixtures[name]);

    expect(await violations()).toEqual([]);
  });
});

describe("open popups", () => {
  test("Select", async () => {
    const user = userEvent.setup();
    render(fixtures.Select);

    await user.click(screen.getByRole("combobox", { name: "Currency" }));
    await screen.findByRole("option", { name: "Euro" });

    expect(await violations()).toEqual([]);
  });

  test("Combobox", async () => {
    const user = userEvent.setup();
    render(fixtures.Combobox);

    await user.click(screen.getByRole("button", { name: "Show currencies" }));
    await screen.findByRole("option", { name: "Euro" });

    expect(await violations()).toEqual([]);
  });

  test("Combobox with no matches", async () => {
    const user = userEvent.setup();
    render(fixtures.Combobox);

    await user.type(screen.getByRole("combobox", { name: "Currency" }), "xyz");
    await screen.findByText("No currencies found.");

    expect(await violations()).toEqual([]);
  });

  // label-content-name-mismatch (WCAG 2.5.3): Zag labels the month heading "Switch to month view"
  // while it shows "October 2026", so the calendar puts the visible text first (U9 in audit/zag-issues.md).
  test("DatePicker", async () => {
    const user = userEvent.setup();
    render(fixtures.DatePicker);

    await user.click(screen.getByRole("button", { name: "Open calendar" }));
    await screen.findByRole("grid");

    expect(await violations()).toEqual([]);
  });

  test("Menu", async () => {
    const user = userEvent.setup();
    render(fixtures.Menu);

    await user.click(screen.getByRole("button", { name: "Actions" }));
    await screen.findByRole("menuitem", { name: /Duplicate/ });

    expect(await violations()).toEqual([]);
  });

  test("Tooltip", async () => {
    render(() => (
      <Tooltip defaultOpen>
        <TooltipTrigger variant="secondary">Status</TooltipTrigger>
        <TooltipPortal>
          <TooltipPositioner>
            <TooltipContent>Paid on October 9</TooltipContent>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>
    ));
    await screen.findByRole("tooltip");

    expect(await violations()).toEqual([]);
  });

  test("Dialog", async () => {
    const user = userEvent.setup();
    render(fixtures.Dialog);

    await user.click(screen.getByRole("button", { name: "View details" }));
    await screen.findByRole("dialog");

    expect(await violations()).toEqual([]);
  });

  test("AlertDialog", async () => {
    const user = userEvent.setup();
    render(fixtures.AlertDialog);

    await user.click(screen.getByRole("button", { name: "Delete project" }));
    await screen.findByRole("alertdialog");

    expect(await violations()).toEqual([]);
  });

  test("Dialog without a title, named by aria-label", async () => {
    render(() => (
      <Dialog defaultOpen>
        <DialogContent aria-label="Workspace details">
          <p>Twelve members can access this workspace.</p>
        </DialogContent>
      </Dialog>
    ));

    expect(await violations()).toEqual([]);
  });
});

describe("accessible names", () => {
  test("a Switch named only by a wrapping label", async () => {
    render(() => (
      <label>
        <Switch name="reminders" /> Send reminders
      </label>
    ));

    expect(screen.getByRole("switch")).toHaveAccessibleName("Send reminders");
    expect(await violations()).toEqual([]);
  });

  test("a Switch named by FieldLabel", async () => {
    render(() => (
      <Field id="reminders">
        <FieldLabel>Send reminders</FieldLabel>
        <Switch id="reminders" />
      </Field>
    ));

    expect(screen.getByRole("switch")).toHaveAccessibleName("Send reminders");
    expect(await violations()).toEqual([]);
  });

  test("a Menu trigger named by its text", async () => {
    render(() => (
      <Menu defaultOpen>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuPortal>
          <MenuPositioner>
            <MenuContent>
              <MenuItem value="duplicate">Duplicate</MenuItem>
            </MenuContent>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    ));
    await screen.findByRole("menu");

    expect(await violations()).toEqual([]);
  });

  // Phase 1 documents that both need their Label part, since Zag names the trigger, the input, and
  // the list through the label's id (A6, Z5).
  test.fails("a Select without SelectLabel", async () => {
    const user = userEvent.setup();
    render(() => (
      <Select options={currencies} placeholder="Select a currency">
        <SelectControl>
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
        </SelectControl>
        <SelectPortal>
          <SelectPositioner>
            <SelectContent>
              <SelectList>{(option) => <SelectItem option={option} />}</SelectList>
            </SelectContent>
          </SelectPositioner>
        </SelectPortal>
      </Select>
    ));
    await user.click(screen.getByRole("combobox"));
    await screen.findByRole("option", { name: "Euro" });

    expect(await violations()).toEqual([]);
  });

  test.fails("a Combobox without ComboboxLabel", async () => {
    const user = userEvent.setup();
    render(() => (
      <Combobox options={currencies} placeholder="Search currencies">
        <ComboboxControl>
          <ComboboxInput />
        </ComboboxControl>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxContent>
              <ComboboxList>{(option) => <ComboboxItem option={option} />}</ComboboxList>
            </ComboboxContent>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    ));
    await user.type(screen.getByRole("combobox"), "e");
    await screen.findByRole("option", { name: "Euro" });

    expect(await violations()).toEqual([]);
    // axe accepts the placeholder as the input's name and doesn't require one on the list.
    expect(screen.getByRole("listbox")).toHaveAccessibleName(/./);
  });
});
