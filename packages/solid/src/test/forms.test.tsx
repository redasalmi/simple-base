import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { createSignal, type JSX } from "solid-js";
import { describe, expect, test, vi } from "vitest";

import {
  Checkbox,
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
  type ComboboxRootProps,
  DatePicker,
  DatePickerControl,
  DatePickerInput,
  DatePickerLabel,
  type DatePickerRootProps,
  Fieldset,
  FieldsetLegend,
  Input,
  NumberField,
  NumberFieldControl,
  NumberFieldInput,
  NumberFieldLabel,
  type NumberFieldRootProps,
  parseDateInput,
  Radio,
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
  type SelectRootProps,
  SelectTrigger,
  SelectValueText,
  Switch,
  TextArea,
} from "../index";
import { currencies } from "./fixtures";

// One block per row of the K2 table in audit/ROADMAP.md: what FormData holds, native `required`,
// `disabled`, `form`, and `form.reset()` (K3).

function renderForm(children: () => JSX.Element) {
  render(() => (
    <>
      <form id="form" aria-label="Form">
        {children()}
      </form>
      {/* Controls given `form="form"` render here, outside the form. */}
      <div data-testid="outside" />
    </>
  ));

  const form = screen.getByRole<HTMLFormElement>("form");
  return {
    form,
    entries: () => [...new FormData(form).entries()],
  };
}

