import { Card } from "@simple-base/solid";
import { For } from "solid-js";

const treatments = [
  [undefined, "Base", "Surface, border, and radius. The default grouping treatment."],
  ["flat", "Flat", "No border or surface. Groups content already inside a surface."],
  ["rule", "Rule", "A single top border and no radius. Separates stacked sections."],
] as const;

export default function Variants() {
  return (
    <div class="preview-card-grid">
      <For each={treatments}>
        {([variant, name, note]) => (
          <Card variant={variant}>
            <h3 class="sb-heading-4">{name}</h3>
            <p class="sb-text-body preview-note">{note}</p>
          </Card>
        )}
      </For>
    </div>
  );
}
