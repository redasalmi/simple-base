import { render, screen } from "@solidjs/testing-library";
import { type Accessor, createSignal, type JSX, Show } from "solid-js";
import { describe, expect, test } from "vitest";

import {
  Combobox,
  ComboboxControl,
  ComboboxDescription,
  ComboboxError,
  ComboboxInput,
  ComboboxLabel,
  DatePicker,
  DatePickerControl,
  DatePickerDescription,
  DatePickerError,
  DatePickerInput,
  DatePickerLabel,
  Field,
  FieldDescription,
  FieldError,
  FieldInput,
  FieldLabel,
  Fieldset,
  FieldsetDescription,
  FieldsetError,
  FieldsetLegend,
  NumberField,
  NumberFieldAffix,
  NumberFieldControl,
  NumberFieldDescription,
  NumberFieldError,
  NumberFieldInput,
  NumberFieldLabel,
  Select,
  SelectControl,
  SelectDescription,
  SelectError,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
} from "../index";
import { currencies } from "./fixtures";

// How each root lists its Description and Error parts in `aria-describedby` as they mount and
// unmount. The parts register on mount (R1), so the ids land after the first render.

type Parts = {
  descriptions: Accessor<number>;
  error: Accessor<boolean>;
  invalid: Accessor<boolean>;
};

type Case = {
  name: string;
  root: (parts: Parts) => JSX.Element;
  /** The element that carries `aria-describedby`. */
  target: () => HTMLElement;
};

function repeat(count: Accessor<number>, part: () => JSX.Element) {
  return (
    <>
      <Show when={count() >= 1}>{part()}</Show>
      <Show when={count() >= 2}>{part()}</Show>
    </>
  );
}

const cases: Case[] = [
  {
    name: "Field",
    root: (parts) => (
      <Field id="x" invalid={parts.invalid()}>
        <FieldLabel>Email</FieldLabel>
        <FieldInput />
        {repeat(parts.descriptions, () => (
          <FieldDescription>We send receipts here.</FieldDescription>
        ))}
        <Show when={parts.error()}>
          <FieldError>Enter an email address.</FieldError>
        </Show>
      </Field>
    ),
    target: () => screen.getByRole("textbox", { name: "Email" }),
  },
  {
    name: "Fieldset",
    root: (parts) => (
      <Fieldset id="x" invalid={parts.invalid()}>
        <FieldsetLegend>Billing</FieldsetLegend>
        {repeat(parts.descriptions, () => (
          <FieldsetDescription>Shown on invoices.</FieldsetDescription>
        ))}
        <Show when={parts.error()}>
          <FieldsetError>Choose a plan.</FieldsetError>
        </Show>
      </Fieldset>
    ),
    target: () => screen.getByRole("group", { name: "Billing" }),
  },
  {
    name: "NumberField",
    root: (parts) => (
      <NumberField id="x" invalid={parts.invalid()}>
        <NumberFieldLabel>Amount</NumberFieldLabel>
        <NumberFieldControl>
          <NumberFieldInput />
        </NumberFieldControl>
        {repeat(parts.descriptions, () => (
          <NumberFieldDescription>Excluding VAT.</NumberFieldDescription>
        ))}
        <Show when={parts.error()}>
          <NumberFieldError>Enter an amount.</NumberFieldError>
        </Show>
      </NumberField>
    ),
    target: () => screen.getByRole("spinbutton", { name: "Amount" }),
  },
  {
    name: "DatePicker",
    root: (parts) => (
      <DatePicker id="x" invalid={parts.invalid()}>
        <DatePickerLabel>Due date</DatePickerLabel>
        <DatePickerControl>
          <DatePickerInput />
        </DatePickerControl>
        {repeat(parts.descriptions, () => (
          <DatePickerDescription>Within 30 days.</DatePickerDescription>
        ))}
        <Show when={parts.error()}>
          <DatePickerError>Pick a date.</DatePickerError>
        </Show>
      </DatePicker>
    ),
    target: () => screen.getByRole("textbox", { name: "Due date" }),
  },
  {
    name: "Select",
    root: (parts) => (
      <Select id="x" options={currencies} invalid={parts.invalid()}>
        <SelectLabel>Currency</SelectLabel>
        <SelectControl>
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
        </SelectControl>
        {repeat(parts.descriptions, () => (
          <SelectDescription>Used on every invoice.</SelectDescription>
        ))}
        <Show when={parts.error()}>
          <SelectError>Pick a currency.</SelectError>
        </Show>
      </Select>
    ),
    target: () => screen.getByRole("combobox", { name: "Currency" }),
  },
  {
    name: "Combobox",
    root: (parts) => (
      <Combobox id="x" options={currencies} invalid={parts.invalid()}>
        <ComboboxLabel>Currency</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput />
        </ComboboxControl>
        {repeat(parts.descriptions, () => (
          <ComboboxDescription>Used on every invoice.</ComboboxDescription>
        ))}
        <Show when={parts.error()}>
          <ComboboxError>Pick a currency.</ComboboxError>
        </Show>
      </Combobox>
    ),
    target: () => screen.getByRole("combobox", { name: "Currency" }),
  },
];

