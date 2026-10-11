import { Api, Example } from "./Preview";

export function Paginations() {
  return (
    <>
      <Example
        title="Paged table"
        description="page and onPageChange keep the current page in your state; slicing the rows stays in your app. Previous and Next stay focusable at either end and announce themselves as unavailable."
        example="pagination/PagedTable"
      />
      <Example
        title="Many pages"
        description="Past seven pages, the first and last pages stay in place and ellipses stand in for the rest. siblingCount sets how many pages show on each side of the current one."
        example="pagination/ManyPages"
      />
      <Api
        rows={[
          ["count", "number", "Total number of pages."],
          [
            "page / defaultPage / onPageChange",
            "number (default 1)",
            "page is controlled and clamped to 1–count. defaultPage sets the initial page for uncontrolled use. onPageChange receives the page the user picked.",
          ],
          [
            "siblingCount",
            "number (default 1)",
            "Pages shown on each side of the current page before an ellipsis. The list keeps the same length as the page changes.",
          ],
          [
            "Pagination",
            "nav",
            'Labeled "Pagination" by default; pass aria-label to name it after what it pages, especially with more than one on a page. labels sets every accessible name in one place, for example to translate them.',
          ],
          [
            "PaginationPages",
            "buttons + ellipses",
            'Renders the page buttons, named "Page N" (override with getPageLabel), with aria-current=page on the current one. Ellipses are hidden from assistive technology.',
          ],
          [
            "PaginationPrevious / PaginationNext",
            "button",
            "Pass the icon or text as children; they are named Previous page and Next page unless you pass aria-label. At either end they set aria-disabled instead of disabled, so focus stays on them.",
          ],
          [
            "Styles",
            "@simple-base/css/pagination",
            "Included in the main stylesheet. The .sb-pagination classes stay available for plain HTML.",
          ],
        ]}
      />
    </>
  );
}
