import { Kbd } from "@simple-base/solid";

export default function Shortcuts() {
  return (
    <div class="preview-stack">
      <p class="sb-text-body">
        Press <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> to search, or <Kbd>Esc</Kbd> to close the panel.
      </p>
      <p class="preview-note">The keycaps are a visual specimen; no shortcut is registered.</p>
    </div>
  );
}
