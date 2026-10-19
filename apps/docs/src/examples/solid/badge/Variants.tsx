import { Badge, type BadgeVariant } from "@simple-base/solid";
import { For } from "solid-js";

const variants = [
  ["default", "Default", "Draft"],
  ["success", "Success", "Published"],
  ["danger", "Danger", "Failed"],
  ["warning", "Warning", "Pending"],
  ["info", "Info", "In review"],
  ["accent", "Accent", "Featured"],
  ["command", "Command", "Command"],
  ["outline", "Outline", "Optional"],
  ["muted", "Muted", "Archived"],
] as const satisfies readonly (readonly [BadgeVariant, string, string])[];

export default function Variants() {
  return (
    <div class="preview-stack">
      <div class="preview-badge-row preview-note">
        <span>Variant</span>
        <span>Small</span>
        <span>Medium</span>
      </div>
      <For each={variants}>
        {([variant, name, label]) => (
          <div class="preview-badge-row">
            <span>{name}</span>
            <Badge variant={variant} size="small">
              {label}
            </Badge>
            <Badge variant={variant}>{label}</Badge>
          </div>
        )}
      </For>
    </div>
  );
}
