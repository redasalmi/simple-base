import {
  Button,
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

import { timezones } from "../../shared/data";
import { ChevronDownIcon } from "../icons";

export default function InForm() {
  return (
    <form class="preview-stack">
      <Select name="timezone" options={timezones} defaultValue="utc">
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
