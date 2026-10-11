export default function BreadcrumbAndDisclosure() {
  return (
    <div class="preview-stack">
      <nav class="sb-breadcrumb" aria-label="Example breadcrumb">
        <a href="#buttons">Components</a>
        <span class="sb-breadcrumb-separator" aria-hidden="true">
          /
        </span>
        <span aria-current="page">CSS patterns</span>
      </nav>
      <details class="sb-disclosure">
        <summary>How do I load the styles?</summary>
        <p class="sb-disclosure-copy">
          Import <code>@simple-base/css</code> once in your app. Individual stylesheet subpaths are
          also available; load the token stylesheet first.
        </p>
      </details>
    </div>
  );
}
