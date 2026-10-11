import {
  Field,
  FieldInput,
  FieldLabel,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "@simple-base/solid";

export default function Grouped() {
  return (
    <Fieldset>
      <FieldsetLegend>Billing address</FieldsetLegend>
      <FieldsetDescription>Printed on every invoice.</FieldsetDescription>
      <div class="preview-fields" style={{ "margin-top": "16px" }}>
        <Field>
          <FieldLabel>Street</FieldLabel>
          <FieldInput name="street" defaultValue="12 Harbour Road" />
        </Field>
        <Field>
          <FieldLabel>City</FieldLabel>
          <FieldInput name="city" defaultValue="Lisbon" />
        </Field>
      </div>
    </Fieldset>
  );
}
