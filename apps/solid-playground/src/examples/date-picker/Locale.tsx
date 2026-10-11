import {
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

export default function Locale() {
  return (
    <div class="preview-fields">
      <DatePicker
        locale="fr-FR"
        timeZone="Europe/Paris"
        defaultValue={parseDateInput("2026-10-12")}
      >
        <DatePickerLabel>Date de livraison</DatePickerLabel>
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
  );
}
