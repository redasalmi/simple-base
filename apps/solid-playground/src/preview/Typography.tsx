import { For } from "solid-js";
import { Api, Example } from "./Preview";

const headings = [
  ["sb-heading-1", "32px", "Workspace settings"],
  ["sb-heading-2", "24px", "Account preferences"],
  ["sb-heading-3", "20px", "Notification delivery"],
  ["sb-heading-4", "18px", "Email summary"],
  ["sb-heading-5", "16px", "Delivery schedule"],
  ["sb-heading-6", "14px", "Time zone"],
] as const;
const bodyStyles = [
  ["sb-text-body-lg", "A little more room for an introduction."],
  ["sb-text-body", "The default reading style for interface descriptions and supporting content."],
  ["sb-text-body-sm", "Smaller supporting text for a compact interface."],
  ["sb-text-caption", "Caption text adds context without competing with the content."],
  ["sb-text-label", "A visible label for a field or control"],
] as const;
const colors = ["primary", "secondary", "muted", "accent", "danger", "success"] as const;

export function Typography() {
  return (
    <>
      <Example
        title="Utility headings"
        description="A measured sans-serif scale, from page titles to compact groups. Choose the HTML heading level for structure and the class for visual size."
        code={
          '<h1 class="sb-heading-1">Workspace settings</h1>\n<h2 class="sb-heading-3">Notification delivery</h2>'
        }
      >
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
      </Example>
      <Example
        title="Body & labels"
        description="Captions use sentence case and the body family. Save monospace for information that actually benefits from it."
        code={
          '<p class="sb-text-body">Supporting content.</p>\n<p class="sb-text-caption">Additional context.</p>\n<label class="sb-text-label">Workspace name</label>'
        }
      >
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
      </Example>
      <Example
        title="Display"
        description="An optional expressive serif, not the default for product headings. It scales from 40 to 72px and keeps a relaxed line height."
        code={'<h1 class="sb-display">Type with purpose.</h1>'}
      >
        <p class="sb-display">Type with purpose.</p>
      </Example>
      <Example
        title="Text roles"
        description="Semantic color roles follow the selected theme. Use danger and success for meaningful status, not emphasis alone."
        code={
          '<p class="sb-text-secondary">Supporting information</p>\n<p class="sb-text-danger">A descriptive error message</p>'
        }
      >
        <div class="preview-stack">
          <For each={colors}>
            {(color) => (
              <p class={`sb-text-${color}`}>{color[0].toUpperCase() + color.slice(1)} text color</p>
            )}
          </For>
        </div>
      </Example>
      <Example
        title="Code & shortcuts"
        description="Inline code identifies a technical value. Blocks preserve formatting; keyboard shortcuts use a separate keycap treatment."
        code={
          '<code class="sb-code-text">variant="primary"</code>\n<kbd class="sb-shortcut">⌘</kbd> <kbd class="sb-shortcut">K</kbd>'
        }
      >
        <div class="preview-stack">
          <p class="sb-text-body">
            Use <code class="sb-code-text">variant="primary"</code> for the main action.
          </p>
          <pre class="sb-code-block">
            <code>
              {'import "@simple-base/css";\nimport { Button } from "@simple-base/solid";'}
            </code>
          </pre>
          <p class="preview-row">
            <span>Example shortcut</span>
            <kbd class="sb-shortcut">Ctrl</kbd>
            <kbd class="sb-shortcut">K</kbd>
          </p>
          <p class="preview-note">The keycaps are a visual specimen; no shortcut is registered.</p>
        </div>
      </Example>
      <Api
        rows={[
          [
            "Families",
            "body · display · code",
            "System fallbacks are included. The package does not download web fonts.",
          ],
          [
            "Themes",
            "9 selectable palettes",
            "Use the header selector to compare the same content. Set data-theme on the root or on a themed region.",
          ],
          [
            "Imports",
            '"@simple-base/css"',
            "Loads tokens and all component styles. For selective imports, load @simple-base/tokens/css once, then the required CSS subpaths.",
          ],
        ]}
      />
    </>
  );
}
