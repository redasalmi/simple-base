import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxPortal,
  ComboboxPositioner,
} from "./Combobox";

const cities = [
  { label: "Besançon", value: "besancon" },
  { label: "Orléans", value: "orleans" },
  { label: "Paris", value: "paris" },
  { label: "Saint-Étienne", value: "saint-etienne" },
];

function renderCombobox() {
  render(() => (
    <Combobox options={cities}>
      <ComboboxLabel>City</ComboboxLabel>
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
  return screen.getByRole("combobox", { name: "City" });
}

const optionNames = () => screen.queryAllByRole("option").map((option) => option.textContent);

// P3: the filter ignores case and accents, so French names match without typing their accents.
test.each([
  ["etienne", ["Saint-Étienne"]],
  ["ORLE", ["Orléans"]],
  ["besancon", ["Besançon"]],
  // Decomposed "é", as some keyboards and pasted text produce it.
  ["E\u0301t", ["Saint-Étienne"]],
])("Combobox filters %j by base letters", async (search, expected) => {
  const user = userEvent.setup();
  const input = renderCombobox();

  await user.type(input, search);

  await expect.poll(optionNames).toEqual(expected);
});
