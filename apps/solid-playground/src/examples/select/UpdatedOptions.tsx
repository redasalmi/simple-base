import {
  Button,
  Select,
  SelectContent,
  SelectControl,
  SelectEmpty,
  SelectIndicator,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

import { timezones } from "../data";
import { ChevronDownIcon } from "../icons";

export default function UpdatedOptions() {
  const [loaded, setLoaded] = createSignal(false);
  const [region, setRegion] = createSignal<string | null>(null);

  return (
    <div class="preview-stack">
      <Select
        id="region"
        placeholder="Select a region"
        options={loaded() ? timezones : []}
        onValueChange={setRegion}
      >
        <SelectLabel>Region</SelectLabel>
        <SelectControl>
          <SelectTrigger>
            <SelectValueText />
            <SelectIndicator>
              <ChevronDownIcon />
            </SelectIndicator>
          </SelectTrigger>
        </SelectControl>
        <SelectPortal>
          <SelectPositioner>
            <SelectContent>
              <SelectList>{(option) => <SelectItem option={option} />}</SelectList>
            </SelectContent>
            <SelectEmpty>
              {loaded() ? "No regions found." : "No regions available. Load the example options."}
            </SelectEmpty>
          </SelectPositioner>
        </SelectPortal>
      </Select>
      <div>
        <Button variant="secondary" disabled={loaded()} onClick={() => setLoaded(true)}>
          {loaded() ? "Options loaded" : "Load example options"}
        </Button>
      </div>
      <p class="preview-status" role="status">
        {region()
          ? `Selected value: ${region()}`
          : loaded()
            ? "Example options loaded. Choose a region."
            : "The collection is empty."}
      </p>
    </div>
  );
}
