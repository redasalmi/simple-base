import {
  StatusLine,
  StatusLineContent,
  StatusLineDescription,
  StatusLineDot,
  StatusLineTitle,
  type StatusValue,
} from "@simple-base/solid";
import { For } from "solid-js";

const lines: [StatusValue, string, string][] = [
  ["success", "Changes saved", "Your preferences are up to date."],
  ["warning", "Payment overdue", "INV-0042 was due 12 days ago."],
  ["danger", "Could not save", "Check your connection and try again."],
  ["info", "Read-only workspace", "Ask an owner for editing access."],
];

export default function Statuses() {
  return (
    <div class="preview-stack">
      <For each={lines}>
        {([status, title, copy]) => (
          <StatusLine status={status}>
            <StatusLineDot />
            <StatusLineContent>
              <StatusLineTitle>{title}</StatusLineTitle>
              <StatusLineDescription>{copy}</StatusLineDescription>
            </StatusLineContent>
          </StatusLine>
        )}
      </For>
    </div>
  );
}
