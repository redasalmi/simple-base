export function Typography() {
  return (
    <section class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <p class="sb-text-caption">Typography</p>
        <h1 class="sb-display">Build in the dark. Ship with precision.</h1>
        <p class="sb-text-body-lg">
          Simple Base typography combines compact product UI rhythm with sharp display scale.
        </p>
      </div>

      <div class="flex flex-col gap-4">
        <h1 class="sb-heading-1">Heading 1 — Command-center interface</h1>
        <h2 class="sb-heading-2">Heading 2 — Component architecture</h2>
        <h3 class="sb-heading-3">Heading 3 — Semantic token layer</h3>
        <h4 class="sb-heading-4">Heading 4 — Interactive state model</h4>
        <h5 class="sb-heading-5">Heading 5 — Compact control group</h5>
        <h6 class="sb-heading-6">Heading 6 — Metadata label</h6>
      </div>

      <div class="flex flex-col gap-3">
        <p class="sb-text-body-lg">
          Body large is useful for hero descriptions, onboarding copy, and high-emphasis explanatory
          text that needs more presence than normal body copy.
        </p>
        <p class="sb-text-body">
          Body text is the default reading style for dense product interfaces, documentation,
          settings panels, forms, and supporting descriptions.
        </p>
        <p class="sb-text-body-sm">
          Body small supports helper text, secondary metadata, inline descriptions, and compact UI
          labels in data-heavy screens.
        </p>
        <p class="sb-text-caption">Caption text / uppercase metadata</p>
        <p class="sb-text-label">Label text for fields and control groups</p>
      </div>

      <div class="flex flex-col gap-3">
        <p class="sb-text-primary">Primary text color</p>
        <p class="sb-text-secondary">Secondary text color</p>
        <p class="sb-text-muted">Muted text color</p>
        <p class="sb-text-accent">Accent text color</p>
        <p class="sb-text-danger">Danger text color</p>
        <p class="sb-text-success">Success text color</p>
      </div>

      <div class="flex flex-col gap-3">
        <p class="sb-text-body">
          Inline code uses <code class="sb-code-text">.sb-code-text</code> for small snippets.
        </p>
        <pre class="sb-code-block">
          <code>{`import { Button } from "@simple-base/solid";

<Button variant="primary" size="medium">
  Create workspace
</Button>`}</code>
        </pre>
      </div>
    </section>
  );
}
