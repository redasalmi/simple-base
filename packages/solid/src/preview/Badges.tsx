import { For } from "solid-js";
import { Badge, type BadgeSize, type BadgeVariant } from "../components/Badge";

const variants: BadgeVariant[] = ["default", "command", "success", "danger", "outline", "muted"];
const sizes: BadgeSize[] = ["small", "medium"];

function formatLabel(value: string) {
  return value.replaceAll("-", " ");
}

export function Badges() {
  return (
    <section class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <p class="sb-text-caption">Components</p>
        <h1 class="sb-heading-1">Badges</h1>
        <p class="sb-text-body">
          Badge variants use the <code class="sb-code-text">.sb-badge</code> class with
          <code class="sb-code-text"> data-variant</code> and
          <code class="sb-code-text"> data-size</code> attributes.
        </p>
      </div>

      <div class="flex flex-col gap-6 rounded-xl bg-(--sb-card-bg) p-6 shadow-(--sb-card-shadow) ring-1 ring-(--sb-card-border)">
        <For each={sizes}>
          {(size) => (
            <div class="flex flex-col gap-3">
              <h2 class="sb-heading-6">{formatLabel(size)}</h2>
              <div class="flex flex-wrap gap-3">
                <For each={variants}>
                  {(variant) => (
                    <Badge variant={variant} size={size}>
                      {formatLabel(variant)}
                    </Badge>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
  );
}
