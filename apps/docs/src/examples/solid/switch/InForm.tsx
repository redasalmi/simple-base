import { Button, Switch } from "@simple-base/solid";

export default function InForm() {
  return (
    <form class="preview-stack">
      <label class="preview-choice">
        <Switch name="digest" defaultChecked />
        <span>Weekly digest</span>
      </label>
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
