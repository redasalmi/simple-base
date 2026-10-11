import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerControl,
  DatePickerDescription,
  DatePickerInput,
  DatePickerLabel,
  DatePickerPortal,
  DatePickerPositioner,
  DatePickerTrigger,
  parseDateInput,
} from "@simple-base/solid";

export default function Range() {
  return (
    <div class="preview-fields">
      <DatePicker
        defaultValue={parseDateInput("2026-10-12")}
        min={parseDateInput("2026-10-05")}
        max={parseDateInput("2026-11-20")}
      >
        <DatePickerLabel>Appointment</DatePickerLabel>
        <DatePickerControl>
          <DatePickerInput />
          <DatePickerTrigger />
        </DatePickerControl>
        <DatePickerDescription>Between October 5 and November 20.</DatePickerDescription>
        <DatePickerPortal>
          <DatePickerPositioner>
            <DatePickerContent>
              <DatePickerCalendar />
            </DatePickerContent>
          </DatePickerPositioner>
        </DatePickerPortal>
      </DatePicker>
    </div>
  );
}
