import {
  Button,
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

import { countries } from "../data";
import { ChevronDownIcon } from "../icons";

export default function InForm() {
  return (
    <form class="preview-stack">
      <Combobox name="country" options={countries} defaultValue="FR">
        <ComboboxLabel>Shipping country</ComboboxLabel>
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
      <div class="preview-row">
        <Button type="submit" variant="secondary">
          Submit
        </Button>
        <Button type="reset" variant="ghost">
          Reset
        </Button>
      </div>
    </form>
  );
}
