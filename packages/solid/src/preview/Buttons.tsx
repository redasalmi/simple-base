import { For } from "solid-js";
import { Button, type ButtonSize, type ButtonVariant } from "../components/Button";

const variants: ButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "danger",
  "danger-subtle",
];
const sizes: ButtonSize[] = ["small", "medium", "large"];

function formatLabel(value: string) {
  return value.replaceAll("-", " ");
}

export function Buttons() {
  return (
    <section class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <p class="sb-text-caption">Components</p>
        <h1 class="sb-heading-1">Buttons</h1>
        <p class="sb-text-body">
          Button variants use generated component tokens from{" "}
          <code class="sb-code-text">@simple-base/css</code>.
        </p>
      </div>

      <div class="flex flex-col gap-6 rounded-xl bg-(--sb-card-bg) p-6 shadow-(--sb-card-shadow) ring-1 ring-(--sb-card-border)">
        <For each={sizes}>
          {(size) => (
            <div class="flex flex-col gap-3">
              <h2 class="sb-heading-6">{formatLabel(size)}</h2>
              <div class="grid grid-cols-3 gap-4">
                <For each={variants}>
                  {(variant) => (
                    <Button variant={variant} size={size}>
                      {formatLabel(variant)}
                    </Button>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>

      <div class="flex flex-col gap-3 rounded-xl bg-(--sb-card-bg) p-6 shadow-(--sb-card-shadow) ring-1 ring-(--sb-card-border)">
        <h2 class="sb-heading-6">Disabled</h2>
        <div class="grid grid-cols-3 gap-4">
          <For each={variants}>
            {(variant) => (
              <Button variant={variant} disabled>
                {formatLabel(variant)} disabled
              </Button>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
