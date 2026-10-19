import {
  NumberField,
  NumberFieldControl,
  NumberFieldDecrement,
  NumberFieldDescription,
  NumberFieldError,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from "@simple-base/solid";

export default function Range() {
  return (
    <div class="preview-fields">
      <NumberField defaultValue="3" min={0} max={99}>
        <NumberFieldLabel>Quantity</NumberFieldLabel>
        <NumberFieldControl>
          <NumberFieldInput />
          <NumberFieldDecrement />
          <NumberFieldIncrement />
        </NumberFieldControl>
        <NumberFieldDescription>Between 0 and 99.</NumberFieldDescription>
        <NumberFieldError>Enter a quantity between 0 and 99.</NumberFieldError>
      </NumberField>
    </div>
  );
}
