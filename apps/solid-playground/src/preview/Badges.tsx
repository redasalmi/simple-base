import { Api, Example } from "./Preview";

export function Badges() {
  return (
    <>
      <Example
        title="All treatments"
        description="Nine variants in both sizes. The label describes the state and success, danger, warning, and info add a glyph, so color is never the only cue."
        example="badge/Variants"
      />
      <Example
        title="Supporting content"
        description="Keep badges beside the information they qualify. They are labels, not buttons, links, or filters."
        example="badge/SupportingContent"
      />
      <Api
        rows={[
          [
            "variant",
            '"default" (default)',
            "default · success · danger · warning · info · accent · command · outline · muted",
          ],
          ["size", '"medium" (default)', "small (20px) · medium (24px) minimum height"],
          [
            "…props",
            "HTMLAttributes<HTMLSpanElement>",
            "Renders a span. Use a Button for interactive behavior and a keyboard shortcut style for actual key combinations.",
          ],
        ]}
      />
    </>
  );
}
