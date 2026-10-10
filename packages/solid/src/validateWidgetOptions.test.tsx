import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";

import { Combobox, ComboboxLabel } from "./components/Combobox";
import { Select, SelectLabel } from "./components/Select";

const duplicates = [
  { label: "Euro", value: "eur" },
  { label: "Euro (again)", value: "eur" },
];

// P2: the check runs only in Solid's development build, which the tests use.
test("Select rejects duplicate option values in development", () => {
  expect(() =>
    render(() => (
      <Select options={duplicates}>
        <SelectLabel>Currency</SelectLabel>
      </Select>
    )),
  ).toThrow('Select option values must be unique. Duplicate value: "eur".');
});

test("Combobox rejects empty option values in development", () => {
  expect(() =>
    render(() => (
      <Combobox options={[{ label: "None", value: "" }]}>
        <ComboboxLabel>Currency</ComboboxLabel>
      </Combobox>
    )),
  ).toThrow("Combobox option values must be non-empty.");
});
