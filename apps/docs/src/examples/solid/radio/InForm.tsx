import { Button, Radio } from "@simple-base/solid";

export default function InForm() {
  return (
    <form class="preview-stack">
      <fieldset class="sb-fieldset preview-stack">
        <legend class="sb-heading-5">Plan</legend>
        <label class="preview-choice">
          <Radio name="plan" value="starter" />
          <span>Starter</span>
        </label>
        <label class="preview-choice">
          <Radio name="plan" value="team" defaultChecked />
          <span>Team</span>
        </label>
      </fieldset>
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
