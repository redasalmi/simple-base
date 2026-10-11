import { Api, Example } from "./Preview";

export function NumberFields() {
  return (
    <>
      <Example
        title="Steppers and range"
        description="Use the buttons or the arrow keys to change the value; hold Shift for larger steps, and Home or End jumps to the limits. Type a number above 99 to see the error; leaving the field clamps it back into range."
        example="number-field/Range"
      />
      <Example
        title="Formatting and affixes"
        description="formatOptions formats the value for the locale once the field loses focus, while typing stays raw. An affix labels the unit without becoming part of the value."
        example="number-field/Formatting"
      />
      <Example
        title="States"
        description="Required adds the label marker, read-only keeps the value selectable, and disabled dims the whole field. invalid forces the error state regardless of the range."
        example="number-field/States"
      />
      <Example
        title="In a form"
        description="With name and defaultValue the field needs no signal: a hidden input submits the number, not the formatted text, and Reset restores the initial value."
        example="number-field/InForm"
        form
      />
      <Api
        rows={[
          [
            "NumberField",
            "id · name · form · required · disabled · readOnly · invalid",
            "Set on the root; the label, input, steppers, and messages read them. id is the input's id and is generated when omitted. name submits the number, such as 1234, through a hidden input, whatever the formatting.",
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
            "Control draws the bordered field. The input owns id, min, max, step, and its ARIA attributes; set those on the root.",
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
