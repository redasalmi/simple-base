import { Button, Checkbox } from "@simple-base/solid";

export default function InForm() {
  return (
    <form class="preview-stack">
      <fieldset class="sb-fieldset preview-stack">
        <legend class="sb-heading-5">Notifications</legend>
        <label class="preview-choice">
          <Checkbox name="notify" value="email" defaultChecked />
          <span>Email updates</span>
        </label>
        <label class="preview-choice">
          <Checkbox name="notify" value="activity" />
          <span>Activity summary</span>
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
