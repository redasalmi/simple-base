import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { createSignal } from "solid-js";
import { describe, expect, test, vi } from "vitest";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  CheckboxGroup,
  CheckboxGroupItem,
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Fieldset,
  FieldsetLegend,
  Pagination,
  PaginationNext,
  PaginationPages,
  PaginationPrevious,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectControl,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../index";
import { currencies } from "./fixtures";

// Each component in three modes: uncontrolled, controlled by a parent that accepts every change,
// and controlled by a parent that rejects every change (A5), which must leave the UI as it was.

type Mode = "accepts" | "rejects";

/** A parent's state, which only follows the component's change events when the parent accepts. */
function parentState<T>(initial: T, mode: Mode) {
  const [value, setValue] = createSignal(initial);
  const onChange = vi.fn((next: T) => {
    if (mode === "accepts") setValue(() => next);
  });
  return { value, setValue, onChange };
}

describe.each([
  ["Dialog", Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose],
  [
    "AlertDialog",
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogCancel,
  ],
] as const)("%s", (_name, Root, Trigger, Content, Title, Close) => {
  function dialog() {
    return screen.getByRole<HTMLDialogElement>(_name === "Dialog" ? "dialog" : "alertdialog", {
      hidden: true,
    });
  }

  test("opens and closes uncontrolled", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(() => (
      <Root onOpenChange={onOpenChange}>
        <Trigger>Open</Trigger>
        <Content>
          <Title>Details</Title>
          <Close>Close</Close>
        </Content>
      </Root>
    ));
    expect(dialog().open).toBe(false);

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(dialog().open).toBe(true);

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(dialog().open).toBe(false);
    expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
  });

  test("starts open with defaultOpen", () => {
    render(() => (
      <Root defaultOpen>
        <Content>
          <Title>Details</Title>
        </Content>
      </Root>
    ));

    expect(dialog().open).toBe(true);
  });

  test.each(["accepts", "rejects"] as const)("follows `open` when the parent %s", async (mode) => {
    const user = userEvent.setup();
    const state = parentState(false, mode);
    render(() => (
      <Root open={state.value()} onOpenChange={state.onChange}>
        <Trigger>Open</Trigger>
        <Content>
          <Title>Details</Title>
          <Close>Close</Close>
        </Content>
      </Root>
    ));

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(state.onChange).toHaveBeenLastCalledWith(true);
    expect(dialog().open).toBe(mode === "accepts");

    state.setValue(true);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(state.onChange).toHaveBeenLastCalledWith(false);
    expect(dialog().open).toBe(mode === "rejects");

    state.setValue(false);
    expect(dialog().open).toBe(false);
  });
});

function currentPage() {
  return screen.getByRole("button", { current: "page" });
}

describe("Pagination", () => {
  test("changes page uncontrolled", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(() => (
      <Pagination count={5} defaultPage={2} onPageChange={onPageChange}>
        <PaginationPrevious>Previous</PaginationPrevious>
        <PaginationPages />
        <PaginationNext>Next</PaginationNext>
      </Pagination>
    ));
    expect(currentPage()).toHaveAccessibleName("Page 2");

    await user.click(screen.getByRole("button", { name: "Next page" }));
    await user.click(screen.getByRole("button", { name: "Page 5" }));

    expect(currentPage()).toHaveAccessibleName("Page 5");
    expect(onPageChange.mock.calls).toEqual([[3], [5]]);
  });

  test.each(["accepts", "rejects"] as const)("follows `page` when the parent %s", async (mode) => {
    const user = userEvent.setup();
    const state = parentState(2, mode);
    render(() => (
      <Pagination count={5} page={state.value()} onPageChange={state.onChange}>
        <PaginationPrevious>Previous</PaginationPrevious>
        <PaginationPages />
        <PaginationNext>Next</PaginationNext>
      </Pagination>
    ));

    await user.click(screen.getByRole("button", { name: "Previous page" }));

    expect(state.onChange).toHaveBeenLastCalledWith(1);
    expect(currentPage()).toHaveAccessibleName(mode === "accepts" ? "Page 1" : "Page 2");

    state.setValue(4);
    expect(currentPage()).toHaveAccessibleName("Page 4");
  });
});

function selectedTab() {
  return screen.getByRole("tab", { selected: true });
}