function renderCase(testCase: Case, initial: { descriptions?: number; error?: boolean } = {}) {
  const [descriptions, setDescriptions] = createSignal(initial.descriptions ?? 0);
  const [error, setError] = createSignal(initial.error ?? false);
  const [invalid, setInvalid] = createSignal(false);
  render(() => testCase.root({ descriptions, error, invalid }));

  return {
    setDescriptions,
    setError,
    setInvalid,
    describedBy: () => testCase.target().getAttribute("aria-describedby"),
  };
}

describe.each(cases.map((testCase) => [testCase.name, testCase] as const))("%s", (_, testCase) => {
  test("has no aria-describedby without parts", () => {
    const { describedBy } = renderCase(testCase);

    expect(describedBy()).toBeNull();
  });

  test("lists the description while it is rendered", () => {
    const { describedBy, setDescriptions } = renderCase(testCase, { descriptions: 1 });
    expect(describedBy()).toBe("x-description");
    expect(testCase.target()).toHaveAccessibleDescription(/./);

    setDescriptions(0);
    expect(describedBy()).toBeNull();

    setDescriptions(1);
    expect(describedBy()).toBe("x-description");
  });

  test("lists the error only while invalid", () => {
    const { describedBy, setInvalid, setError } = renderCase(testCase, {
      descriptions: 1,
      error: true,
    });
    expect(describedBy()).toBe("x-description");
    expect(document.getElementById("x-error")).toBeNull();

    setInvalid(true);
    expect(describedBy()).toBe("x-description x-error");
    expect(document.getElementById("x-error")).not.toBeNull();

    setError(false);
    expect(describedBy()).toBe("x-description");

    setError(true);
    setInvalid(false);
    expect(describedBy()).toBe("x-description");
  });

  // R1: registration is a boolean, so unmounting one of two descriptions drops both.
  test.fails("keeps the description while a second one unmounts (R1)", () => {
    const { describedBy, setDescriptions } = renderCase(testCase, { descriptions: 2 });
    expect(describedBy()).toBe("x-description");

    setDescriptions(1);

    expect(describedBy()).toBe("x-description");
  });
});

describe("NumberFieldAffix", () => {
  test("is listed before the description while it is rendered (K4)", () => {
    const [affix, setAffix] = createSignal(true);
    render(() => (
      <NumberField id="x">
        <NumberFieldLabel>Amount</NumberFieldLabel>
        <NumberFieldControl>
          <NumberFieldInput />
          <Show when={affix()}>
            <NumberFieldAffix>EUR</NumberFieldAffix>
          </Show>
        </NumberFieldControl>
        <NumberFieldDescription>Excluding VAT.</NumberFieldDescription>
      </NumberField>
    ));
    const input = screen.getByRole("spinbutton", { name: "Amount" });

    expect(input).toHaveAccessibleDescription("EUR Excluding VAT.");

    setAffix(false);
    expect(input).toHaveAccessibleDescription("Excluding VAT.");
  });
});
