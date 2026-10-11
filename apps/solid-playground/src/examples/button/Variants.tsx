import { Button, type ButtonSize, type ButtonVariant } from "@simple-base/solid";
import { createSignal, For } from "solid-js";

const variants = [
  ["primary", "Primary", "The main action in a view. Use sparingly."],
  ["secondary", "Secondary", "An alternative action with a visible boundary."],
  ["tertiary", "Tertiary", "A softer accent action for secondary emphasis."],
  ["ghost", "Ghost", "A supporting action without a resting container."],
  ["danger", "Danger", "An explicit destructive action."],
  ["danger-subtle", "Danger subtle", "A soft destructive option before final confirmation."],
] as const satisfies readonly (readonly [ButtonVariant, string, string])[];
const sizes: ButtonSize[] = ["small", "medium", "large"];

export default function Variants() {
  const [lastAction, setLastAction] = createSignal(
    "Try a button. Its variant and size will appear here.",
  );

  return (
    <div class="preview-stack">
      <div>
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
      </div>
      <p class="preview-status" role="status">
        {lastAction()}
      </p>
    </div>
  );
}
