import {
  Button,
  Select,
  SelectContent,
  SelectControl,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from "@simple-base/solid";

const timezones = [
  { label: "Central European Time", value: "cet" },
  { label: "Coordinated Universal Time", value: "utc" },
];

export function App() {
  return (
    <main>
      <Button type="button">Save</Button>
      <Select id="timezone" placeholder="Select a timezone" options={timezones}>
        <SelectLabel>Timezone</SelectLabel>
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
    </main>
  );
}
