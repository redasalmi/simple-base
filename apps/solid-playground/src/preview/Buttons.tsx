import { For, createSignal } from "solid-js";
import { Button, type ButtonSize, type ButtonVariant } from "@simple-base/solid";
import { Api, Example } from "./Preview";

const variants = [
  ["primary", "Primary", "The main action in a view. Use sparingly."],
  ["secondary", "Secondary", "An alternative action with a visible boundary."],
  ["tertiary", "Tertiary", "A lower-emphasis action on a quiet surface."],
  ["ghost", "Ghost", "A supporting action without a resting container."],
  ["danger", "Danger", "An explicit destructive action."],
  ["danger-subtle", "Danger subtle", "A destructive option before final confirmation."],
] as const satisfies readonly (readonly [ButtonVariant, string, string])[];
const sizes: ButtonSize[] = ["small", "medium", "large"];

export function Buttons() {
  const [lastAction, setLastAction] = createSignal(
    "Try a button. Its variant and size will appear here.",
  );
  return (
    <>
      <Example
        title="Variants & sizes"
        description="Every variant at each supported size, alongside its disabled state. These demo buttons only update the message below."
        code={
          '<Button variant="primary" size="medium" onClick={save}>\n  Save changes\n</Button>\n<Button variant="secondary" disabled>Unavailable</Button>'
        }
      >
        <For each={variants}>
          {([variant, label, description]) => (
            <div class="preview-variant">
              <h3>{label}</h3>
              <p>{description}</p>
              <div class="preview-button-row">
                <For each={sizes}>
                  {(size) => (
                    <div class="preview-sample">
                      <span>{size}</span>
                      <Button
                        variant={variant}
                        size={size}
                        onClick={() => setLastAction(`${label} · ${size} activated.`)}
                      >
                        {label}
                      </Button>
                    </div>
                  )}
                </For>
                <div class="preview-sample">
                  <span>disabled</span>
                  <Button variant={variant} disabled>
                    {label}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </For>
      </Example>
      <p class="preview-status" role="status">
        {lastAction()}
      </p>
      <Example
        title="In context"
        description="Keep the primary action unmistakable. Use Tab to inspect focus; buttons stay in place on hover and press."
        code={
          '<div>\n  <Button variant="secondary" onClick={cancel}>Cancel</Button>\n  <Button onClick={save}>Save changes</Button>\n</div>'
        }
      >
        <div class="preview-row">
          <Button variant="secondary" onClick={() => setLastAction("Demo changes discarded.")}>
            Cancel
          </Button>
          <Button onClick={() => setLastAction("Demo changes saved.")}>Save changes</Button>
        </div>
      </Example>
      <Api
        rows={[
          [
            "variant",
            '"primary" (default)',
            "primary · secondary · tertiary · ghost · danger · danger-subtle",
          ],
          [
            "size",
            '"medium" (default)',
            "small (34px) · medium (40px) · large (52px) minimum height",
          ],
          [
            "disabled",
            "boolean",
            "Native disabled behavior: unavailable to pointer and keyboard activation.",
          ],
          [
            "…props",
            "ButtonHTMLAttributes",
            'Native events, type, form attributes, and class pass through. Set type="button" for non-submit actions inside forms.',
          ],
        ]}
      />
    </>
  );
}
