import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

import { countries } from "../data";
import { ChevronDownIcon } from "../icons";

export default function SearchAndSelect() {
  const [country, setCountry] = createSignal<string | null>(null);

  return (
    <div class="preview-stack">
      <Combobox
        id="country"
        options={countries}
        placeholder="Search countries"
        onValueChange={setCountry}
      >
        <ComboboxLabel>Country</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput />
          <ComboboxTrigger>
            <ChevronDownIcon />
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxContent>
              <ComboboxList>{(option) => <ComboboxItem option={option} />}</ComboboxList>
            </ComboboxContent>
            <ComboboxEmpty>No countries found. Try another search.</ComboboxEmpty>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
      <p class="preview-status" role="status">
        {country()
          ? `Selected value: ${country()}`
          : "No country selected. Typing only filters the list."}
      </p>
    </div>
  );
}
