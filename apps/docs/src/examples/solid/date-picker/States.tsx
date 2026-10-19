import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerControl,
  DatePickerDescription,
  DatePickerError,
  DatePickerInput,
  DatePickerLabel,
  DatePickerPortal,
  DatePickerPositioner,
  DatePickerTrigger,
  parseDateInput,
} from "@simple-base/solid";

export default function States() {
  return (
    <div class="preview-fields">
      <DatePicker required>
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
      <DatePicker readOnly defaultValue={parseDateInput("2026-09-01")}>
        <DatePickerLabel>Contract start</DatePickerLabel>
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
      <DatePicker disabled defaultValue={parseDateInput("2027-09-01")}>
        <DatePickerLabel>Renewal date</DatePickerLabel>
        <DatePickerControl>
          <DatePickerInput />
          <DatePickerTrigger />
        </DatePickerControl>
        <DatePickerDescription>Set by your plan.</DatePickerDescription>
        <DatePickerPortal>
          <DatePickerPositioner>
            <DatePickerContent>
              <DatePickerCalendar />
            </DatePickerContent>
          </DatePickerPositioner>
        </DatePickerPortal>
      </DatePicker>
      <DatePicker invalid defaultValue={parseDateInput("2026-10-10")}>
        <DatePickerLabel>Delivery date</DatePickerLabel>
        <DatePickerControl>
          <DatePickerInput />
          <DatePickerTrigger />
        </DatePickerControl>
        <DatePickerError>Deliveries run Monday to Friday.</DatePickerError>
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
