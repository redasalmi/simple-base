import { For } from "solid-js";

const headings = [
  ["sb-heading-1", "36px serif", "Workspace settings"],
  ["sb-heading-2", "28px serif", "Account preferences"],
  ["sb-heading-3", "24px serif", "Notification delivery"],
  ["sb-heading-4", "20px", "Email summary"],
  ["sb-heading-5", "18px", "Delivery schedule"],
  ["sb-heading-6", "16px", "Time zone"],
] as const;

export default function Headings() {
  return (
    <div class="preview-stack">
      <For each={headings}>
        {([style, size, text]) => (
          <div class="preview-type-row">
            <code>
              {style}
              <br />
              {size}
            </code>
            <p class={style}>{text}</p>
          </div>
        )}
      </For>
    </div>
  );
}
