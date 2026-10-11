import { Checkbox } from "@simple-base/solid";

export default function Disabled() {
  return (
    <div class="preview-stack">
      <label class="preview-choice">
        <Checkbox disabled />
        <span>Unavailable option</span>
      </label>
      <label class="preview-choice">
        <Checkbox defaultChecked disabled />
        <span>Required by your team</span>
      </label>
    </div>
  );
}
