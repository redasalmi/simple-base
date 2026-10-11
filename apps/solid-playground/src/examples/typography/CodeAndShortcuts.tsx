export default function CodeAndShortcuts() {
  return (
    <div class="preview-stack">
      <p class="sb-text-body">
        Use <code class="sb-code-text">variant="primary"</code> for the main action.
      </p>
      <pre class="sb-code-block">
        <code>{'import "@simple-base/css";\nimport { Button } from "@simple-base/solid";'}</code>
      </pre>
      <p class="preview-row">
        <span>Example shortcut</span>
        <kbd class="sb-shortcut">Ctrl</kbd>
        <kbd class="sb-shortcut">K</kbd>
      </p>
      <p class="preview-note">The keycaps are a visual specimen; no shortcut is registered.</p>
    </div>
  );
}
