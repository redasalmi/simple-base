import { Api, Example } from "./Preview";

export function Tables() {
  return (
    <>
      <Example
        title="Documents table"
        description="Named parts map to native table elements: Table renders the table, TableWrap keeps it from overflowing, and TableHeader, TableBody, TableRow, TableColumnHeader, and TableCell describe the structure. TableCell accepts code and number variants, and a selected row is highlighted through aria-selected."
        example="table/Documents"
      />
      <Example
        title="Row headers and scrolling"
        description="The stylesheet gives the table a minimum width, so a wide table scrolls inside TableWrap. Give the wrapper role=region, tabIndex=0, and an accessible name so keyboard users can reach the scroll area. RowHeader defaults to scope=row and ColumnHeader to scope=col."
        example="table/RowHeaders"
      />
      <Example
        title="Sortable columns"
        description="TableSortButton fills a column header with a button and a direction indicator. Set aria-sort on the sorted header only; the indicator follows it. Sorting the rows stays in your app."
        example="table/Sortable"
      />
      <Api
        rows={[
          [
            "Table",
            "id, class, native table props",
            "Renders the native table with the sb-table class. Accepts every table attribute, including aria-label and aria-describedby.",
          ],
          [
            "TableWrap",
            "role, tabIndex, class",
            "Optional scroll container with the sb-table-wrap class. Set role=region, an accessible name, and tabIndex=0 when the table can overflow so keyboard users can scroll it.",
          ],
          [
            "TableCaption",
            "caption text",
            "Renders the table caption. Add sb-text-caption for the muted caption type style.",
          ],
          [
            "TableHeader / TableBody / TableFooter",
            "thead / tbody / tfoot",
            "Section parts that map to native elements. They add no class of their own; the stylesheet targets them through Root.",
          ],
          [
            "TableRow",
            "tr attributes",
            "Accepts aria-selected, which the stylesheet uses to highlight a selected row. Cells align to the middle of the row.",
          ],
          [
            "TableColumnHeader / TableRowHeader",
            "th attributes",
            "Column headers default to scope=col and row headers to scope=row; pass scope to override. Both accept colspan, rowspan, abbr, and other th attributes.",
          ],
          [
            "TableCell",
            "td attributes + variant",
            "Body cells. variant=code and variant=number set data-variant, which the stylesheet styles as a code or right-aligned numeric cell.",
          ],
          [
            "TableSortButton",
            "button + indicator",
            "Place it as the only child of a TableColumnHeader. It renders a type=button with a decorative direction indicator driven by aria-sort on the header: ascending, descending, or omitted for an unsorted column. Handle onClick to sort the rows.",
          ],
          [
            "Styles",
            "@simple-base/css/table",
            "Included in the main stylesheet. The native .sb-table pattern remains available for plain HTML; the component reuses the same classes.",
          ],
        ]}
      />
    </>
  );
}
