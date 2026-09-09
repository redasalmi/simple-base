import { For } from "solid-js";
import { Badge, type BadgeVariant } from "@simple-base/solid";
import { Api, Example } from "./Preview";

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

export function Badges() {
  return (
    <>
      <Example
        title="All treatments"
        description="Nine variants in both sizes. The label describes the state, so color is never the only cue."
        code={
          '<Badge variant="success" size="small">Published</Badge>\n<Badge variant="outline">Optional</Badge>'
        }
      >
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
      </Example>
      <Example
        title="Supporting content"
        description="Keep badges beside the information they qualify. They are labels, not buttons, links, or filters."
        code={'<h3>Release notes</h3>\n<Badge variant="default">Draft</Badge>'}
      >
        <div class="preview-row">
          <h3 class="sb-heading-4">Release notes</h3>
          <Badge>Draft</Badge>
        </div>
      </Example>
      <Api
        rows={[
          [
            "variant",
            '"default" (default)',
            "default · success · danger · warning · info · accent · command · outline · muted",
          ],
          ["size", '"medium" (default)', "small (20px) · medium (24px) minimum height"],
          [
            "…props",
            "HTMLAttributes<HTMLSpanElement>",
            "Renders a span. Use a Button for interactive behavior and a keyboard shortcut style for actual key combinations.",
          ],
        ]}
      />
    </>
  );
}
