import { Button, Fieldset, FieldsetLegend, RadioGroup, RadioGroupItem } from "@simple-base/solid";

export default function InForm() {
  return (
    <form class="preview-stack">
      <Fieldset>
        <FieldsetLegend>Currency</FieldsetLegend>
        <RadioGroup name="currency" defaultValue="eur">
          <RadioGroupItem value="eur">Euro</RadioGroupItem>
          <RadioGroupItem value="usd">US dollar</RadioGroupItem>
          <RadioGroupItem value="gbp" disabled>
            Pound sterling
          </RadioGroupItem>
        </RadioGroup>
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