describe("Tabs", () => {
  test("changes tab uncontrolled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(() => (
      <Tabs defaultValue="details" onValueChange={onValueChange}>
        <TabsList aria-label="Invoice">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="details">Invoice details</TabsContent>
        <TabsContent value="history">Invoice history</TabsContent>
      </Tabs>
    ));
    expect(selectedTab()).toHaveAccessibleName("Details");

    await user.click(screen.getByRole("tab", { name: "History" }));

    expect(selectedTab()).toHaveAccessibleName("History");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Invoice history");
    expect(onValueChange.mock.calls).toEqual([["history"]]);
  });

  test.each(["accepts", "rejects"] as const)("follows `value` when the parent %s", async (mode) => {
    const user = userEvent.setup();
    const state = parentState("details", mode);
    render(() => (
      <Tabs value={state.value()} onValueChange={state.onChange}>
        <TabsList aria-label="Invoice">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="details">Invoice details</TabsContent>
        <TabsContent value="history">Invoice history</TabsContent>
      </Tabs>
    ));

    await user.click(screen.getByRole("tab", { name: "History" }));

    expect(state.onChange).toHaveBeenLastCalledWith("history");
    expect(selectedTab()).toHaveAccessibleName(mode === "accepts" ? "History" : "Details");

    state.setValue("details");
    expect(selectedTab()).toHaveAccessibleName("Details");
  });
});

function TestSelect(props: {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}) {
  return (
    <Select name="currency" placeholder="Select a currency" options={currencies} {...props}>
      <SelectLabel>Currency</SelectLabel>
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
  );
}

async function chooseSelectOption(name: string) {
  const user = userEvent.setup();
  await user.click(screen.getByRole("combobox", { name: "Currency" }));
  await user.click(await screen.findByRole("option", { name }));
}

function selectTrigger() {
  return screen.getByRole("combobox", { name: "Currency" });
}

describe("Select", () => {
  test("changes value uncontrolled", async () => {
    const onValueChange = vi.fn();
    render(() => <TestSelect defaultValue="eur" onValueChange={onValueChange} />);
    expect(selectTrigger()).toHaveTextContent("Euro");

    await chooseSelectOption("US dollar");

    expect(selectTrigger()).toHaveTextContent("US dollar");
    expect(onValueChange.mock.calls).toEqual([["usd"]]);
  });

  test.each(["accepts", "rejects"] as const)("follows `value` when the parent %s", async (mode) => {
    const state = parentState<string | null>("eur", mode);
    render(() => <TestSelect value={state.value()} onValueChange={state.onChange} />);

    await chooseSelectOption("US dollar");

    expect(state.onChange).toHaveBeenLastCalledWith("usd");
    expect(selectTrigger()).toHaveTextContent(mode === "accepts" ? "US dollar" : "Euro");

    state.setValue(null);
    expect(selectTrigger()).toHaveTextContent("Select a currency");
  });
});

function TestCombobox(props: {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}) {
  return (
    <Combobox name="currency" placeholder="Search currencies" options={currencies} {...props}>
      <ComboboxLabel>Currency</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger aria-label="Show currencies">▾</ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPortal>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxList>{(option) => <ComboboxItem option={option} />}</ComboboxList>
          </ComboboxContent>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  );
}

async function chooseComboboxOption(name: string) {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "Show currencies" }));
  await user.click(await screen.findByRole("option", { name }));
}

function comboboxInput() {
  return screen.getByRole("combobox", { name: "Currency" });
}

describe("Combobox", () => {
  test("changes value uncontrolled", async () => {
    const onValueChange = vi.fn();
    render(() => <TestCombobox defaultValue="eur" onValueChange={onValueChange} />);
    expect(comboboxInput()).toHaveValue("Euro");

    await chooseComboboxOption("US dollar");

    expect(comboboxInput()).toHaveValue("US dollar");
    expect(onValueChange.mock.calls).toEqual([["usd"]]);
  });

  test("follows `value` when the parent accepts", async () => {
    const state = parentState<string | null>("eur", "accepts");
    render(() => <TestCombobox value={state.value()} onValueChange={state.onChange} />);

    await chooseComboboxOption("US dollar");

    expect(state.onChange).toHaveBeenLastCalledWith("usd");
    expect(comboboxInput()).toHaveValue("US dollar");

    state.setValue(null);
    // Zag syncs the input text in a microtask.
    await expect.poll(comboboxInput).toHaveValue("");
  });

  // Zag writes the chosen label into the input and only syncs it again when the value changes, so
  // the component puts back the kept value's label (U8 in audit/zag-issues.md).
  test("follows `value` when the parent rejects", async () => {
    const state = parentState<string | null>("eur", "rejects");
    render(() => <TestCombobox value={state.value()} onValueChange={state.onChange} />);

    await chooseComboboxOption("US dollar");

    expect(state.onChange).toHaveBeenLastCalledWith("usd");
    await expect.poll(comboboxInput, { timeout: 200 }).toHaveValue("Euro");
  });
});

