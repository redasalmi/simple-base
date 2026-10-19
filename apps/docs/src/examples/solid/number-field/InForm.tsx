import {
  Button,
  NumberField,
  NumberFieldControl,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from "@simple-base/solid";

export default function InForm() {
  return (
    <form class="preview-stack">
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
