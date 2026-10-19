import {
  NumberField,
  NumberFieldAffix,
  NumberFieldControl,
  NumberFieldDecrement,
  NumberFieldDescription,
  NumberFieldError,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from "@simple-base/solid";

export default function States() {
  return (
    <div class="preview-fields">
      <NumberField required>
        <NumberFieldLabel>Seats</NumberFieldLabel>
        <NumberFieldControl>
          <NumberFieldInput placeholder="0" />
          <NumberFieldDecrement />
          <NumberFieldIncrement />
        </NumberFieldControl>
      </NumberField>
      <NumberField readOnly defaultValue="12">
        <NumberFieldLabel>Billing cycle (months)</NumberFieldLabel>
        <NumberFieldControl>
          <NumberFieldInput />
          <NumberFieldDecrement />
          <NumberFieldIncrement />
        </NumberFieldControl>
      </NumberField>
      <NumberField disabled defaultValue="0">
        <NumberFieldLabel>Discount (%)</NumberFieldLabel>
        <NumberFieldControl>
          <NumberFieldInput />
          <NumberFieldAffix>%</NumberFieldAffix>
        </NumberFieldControl>
        <NumberFieldDescription>Set by your plan.</NumberFieldDescription>
      </NumberField>
      <NumberField invalid defaultValue="5">
        <NumberFieldLabel>Team size</NumberFieldLabel>
        <NumberFieldControl>
          <NumberFieldInput />
          <NumberFieldDecrement />
          <NumberFieldIncrement />
        </NumberFieldControl>
        <NumberFieldError>Your plan allows up to 3 members.</NumberFieldError>
      </NumberField>
    </div>
  );
}
