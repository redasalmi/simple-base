import {
  Button,
  CheckboxGroup,
  CheckboxGroupItem,
  Fieldset,
  FieldsetLegend,
} from "@simple-base/solid";

export default function InForm() {
  return (
    <form class="preview-stack">
      <Fieldset>
        <FieldsetLegend>Include in summary</FieldsetLegend>
        <CheckboxGroup name="include" defaultValue={["invoices"]}>
          <CheckboxGroupItem value="invoices">Invoices</CheckboxGroupItem>
          <CheckboxGroupItem value="payments">Payments</CheckboxGroupItem>
          <CheckboxGroupItem value="notes">Client notes</CheckboxGroupItem>
        </CheckboxGroup>
      </Fieldset>
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