function TestRadioGroup(props: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <Fieldset>
      <FieldsetLegend>Plan</FieldsetLegend>
      <RadioGroup name="plan" {...props}>
        <RadioGroupItem value="monthly">Monthly</RadioGroupItem>
        <RadioGroupItem value="yearly">Yearly</RadioGroupItem>
      </RadioGroup>
    </Fieldset>
  );
}

function checkedRadio() {
  return screen.getAllByRole("radio").find((radio) => (radio as HTMLInputElement).checked);
}

describe("RadioGroup", () => {
  test("changes value uncontrolled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(() => <TestRadioGroup defaultValue="monthly" onValueChange={onValueChange} />);
    expect(checkedRadio()).toHaveAccessibleName("Monthly");

    await user.click(screen.getByRole("radio", { name: "Yearly" }));

    expect(checkedRadio()).toHaveAccessibleName("Yearly");
    expect(onValueChange.mock.calls).toEqual([["yearly"]]);
  });

  // A5: the browser checks the radio before the parent responds.
  test.each(["accepts", "rejects"] as const)(
    "follows `value` when the parent %s (A5)",
    async (mode) => {
      const user = userEvent.setup();
      const state = parentState("monthly", mode);
      render(() => <TestRadioGroup value={state.value()} onValueChange={state.onChange} />);

      await user.click(screen.getByRole("radio", { name: "Yearly" }));

      expect(state.onChange).toHaveBeenLastCalledWith("yearly");
      expect(checkedRadio()).toHaveAccessibleName(mode === "accepts" ? "Yearly" : "Monthly");

      state.setValue("monthly");
      expect(checkedRadio()).toHaveAccessibleName("Monthly");
    },
  );
});

function TestCheckboxGroup(props: {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}) {
  return (
    <Fieldset>
      <FieldsetLegend>Notify by</FieldsetLegend>
      <CheckboxGroup name="notify" {...props}>
        <CheckboxGroupItem value="email">Email</CheckboxGroupItem>
        <CheckboxGroupItem value="sms">SMS</CheckboxGroupItem>
      </CheckboxGroup>
    </Fieldset>
  );
}

function checkedBoxes() {
  return screen
    .getAllByRole<HTMLInputElement>("checkbox")
    .filter((box) => box.checked)
    .map((box) => box.value);
}

describe("CheckboxGroup", () => {
  test("changes value uncontrolled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(() => <TestCheckboxGroup defaultValue={["email"]} onValueChange={onValueChange} />);
    expect(checkedBoxes()).toEqual(["email"]);

    await user.click(screen.getByRole("checkbox", { name: "SMS" }));
    await user.click(screen.getByRole("checkbox", { name: "Email" }));

    expect(checkedBoxes()).toEqual(["sms"]);
    expect(onValueChange.mock.calls).toEqual([[["email", "sms"]], [["sms"]]]);
  });

  // A5: the browser toggles the box before the parent responds.
  test.each(["accepts", "rejects"] as const)(
    "follows `value` when the parent %s (A5)",
    async (mode) => {
      const user = userEvent.setup();
      const state = parentState(["email"], mode);
      render(() => <TestCheckboxGroup value={state.value()} onValueChange={state.onChange} />);

      await user.click(screen.getByRole("checkbox", { name: "SMS" }));

      expect(state.onChange).toHaveBeenLastCalledWith(["email", "sms"]);
      expect(checkedBoxes()).toEqual(mode === "accepts" ? ["email", "sms"] : ["email"]);

      state.setValue([]);
      expect(checkedBoxes()).toEqual([]);
    },
  );
});
