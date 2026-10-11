import { For } from "solid-js";

const colors = ["primary", "secondary", "muted", "accent", "danger", "success"] as const;

export default function TextRoles() {
  return (
    <div class="preview-stack">
      <For each={colors}>
        {(color) => (
          <p class={`sb-text-${color}`}>{color[0].toUpperCase() + color.slice(1)} text color</p>
        )}
      </For>
    </div>
  );
}
