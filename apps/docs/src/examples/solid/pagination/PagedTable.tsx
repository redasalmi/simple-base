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
import { createSignal, For } from "solid-js";

const pageSize = 3;
const invoices = Array.from({ length: 14 }, (_, index) => ({
  id: `INV-${String(index + 1).padStart(4, "0")}`,
  client: ["Harbour & Co", "Northwind", "Atlas Studio", "Fern Labs"][index % 4]!,
  amount: 120 + ((index * 37) % 9) * 45,
}));

export default function PagedTable() {
  const [page, setPage] = createSignal(1);
  const pageCount = Math.ceil(invoices.length / pageSize);
  const visibleInvoices = () => invoices.slice((page() - 1) * pageSize, page() * pageSize);

  return (
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
      <Pagination aria-label="Invoice pages" count={pageCount} page={page()} onPageChange={setPage}>
        <PaginationPrevious>‹</PaginationPrevious>
        <PaginationPages />
        <PaginationNext>›</PaginationNext>
      </Pagination>
    </div>
  );
}
