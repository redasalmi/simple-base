import { For } from "solid-js";

const bodyStyles = [
  ["sb-text-body-lg", "A little more room for an introduction."],
  ["sb-text-body", "The default reading style for interface descriptions and supporting content."],
  ["sb-text-body-sm", "Smaller supporting text for a compact interface."],
  ["sb-text-caption", "Caption text adds context without competing with the content."],
  ["sb-text-label", "A visible label for a field or control"],
] as const;

export default function Body() {
  return (
    <div class="preview-stack">
      <For each={bodyStyles}>
        {([style, text]) => (
          <div class="preview-type-row">
            <code>{style}</code>
            <p class={style}>{text}</p>
          </div>
        )}
      </For>
    </div>
  );
}
