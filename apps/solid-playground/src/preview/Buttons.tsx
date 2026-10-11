import { Api, Example } from "./Preview";

export function Buttons() {
  return (
    <>
      <Example
        title="Variants & sizes"
        description="Every variant at each supported size, alongside its disabled state. These demo buttons only update the message below."
        example="button/Variants"
      />
      <Example
        title="In context"
        description="Keep the primary action unmistakable. Use Tab to inspect focus; buttons stay in place on hover and scale down slightly when pressed."
        example="button/InContext"
      />
      <Api
        rows={[
          [
            "variant",
            '"primary" (default)',
            "primary · secondary · tertiary · ghost · danger · danger-subtle",
          ],
          [
            "size",
            '"medium" (default)',
            "small (34px) · medium (42px) · large (50px) minimum height",
          ],
          [
            "disabled",
            "boolean",
            "Native disabled behavior: unavailable to pointer and keyboard activation.",
          ],
          [
            "…props",
            "ButtonHTMLAttributes",
            'Native events, type, form attributes, and class pass through. Set type="button" for non-submit actions inside forms.',
          ],
        ]}
      />
    </>
  );
}
