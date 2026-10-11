import { Api, Example } from "./Preview";

export function Styles() {
  return (
    <>
      <Example
        title="Progress & range"
        description="A native range input drives the progress specimen. Values are local, not a running upload or a fabricated metric."
        example="styles/ProgressAndRange"
      />
      <Example
        title="Native select"
        description="A native select with a CSS wrapper for the arrow. The field and help classes are available independently."
        example="styles/NativeSelect"
      />
      <Example
        title="Segmented control"
        description="A compact choice of view. This example changes only the selected state and its accompanying label."
        example="styles/SegmentedControl"
      />
      <Example
        title="Breadcrumb & disclosure"
        description="Breadcrumb links lead to real sections of this reference. The disclosure uses native details and summary behavior."
        example="styles/BreadcrumbAndDisclosure"
      />
      <Example
        title="Command popover"
        description="The menu classes provide appearance, not an ARIA menu widget. This native disclosure contains ordinary buttons; use Tab to move between commands and Escape to close."
        example="styles/CommandPopover"
      />
      <Api
        rows={[
          [
            "CSS contract",
            "class + data attributes",
            "These are HTML styling patterns. Behavior and accessible semantics belong to the consuming app.",
          ],
          [
            "Individual imports",
            '"@simple-base/css/card", "@simple-base/css/table", …',
            "Subpaths match stylesheet names. Always import @simple-base/tokens/css before individual stylesheets.",
          ],
          [
            "Aliases",
            "segmented-control / segmented · empty-state-mark / empty-mark",
            "Root and part classes with a shorter alternative name. Variants and state always use data or ARIA attributes, never modifier classes.",
          ],
          [
            "Keyboard shortcuts",
            'class="sb-shortcut"',
            "See Typography for the keycap and code specimens.",
          ],
        ]}
      />
    </>
  );
}
