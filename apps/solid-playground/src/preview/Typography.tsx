import { Api, Example } from "./Preview";

export function Typography() {
  return (
    <>
      <Example
        title="Utility headings"
        description="Page and section titles use the Young Serif display face; smaller groups switch to the body face. Choose the HTML heading level for structure and the class for visual size."
        example="typography/Headings"
      />
      <Example
        title="Body & labels"
        description="Captions use sentence case and the body family. Save monospace for information that actually benefits from it."
        example="typography/Body"
      />
      <Example
        title="Display"
        description="The same serif at its largest, for landing moments and empty screens. It scales from 44 to 72px with a tight line height."
        example="typography/Display"
      />
      <Example
        title="Text roles"
        description="Semantic color roles follow the selected theme. Use danger and success for meaningful status, not emphasis alone."
        example="typography/TextRoles"
      />
      <Example
        title="Code & shortcuts"
        description="Inline code identifies a technical value. Blocks preserve formatting; keyboard shortcuts use a separate keycap treatment."
        example="typography/CodeAndShortcuts"
      />
      <Api
        rows={[
          [
            "Families",
            "body · display · code",
            "Atkinson Hyperlegible Next, Young Serif, and Atkinson Hyperlegible Mono, with system fallbacks. The package does not download web fonts; this playground loads them from Google Fonts.",
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
