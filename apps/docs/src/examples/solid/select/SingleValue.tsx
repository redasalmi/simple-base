import {
  Select,
  SelectContent,
  SelectControl,
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

import { timezones } from "../../shared/data";
import { ChevronDownIcon } from "../icons";

export default function SingleValue() {
  const [timezone, setTimezone] = createSignal<string | null>(null);

  return (
    <div class="preview-stack">
      <Select
        id="timezone"
        placeholder="Select a timezone"
        options={timezones}
        onValueChange={setTimezone}
      >
        <SelectLabel>Timezone</SelectLabel>
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
          </SelectPositioner>
        </SelectPortal>
      </Select>
      <p class="preview-status" role="status">
        {timezone()
          ? `Selected value: ${timezone()}`
          : "No timezone selected. The placeholder shows until a value is chosen."}
      </p>
    </div>
  );
}
