import { Api, Example } from "./Preview";

export function EmptyStates() {
  return (
    <>
      <Example
        title="With actions"
        description="Explain what is missing and offer a relevant next action. Adding a record here only changes this local specimen."
        example="empty-state/WithActions"
      />
      <Example
        title="Inside a card"
        description="Every part is optional. A filter with no matches needs only a title and a hint, at the heading level of the surrounding section."
        example="empty-state/InsideCard"
      />
      <Api
        rows={[
          [
            "EmptyStateTitle level",
            "1 | 2 | 3 | 4 | 5 | 6 (default 2)",
            "Sets the heading element. Pick the level that follows the surrounding headings; the styling does not change.",
          ],
          [
            "EmptyStateMark",
            "span, aria-hidden",
            "A decorative glyph or icon tile. It is hidden from assistive technology, so the title carries the meaning.",
          ],
          [
            "Parts",
            "div · span · h2 · p · div",
            "EmptyState, EmptyStateMark, EmptyStateTitle, EmptyStateDescription, and EmptyStateActions pass native attributes through. class merges with the part's class.",
          ],
          [
            "Styles",
            "@simple-base/css/empty-state",
            "Included in the main stylesheet. The .sb-empty-state classes stay available for plain HTML.",
          ],
        ]}
      />
    </>
  );
}
