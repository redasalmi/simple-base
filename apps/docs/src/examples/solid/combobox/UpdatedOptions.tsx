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
import { createSignal } from "solid-js";

import { countries } from "../../shared/data";
import { ChevronDownIcon } from "../icons";

export default function UpdatedOptions() {
  const [loaded, setLoaded] = createSignal(false);
  const [destination, setDestination] = createSignal<string | null>(null);

  return (
    <div class="preview-stack">
      <Combobox
        id="destination"
        options={loaded() ? countries : []}
        placeholder="Search destinations"
        onValueChange={setDestination}
      >
        <ComboboxLabel>Destination</ComboboxLabel>
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
            <ComboboxEmpty>
              {loaded()
                ? "No destinations found. Try another search."
                : "No destinations available. Load the example options."}
            </ComboboxEmpty>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
      <div>
        <Button variant="secondary" disabled={loaded()} onClick={() => setLoaded(true)}>
          {loaded() ? "Options loaded" : "Load example options"}
        </Button>
      </div>
      <p class="preview-status" role="status">
        {destination()
          ? `Selected value: ${destination()}`
          : loaded()
            ? "Example options loaded. Choose a destination."
            : "The collection is empty."}
      </p>
    </div>
  );
}