function TestSelect(props: Partial<SelectRootProps>) {
  return (
    <Select placeholder="Select a currency" options={currencies} {...props}>
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

function TestCombobox(props: Partial<ComboboxRootProps>) {
  return (
    <Combobox placeholder="Search currencies" options={currencies} {...props}>
      <ComboboxLabel>Currency</ComboboxLabel>
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
  );
}

function TestNumberField(props: Partial<NumberFieldRootProps>) {
  return (
    <NumberField {...props}>
      <NumberFieldLabel>Amount</NumberFieldLabel>
      <NumberFieldControl>
        <NumberFieldInput />
      </NumberFieldControl>
    </NumberField>
  );
}

function TestDatePicker(props: Partial<DatePickerRootProps>) {
  return (
    <DatePicker {...props}>
      <DatePickerLabel>Due date</DatePickerLabel>
      <DatePickerControl>
        <DatePickerInput />
      </DatePickerControl>
    </DatePicker>
  );
}

async function selectOption(trigger: HTMLElement, name: string) {
  const user = userEvent.setup();
  await user.click(trigger);
  await user.click(await screen.findByRole("option", { name }));
}

describe("native controls", () => {
  test("submit their values", () => {
    const { entries } = renderForm(() => (
      <>
        <Input aria-label="Email" name="email" defaultValue="ada@example.com" />
        <TextArea aria-label="Notes" name="notes" defaultValue="Net 30" />
        <Checkbox aria-label="Terms" name="terms" defaultChecked />
        <Switch aria-label="Reminders" name="reminders" value="weekly" defaultChecked />
        <Radio aria-label="Small" name="size" value="small" />
        <Radio aria-label="Large" name="size" value="large" defaultChecked />
      </>
    ));

    expect(entries()).toEqual([
      ["email", "ada@example.com"],
      ["notes", "Net 30"],
      ["terms", "on"],
      ["reminders", "weekly"],
      ["size", "large"],
    ]);
  });

  test("leave out disabled controls", () => {
    const { entries } = renderForm(() => (
      <>
        <Input aria-label="Email" name="email" defaultValue="ada@example.com" disabled />
        <TextArea aria-label="Notes" name="notes" defaultValue="Net 30" disabled />
        <Checkbox aria-label="Terms" name="terms" defaultChecked disabled />
        <Switch aria-label="Reminders" name="reminders" defaultChecked disabled />
        <Radio aria-label="Large" name="size" value="large" defaultChecked disabled />
      </>
    ));

    expect(entries()).toEqual([]);
  });

  test("block submission while required and empty", () => {
    const { form } = renderForm(() => (
      <>
        <Input aria-label="Email" name="email" required />
        <TextArea aria-label="Notes" name="notes" required />
        <Checkbox aria-label="Terms" name="terms" required />
        <Switch aria-label="Reminders" name="reminders" required />
        <Radio aria-label="Large" name="size" value="large" required />
      </>
    ));

    const invalid = [...form.elements].filter(
      (element) => !(element as HTMLInputElement).checkValidity(),
    );
    expect(invalid).toHaveLength(5);
  });

  test("restore their default values on form.reset()", async () => {
    const user = userEvent.setup();
    const { form, entries } = renderForm(() => (
      <>
        <Input aria-label="Email" name="email" defaultValue="ada@example.com" />
        <TextArea aria-label="Notes" name="notes" defaultValue="Net 30" />
        <Checkbox aria-label="Terms" name="terms" defaultChecked />
        <Switch aria-label="Reminders" name="reminders" />
        <Radio aria-label="Small" name="size" value="small" />
        <Radio aria-label="Large" name="size" value="large" defaultChecked />
      </>
    ));
    const before = entries();

    await user.clear(screen.getByRole("textbox", { name: "Email" }));
    await user.type(screen.getByRole("textbox", { name: "Notes" }), " net");
    await user.click(screen.getByRole("checkbox", { name: "Terms" }));
    await user.click(screen.getByRole("switch", { name: "Reminders" }));
    await user.click(screen.getByRole("radio", { name: "Small" }));
    expect(entries()).not.toEqual(before);

    form.reset();

    expect(entries()).toEqual(before);
  });

  test("join a form elsewhere on the page through `form`", () => {
    render(() => (
      <>
        <form id="form" aria-label="Form" />
        <Input aria-label="Email" name="email" form="form" defaultValue="ada@example.com" />
        <Checkbox aria-label="Terms" name="terms" form="form" defaultChecked />
      </>
    ));

    const form = screen.getByRole<HTMLFormElement>("form");
    expect([...new FormData(form).entries()]).toEqual([
      ["email", "ada@example.com"],
      ["terms", "on"],
    ]);
  });
});

function TestRadioGroup(props: { required?: boolean; form?: string; disabled?: boolean }) {
  return (
    <Fieldset required={props.required}>
      <FieldsetLegend>Plan</FieldsetLegend>
      <RadioGroup name="plan" defaultValue="monthly">
        <RadioGroupItem value="monthly" form={props.form} disabled={props.disabled}>
          Monthly
        </RadioGroupItem>
        <RadioGroupItem value="yearly" form={props.form} disabled={props.disabled}>
          Yearly
        </RadioGroupItem>
      </RadioGroup>
    </Fieldset>
  );
}

describe("RadioGroup", () => {
  test("submits the checked value under the group's name", async () => {
    const user = userEvent.setup();
    const { entries } = renderForm(() => <TestRadioGroup />);
    expect(entries()).toEqual([["plan", "monthly"]]);

    await user.click(screen.getByRole("radio", { name: "Yearly" }));

    expect(entries()).toEqual([["plan", "yearly"]]);
  });

  test("leaves out disabled items", () => {
    const { entries } = renderForm(() => <TestRadioGroup disabled />);

    expect(entries()).toEqual([]);
  });

  test("is required through its Fieldset", () => {
    renderForm(() => (
      <Fieldset required>
        <FieldsetLegend>Plan</FieldsetLegend>
        <RadioGroup name="plan">
          <RadioGroupItem value="monthly">Monthly</RadioGroupItem>
        </RadioGroup>
      </Fieldset>
    ));

    expect(screen.getByRole<HTMLInputElement>("radio").checkValidity()).toBe(false);
  });

  test("restores defaultValue on form.reset()", async () => {
    const user = userEvent.setup();
    const { form, entries } = renderForm(() => <TestRadioGroup />);
    await user.click(screen.getByRole("radio", { name: "Yearly" }));

    form.reset();

    expect(entries()).toEqual([["plan", "monthly"]]);
  });

  test("joins a form elsewhere on the page through each item's `form`", () => {
    render(() => (
      <>
        <form id="form" aria-label="Form" />
        <TestRadioGroup form="form" />
      </>
    ));

    const form = screen.getByRole<HTMLFormElement>("form");
    expect([...new FormData(form).entries()]).toEqual([["plan", "monthly"]]);
  });
});

function TestCheckboxGroup(props: { required?: boolean; form?: string; disabled?: boolean }) {
  return (
    <Fieldset required={props.required}>
      <FieldsetLegend>Notify by</FieldsetLegend>
      <CheckboxGroup name="notify" defaultValue={["email"]}>
        <CheckboxGroupItem value="email" form={props.form} disabled={props.disabled}>
          Email
        </CheckboxGroupItem>
        <CheckboxGroupItem value="sms" form={props.form} disabled={props.disabled}>
          SMS
        </CheckboxGroupItem>
      </CheckboxGroup>
    </Fieldset>
  );
}

describe("CheckboxGroup", () => {
  test("submits each checked value under the group's name", async () => {
    const user = userEvent.setup();
    const { entries } = renderForm(() => <TestCheckboxGroup />);
    expect(entries()).toEqual([["notify", "email"]]);

    await user.click(screen.getByRole("checkbox", { name: "SMS" }));

    expect(entries()).toEqual([
      ["notify", "email"],
      ["notify", "sms"],
    ]);
  });

  test("leaves out disabled items", () => {
    const { entries } = renderForm(() => <TestCheckboxGroup disabled />);

    expect(entries()).toEqual([]);
  });

  // K2: HTML has no "at least one" rule for checkboxes, so every item is required while none is checked.
  test("is required through its Fieldset until one box is checked (K2)", async () => {
    const user = userEvent.setup();
    const { form } = renderForm(() => <TestCheckboxGroup required />);
    const email = screen.getByRole("checkbox", { name: "Email" });

    await user.click(email);
    expect(form.checkValidity()).toBe(false);

    await user.click(screen.getByRole("checkbox", { name: "SMS" }));
    expect(form.checkValidity()).toBe(true);
    expect(email).not.toBeRequired();
  });

  test("is required again when form.reset() unchecks every box (K2)", async () => {
    const user = userEvent.setup();
    const { form } = renderForm(() => (
      <Fieldset required>
        <FieldsetLegend>Notify by</FieldsetLegend>
        <CheckboxGroup name="notify">
          <CheckboxGroupItem value="email">Email</CheckboxGroupItem>
        </CheckboxGroup>
      </Fieldset>
    ));
    await user.click(screen.getByRole("checkbox", { name: "Email" }));
    expect(form.checkValidity()).toBe(true);

    form.reset();

    await expect.poll(() => form.checkValidity(), { timeout: 200 }).toBe(false);
  });

  // A5: the browser checks the box before the parent responds.
  test("stays required when the parent rejects the first box (K2, A5)", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { form } = renderForm(() => (
      <Fieldset required>
        <FieldsetLegend>Notify by</FieldsetLegend>
        <CheckboxGroup name="notify" value={[]} onValueChange={onValueChange}>
          <CheckboxGroupItem value="email">Email</CheckboxGroupItem>
        </CheckboxGroup>
      </Fieldset>
    ));
    const email = screen.getByRole("checkbox", { name: "Email" });

    await user.click(email);

    expect(onValueChange).toHaveBeenLastCalledWith(["email"]);
    expect(email).not.toBeChecked();
    expect(email).toBeRequired();
    expect(form.checkValidity()).toBe(false);
  });

  test("restores defaultValue on form.reset()", async () => {
    const user = userEvent.setup();
    const { form, entries } = renderForm(() => <TestCheckboxGroup />);
    await user.click(screen.getByRole("checkbox", { name: "Email" }));
    await user.click(screen.getByRole("checkbox", { name: "SMS" }));

    form.reset();

    expect(entries()).toEqual([["notify", "email"]]);
  });

  test("joins a form elsewhere on the page through each item's `form`", () => {
    render(() => (
      <>
        <form id="form" aria-label="Form" />
        <TestCheckboxGroup form="form" />
      </>
    ));

    const form = screen.getByRole<HTMLFormElement>("form");
    expect([...new FormData(form).entries()]).toEqual([["notify", "email"]]);
  });
});

describe("Select", () => {
  test("submits the option value", async () => {
    const { entries } = renderForm(() => <TestSelect name="currency" />);

    await selectOption(screen.getByRole("combobox", { name: "Currency" }), "US dollar");

    expect(entries()).toEqual([["currency", "usd"]]);
  });

  // K2: like a native select with an empty placeholder option.
  test("submits an empty value while nothing is selected (K2)", () => {
    const { entries } = renderForm(() => <TestSelect name="currency" />);

    expect(entries()).toEqual([["currency", ""]]);
  });

  test("submits an empty value once the selection is cleared (K2)", async () => {
    const [value, setValue] = createSignal<string | null>("usd");
    const { entries } = renderForm(() => <TestSelect name="currency" value={value()} />);
    expect(entries()).toEqual([["currency", "usd"]]);

    setValue(null);

    await expect.poll(entries).toEqual([["currency", ""]]);
  });

  test("leaves out a disabled select", () => {
    const { entries } = renderForm(() => (
      <TestSelect name="currency" defaultValue="usd" disabled />
    ));

    expect(entries()).toEqual([]);
  });

  test("blocks submission while required and empty", async () => {
    const { form } = renderForm(() => <TestSelect name="currency" required />);
    expect(form.checkValidity()).toBe(false);

    await selectOption(screen.getByRole("combobox", { name: "Currency" }), "Euro");

    expect(form.checkValidity()).toBe(true);
  });

  test("restores defaultValue on form.reset()", async () => {
    const { form, entries } = renderForm(() => <TestSelect name="currency" defaultValue="usd" />);
    const trigger = screen.getByRole("combobox", { name: "Currency" });
    await selectOption(trigger, "Euro");

    form.reset();

    await expect.poll(entries).toEqual([["currency", "usd"]]);
    expect(trigger).toHaveTextContent("US dollar");
  });

  test("returns to the empty value on form.reset() (K2)", async () => {
    const { form, entries } = renderForm(() => <TestSelect name="currency" />);
    const trigger = screen.getByRole("combobox", { name: "Currency" });
    await selectOption(trigger, "Euro");

    form.reset();

    await expect.poll(entries).toEqual([["currency", ""]]);
    expect(trigger).toHaveTextContent("Select a currency");
  });

  // Z6: the `selected` attribute is what the browser restores when Zag's value hasn't changed.
  test("keeps an unchanged value on form.reset() (Z6)", async () => {
    const { form, entries } = renderForm(() => <TestSelect name="currency" defaultValue="usd" />);

    form.reset();
    await Promise.resolve();

    expect(entries()).toEqual([["currency", "usd"]]);
  });

  test("joins a form elsewhere on the page through `form`", () => {
    render(() => (
      <>
        <form id="form" aria-label="Form" />
        <TestSelect name="currency" form="form" defaultValue="usd" />
      </>
    ));

    const form = screen.getByRole<HTMLFormElement>("form");
    expect([...new FormData(form).entries()]).toEqual([["currency", "usd"]]);
  });
});

describe("Combobox", () => {
  test("submits the option value, not the typed text (Z2)", async () => {
    const user = userEvent.setup();
    const { entries } = renderForm(() => <TestCombobox name="currency" />);

    const input = screen.getByRole("combobox", { name: "Currency" });
    await user.type(input, "dol");
    await user.click(await screen.findByRole("option", { name: "US dollar" }));

    expect(input).toHaveValue("US dollar");
    expect(entries()).toEqual([["currency", "usd"]]);
  });

  // K2: like a native select with an empty placeholder option.
  test("submits an empty value while nothing is selected (K2)", () => {
    const { entries } = renderForm(() => <TestCombobox name="currency" />);

    expect(entries()).toEqual([["currency", ""]]);
  });

  test("submits an empty value once the selection is cleared (K2)", async () => {
    const [value, setValue] = createSignal<string | null>("usd");
    const { entries } = renderForm(() => <TestCombobox name="currency" value={value()} />);
    expect(entries()).toEqual([["currency", "usd"]]);

    setValue(null);

    await expect.poll(entries).toEqual([["currency", ""]]);
  });

  test("leaves out a disabled combobox", () => {
    const { entries } = renderForm(() => (
      <TestCombobox name="currency" defaultValue="usd" disabled />
    ));

    expect(entries()).toEqual([]);
  });

  test("blocks submission while required and empty", async () => {
    const user = userEvent.setup();
    const { form } = renderForm(() => <TestCombobox name="currency" required />);
    expect(form.checkValidity()).toBe(false);

    await user.type(screen.getByRole("combobox", { name: "Currency" }), "eu");
    await user.click(await screen.findByRole("option", { name: "Euro" }));

    expect(form.checkValidity()).toBe(true);
  });

  // K3: Zag's combobox has no form reset tracking, so the component adds a listener.
  test("restores defaultValue on form.reset() (K3)", async () => {
    const user = userEvent.setup();
    const { form, entries } = renderForm(() => <TestCombobox name="currency" defaultValue="usd" />);
    const input = screen.getByRole("combobox", { name: "Currency" });
    await user.clear(input);
    await user.type(input, "eu");
    await user.click(await screen.findByRole("option", { name: "Euro" }));
    expect(entries()).toEqual([["currency", "eur"]]);

    form.reset();

    await expect.poll(entries, { timeout: 200 }).toEqual([["currency", "usd"]]);
    expect(input).toHaveValue("US dollar");
  });

  // Z1: Zag's Solid adapter sets the text as a live `value`, which a reset would clear.
  test("keeps its text on form.reset() when nothing changed (Z1)", async () => {
    const { form } = renderForm(() => <TestCombobox name="currency" defaultValue="usd" />);
    const input = screen.getByRole("combobox", { name: "Currency" });

    form.reset();
    await new Promise(requestAnimationFrame);

    expect(input).toHaveValue("US dollar");
  });

  test("restores the label of an unchanged value on form.reset() (K3)", async () => {
    const user = userEvent.setup();
    const { form, entries } = renderForm(() => <TestCombobox name="currency" defaultValue="usd" />);
    const input = screen.getByRole("combobox", { name: "Currency" });
    await user.clear(input);
    await user.type(input, "eu");

    form.reset();

    await expect.poll(() => input).toHaveValue("US dollar");
    expect(entries()).toEqual([["currency", "usd"]]);
  });

  test("returns to the empty value on form.reset() (K3)", async () => {
    const user = userEvent.setup();
    const { form, entries } = renderForm(() => <TestCombobox name="currency" />);
    const input = screen.getByRole("combobox", { name: "Currency" });
    await user.type(input, "eu");
    await user.click(await screen.findByRole("option", { name: "Euro" }));

    form.reset();

    await expect.poll(entries).toEqual([["currency", ""]]);
    expect(input).toHaveValue("");
  });

  test("joins a form elsewhere on the page through `form`", () => {
    render(() => (
      <>
        <form id="form" aria-label="Form" />
        <TestCombobox name="currency" form="form" defaultValue="usd" />
      </>
    ));

    const form = screen.getByRole<HTMLFormElement>("form");
    expect([...new FormData(form).entries()]).toEqual([["currency", "usd"]]);
  });
});

describe("NumberField", () => {
  // Z1: the input keeps partial text while typing instead of reformatting it.
  test("keeps a partial number while typing (Z1)", async () => {
    const user = userEvent.setup();
    const values: string[] = [];
    renderForm(() => (
      <TestNumberField name="amount" onValueChange={(value) => values.push(value)} />
    ));
    const input = screen.getByRole("spinbutton", { name: "Amount" });

    await user.type(input, "1.");

    expect(input).toHaveValue("1.");
    expect(values.at(-1)).toBe("1.");

    await user.type(input, "5");
    await user.tab();

    expect(input).toHaveValue("1.5");
  });

  test("submits the number", async () => {
    const { entries } = renderForm(() => <TestNumberField name="amount" defaultValue="1234" />);

    expect(entries()).toEqual([["amount", "1234"]]);
  });

  // K2: Zag names the visible input, which holds the formatted text, so a hidden input submits the number.
  test("submits the number, not the formatted text (K2)", () => {
    const { entries } = renderForm(() => (
      <TestNumberField
        name="amount"
        defaultValue="1234"
        formatOptions={{ style: "currency", currency: "EUR" }}
      />
    ));

    expect(entries()).toEqual([["amount", "1234"]]);
  });

  test("leaves out a disabled field", () => {
    const { entries } = renderForm(() => (
      <TestNumberField name="amount" defaultValue="1234" disabled />
    ));

    expect(entries()).toEqual([]);
  });

  test("blocks submission while required and empty", async () => {
    const user = userEvent.setup();
    const { form } = renderForm(() => <TestNumberField name="amount" required />);
    expect(form.checkValidity()).toBe(false);

    await user.type(screen.getByRole("spinbutton", { name: "Amount" }), "12");

    expect(form.checkValidity()).toBe(true);
  });

  test("restores defaultValue on form.reset()", async () => {
    const user = userEvent.setup();
    const { form, entries } = renderForm(() => (
      <TestNumberField name="amount" defaultValue="1234" />
    ));
    const input = screen.getByRole("spinbutton", { name: "Amount" });
    await user.clear(input);
    await user.type(input, "99");
    await user.tab();

    form.reset();

    await expect.poll(() => input).toHaveValue("1234");
    expect(entries()).toEqual([["amount", "1234"]]);
  });

  // Z1: Zag's Solid adapter sets the text as a live `value`, which a reset would clear.
  test("keeps its text on form.reset() when nothing changed (Z1)", async () => {
    const { form } = renderForm(() => (
      <TestNumberField
        name="amount"
        defaultValue="1234"
        formatOptions={{ style: "currency", currency: "EUR" }}
      />
    ));
    const input = screen.getByRole("spinbutton", { name: "Amount" });

    form.reset();
    await new Promise(requestAnimationFrame);

    expect(input).toHaveValue("€1,234.00");
  });

  test("joins a form elsewhere on the page through `form`", () => {
    render(() => (
      <>
        <form id="form" aria-label="Form" />
        <TestNumberField name="amount" form="form" defaultValue="12" />
      </>
    ));

    const form = screen.getByRole<HTMLFormElement>("form");
    expect([...new FormData(form).entries()]).toEqual([["amount", "12"]]);
  });
});

describe("DatePicker", () => {
  // Z1: typed text becomes the value when the input loses focus.
  test("parses a typed date (Z1)", async () => {
    const user = userEvent.setup();
    const values: (string | undefined)[] = [];
    renderForm(() => (
      <TestDatePicker name="due" onValueChange={(value) => values.push(value?.toString())} />
    ));
    const input = screen.getByRole("textbox", { name: "Due date" });

    await user.type(input, "10/15/2026");

    expect(input).toHaveValue("10/15/2026");

    await user.tab();

    expect(input).toHaveValue("10/15/2026");
    expect(values.at(-1)).toBe("2026-10-15");
  });

  test("submits the ISO date, not the formatted text (Z8)", async () => {
    const user = userEvent.setup();
    const { entries } = renderForm(() => <TestDatePicker name="due" />);
    expect(entries()).toEqual([["due", ""]]);

    await user.type(screen.getByRole("textbox", { name: "Due date" }), "10/15/2026");
    await user.tab();

    expect(entries()).toEqual([["due", "2026-10-15"]]);
  });

  test("leaves out a disabled picker", () => {
    const { entries } = renderForm(() => (
      <TestDatePicker name="due" defaultValue={parseDateInput("2026-10-12")} disabled />
    ));

    expect(entries()).toEqual([]);
  });

  test("blocks submission while required and empty", async () => {
    const user = userEvent.setup();
    const { form } = renderForm(() => <TestDatePicker name="due" required />);
    expect(form.checkValidity()).toBe(false);

    await user.type(screen.getByRole("textbox", { name: "Due date" }), "10/15/2026");
    await user.tab();

    expect(form.checkValidity()).toBe(true);
  });

  // Z7, K3: Zag's date picker has no form reset tracking, so the component adds a listener.
  test("restores defaultValue on form.reset() (Z7, K3)", async () => {
    const user = userEvent.setup();
    const { form, entries } = renderForm(() => (
      <TestDatePicker name="due" defaultValue={parseDateInput("2026-10-12")} />
    ));
    const input = screen.getByRole("textbox", { name: "Due date" });
    await user.clear(input);
    await user.type(input, "10/15/2026");
    await user.tab();
    expect(entries()).toEqual([["due", "2026-10-15"]]);

    form.reset();

    await expect.poll(entries).toEqual([["due", "2026-10-12"]]);
    expect(input).toHaveValue("10/12/2026");
  });

  // Z1: Zag's Solid adapter sets the text as a live `value`, which a reset would clear.
  test("keeps its text on form.reset() when nothing changed (Z1)", async () => {
    const { form } = renderForm(() => (
      <TestDatePicker name="due" defaultValue={parseDateInput("2026-10-12")} />
    ));
    const input = screen.getByRole("textbox", { name: "Due date" });

    form.reset();
    await new Promise(requestAnimationFrame);

    expect(input).toHaveValue("10/12/2026");
  });

  test("joins a form elsewhere on the page through `form`", () => {
    render(() => (
      <>
        <form id="form" aria-label="Form" />
        <TestDatePicker name="due" form="form" defaultValue={parseDateInput("2026-10-12")} />
      </>
    ));

    const form = screen.getByRole<HTMLFormElement>("form");
    expect([...new FormData(form).entries()]).toEqual([["due", "2026-10-12"]]);
  });
});
