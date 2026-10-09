import { For, createSignal } from "solid-js";
import {
  Pagination,
  PaginationNext,
  PaginationPages,
  PaginationPrevious,
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableRowHeader,
  TableWrap,
} from "@simple-base/solid";
import { Api, Example } from "./Preview";

const pageSize = 3;
const invoices = Array.from({ length: 14 }, (_, index) => ({
  id: `INV-${String(index + 1).padStart(4, "0")}`,
  client: ["Harbour & Co", "Northwind", "Atlas Studio", "Fern Labs"][index % 4]!,
  amount: 120 + ((index * 37) % 9) * 45,
}));

export function Paginations() {
  const [page, setPage] = createSignal(1);
  const pageCount = Math.ceil(invoices.length / pageSize);
  const visibleInvoices = () => invoices.slice((page() - 1) * pageSize, page() * pageSize);

  return (
    <>
      <Example
        title="Paged table"
        description="page and onPageChange keep the current page in your state; slicing the rows stays in your app. Previous and Next stay focusable at either end and announce themselves as unavailable."
        code={
          'const [page, setPage] = createSignal(1);\n\n<Pagination aria-label="Invoice pages" count={5} page={page()} onPageChange={setPage}>\n  <PaginationPrevious>‹</PaginationPrevious>\n  <PaginationPages />\n  <PaginationNext>›</PaginationNext>\n</Pagination>'
        }
      >
        <div class="preview-stack">
          <TableWrap role="region" aria-label="Invoices" tabIndex={0}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableColumnHeader>Invoice</TableColumnHeader>
                  <TableColumnHeader>Client</TableColumnHeader>
                  <TableColumnHeader>Amount</TableColumnHeader>
                </TableRow>
              </TableHeader>
              <TableBody>
                <For each={visibleInvoices()}>
                  {(invoice) => (
                    <TableRow>
                      <TableRowHeader>{invoice.id}</TableRowHeader>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell variant="number">€{invoice.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  )}
                </For>
              </TableBody>
            </Table>
          </TableWrap>
          <Pagination
            aria-label="Invoice pages"
            count={pageCount}
            page={page()}
            onPageChange={setPage}
          >
            <PaginationPrevious>‹</PaginationPrevious>
            <PaginationPages />
            <PaginationNext>›</PaginationNext>
          </Pagination>
        </div>
      </Example>
      <Example
        title="Many pages"
        description="Past seven pages, the first and last pages stay in place and ellipses stand in for the rest. siblingCount sets how many pages show on each side of the current one."
        code={
          "<Pagination count={40} defaultPage={12}>…</Pagination>\n<Pagination count={40} defaultPage={12} siblingCount={0}>…</Pagination>"
        }
      >
        <div class="preview-stack">
          <Pagination aria-label="Example pages" count={40} defaultPage={12}>
            <PaginationPrevious>‹</PaginationPrevious>
            <PaginationPages />
            <PaginationNext>›</PaginationNext>
          </Pagination>
          <Pagination
            aria-label="Compact example pages"
            count={40}
            defaultPage={12}
            siblingCount={0}
          >
            <PaginationPrevious>‹</PaginationPrevious>
            <PaginationPages />
            <PaginationNext>›</PaginationNext>
          </Pagination>
        </div>
      </Example>
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
            'Labeled "Pagination" by default; pass aria-label to name it after what it pages, especially with more than one on a page.',
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
