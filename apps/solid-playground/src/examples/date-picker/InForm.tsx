import {
  Button,
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerControl,
  DatePickerInput,
  DatePickerLabel,
  DatePickerPortal,
  DatePickerPositioner,
  DatePickerTrigger,
  parseDateInput,
} from "@simple-base/solid";

export default function InForm() {
  return (
    <form class="preview-stack">
      <div class="preview-fields">
        <DatePicker name="start" defaultValue={parseDateInput("2026-10-15")}>
          <DatePickerLabel>Start date</DatePickerLabel>
          <DatePickerControl>
            <DatePickerInput />
            <DatePickerTrigger />
          </DatePickerControl>
          <DatePickerPortal>
            <DatePickerPositioner>
              <DatePickerContent>
                <DatePickerCalendar />
              </DatePickerContent>
            </DatePickerPositioner>
          </DatePickerPortal>
        </DatePicker>
      </div>
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
