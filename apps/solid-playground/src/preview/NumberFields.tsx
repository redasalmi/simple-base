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
import { createSignal } from "solid-js";

import { Api, Example, FormDemo } from "./Preview";

export function NumberFields() {
  const [price, setPrice] = createSignal(1250);

  return (
    <>
      <Example
        title="Steppers and range"
        description="Use the buttons or the arrow keys to change the value; hold Shift for larger steps, and Home or End jumps to the limits. Type a number above 99 to see the error; leaving the field clamps it back into range."
        code={
          '<NumberField defaultValue="3" min={0} max={99}>\n  <NumberFieldLabel>Quantity</NumberFieldLabel>\n  <NumberFieldControl>\n    <NumberFieldInput />\n    <NumberFieldDecrement />\n    <NumberFieldIncrement />\n  </NumberFieldControl>\n  <NumberFieldDescription>Between 0 and 99.</NumberFieldDescription>\n  <NumberFieldError>Enter a quantity between 0 and 99.</NumberFieldError>\n</NumberField>'
        }
      >
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
      </Example>
      <Example
        title="Formatting and affixes"
        description="formatOptions formats the value for the locale once the field loses focus, while typing stays raw. An affix labels the unit without becoming part of the value."
        code={
          '<NumberField\n  defaultValue="1250"\n  formatOptions={{ style: "currency", currency: "EUR" }}\n  onValueChange={(value, valueAsNumber) => setPrice(valueAsNumber)}\n>\n  <NumberFieldLabel>Unit price</NumberFieldLabel>\n  <NumberFieldControl>\n    <NumberFieldInput />\n  </NumberFieldControl>\n</NumberField>\n\n<NumberField defaultValue="20" min={0} max={100} step={0.5}>\n  <NumberFieldLabel>Tax rate (%)</NumberFieldLabel>\n  <NumberFieldControl>\n    <NumberFieldInput />\n    <NumberFieldAffix>%</NumberFieldAffix>\n  </NumberFieldControl>\n</NumberField>'
        }
      >
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
      </Example>
      <Example
        title="States"
        description="Required adds the label marker, read-only keeps the value selectable, and disabled dims the whole field. invalid forces the error state regardless of the range."
        code={
          '<NumberField required>…</NumberField>\n<NumberField readOnly defaultValue="12">…</NumberField>\n<NumberField disabled defaultValue="0">…</NumberField>\n<NumberField invalid defaultValue="5">…</NumberField>'
        }
      >
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
      </Example>
      <Example
        title="In a form"
        description="With name and defaultValue the field needs no signal: it submits its value with the form, and Reset restores the initial value."
        code={
          '<form>\n  <NumberField name="quantity" defaultValue="2" min={1} max={10}>\n    <NumberFieldLabel>Licenses</NumberFieldLabel>\n    <NumberFieldControl>\n      <NumberFieldInput />\n      <NumberFieldDecrement />\n      <NumberFieldIncrement />\n    </NumberFieldControl>\n  </NumberField>\n  <Button type="submit">Submit</Button>\n  <Button type="reset">Reset</Button>\n</form>'
        }
      >
        <FormDemo>
          <div class="preview-fields">
            <NumberField name="quantity" defaultValue="2" min={1} max={10}>
              <NumberFieldLabel>Licenses</NumberFieldLabel>
              <NumberFieldControl>
                <NumberFieldInput />
                <NumberFieldDecrement />
                <NumberFieldIncrement />
              </NumberFieldControl>
            </NumberField>
          </div>
        </FormDemo>
      </Example>
      <Api
        rows={[
          [
            "NumberField",
            "id · name · form · required · disabled · readOnly · invalid",
            "Set on the root; the label, input, steppers, and messages read them. id is the input's id and is generated when omitted.",
          ],
          [
            "value / defaultValue / onValueChange",
            "string · (value: string, valueAsNumber: number) => void",
            "Values are strings so partial input such as “1.” survives. Use defaultValue for uncontrolled fields; onValueChange also passes the parsed number (NaN when empty).",
          ],
          [
            "min / max / step / formatOptions",
            "number · Intl.NumberFormatOptions",
            "Range and step drive the steppers and keyboard. Out-of-range values are invalid unless invalid is set, and are clamped when the field loses focus. formatOptions formats the displayed value.",
          ],
          [
            "NumberFieldLabel / NumberFieldControl / NumberFieldInput",
            "label / group / text input",
            "Control draws the bordered field. The input owns id, name, min, max, step, and its ARIA attributes; set those on the root.",
          ],
          [
            "NumberFieldDecrement / NumberFieldIncrement",
            "button",
            "Render − and + by default; pass an icon as children. They are labeled for assistive technology and disable at the range limits.",
          ],
          [
            "NumberFieldAffix",
            "span",
            "A unit before or after the input. The input lists it in aria-describedby, so the unit is announced with the value.",
          ],
          [
            "NumberFieldDescription / NumberFieldError",
            "paragraph",
            "Linked to the input with aria-describedby while rendered. The error renders only while the value is invalid.",
          ],
          [
            "Styles",
            "@simple-base/css/number-field",
            "Included in the main stylesheet. For individual imports, load @simple-base/tokens/css once before the component styles.",
          ],
        ]}
      />
    </>
  );
}
