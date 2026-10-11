import { Switch } from "@simple-base/solid";

export default function Disabled() {
  return (
    <div class="preview-stack">
      <label class="preview-choice">
        <Switch disabled />
        <span>Unavailable setting</span>
      </label>
      <label class="preview-choice">
        <Switch defaultChecked disabled />
        <span>Required setting</span>
      </label>
    </div>
  );
}
