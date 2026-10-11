import { Api, Example } from "./Preview";

export function Cards() {
  return (
    <>
      <Example
        title="Base card"
        description="A div with the sb-card surface: hairline border, large radius, a 1px baseline instead of a blurred shadow, and its own interior padding. Omit variant for this treatment."
        example="card/Base"
      />
      <Example
        title="Surfaces and variants"
        description="Base cards carry the border and surface. flat removes both for content that already sits on a surface, and rule keeps only a top border for stacked sections. Every card is padded by the stylesheet; there is no padding prop to set."
        example="card/Variants"
      />
      <Example
        title="Nested sections"
        description="A padded base card can hold rule sections. The outer border groups the surface while each rule separates one setting from the next, and the rule resets the interior padding to a top gap."
        example="card/NestedSections"
      />
      <Api
        rows={[
          [
            "variant",
            '"flat" | "rule" (optional)',
            'Omit variant for the base surface card. "flat" removes the border, surface, and shadow; "rule" keeps only a top border, no radius, and a top-only gap.',
          ],
          [
            "padding",
            "not a prop",
            "Every .sb-card is padded by the stylesheet and rule cards keep only their top gap. Override the .sb-card class from application CSS when a layout needs different spacing.",
          ],
          [
            "…props",
            "JSX.HTMLAttributes<HTMLDivElement>",
            "Renders a div and passes native attributes through. class merges with sb-card instead of replacing it.",
          ],
          [
            "Styles",
            "@simple-base/css/card",
            "Included in the main stylesheet. The .sb-card class and its flat and rule variants stay available for plain HTML.",
          ],
        ]}
      />
    </>
  );
}
