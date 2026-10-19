import {
  NumberField,
  NumberFieldAffix,
  NumberFieldControl,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function Formatting() {
  const [price, setPrice] = createSignal(1250);

  return (
    <div class="preview-stack">
      <div class="preview-fields">
        <NumberField
          defaultValue="1250"
          formatOptions={{ style: "currency", currency: "EUR" }}
          onValueChange={(_, valueAsNumber) => setPrice(valueAsNumber)}
        >
          <NumberFieldLabel>Unit price</NumberFieldLabel>
          <NumberFieldControl>
            <NumberFieldInput />
          </NumberFieldControl>
        </NumberField>
        <NumberField defaultValue="20" min={0} max={100} step={0.5}>
          <NumberFieldLabel>Tax rate (%)</NumberFieldLabel>
          <NumberFieldControl>
            <NumberFieldInput />
            <NumberFieldAffix>%</NumberFieldAffix>
            <NumberFieldDecrement />
            <NumberFieldIncrement />
          </NumberFieldControl>
        </NumberField>
      </div>
      <p class="preview-status" role="status">
        {Number.isNaN(price()) ? "No unit price entered." : `Parsed unit price: ${price()}`}
      </p>
    </div>
  );
}
