import {
  Pagination,
  PaginationNext,
  PaginationPages,
  PaginationPrevious,
} from "@simple-base/solid";

export default function ManyPages() {
  return (
    <div class="preview-stack">
      <Pagination aria-label="Example pages" count={40} defaultPage={12}>
        <PaginationPrevious>‹</PaginationPrevious>
        <PaginationPages />
        <PaginationNext>›</PaginationNext>
      </Pagination>
      <Pagination aria-label="Compact example pages" count={40} defaultPage={12} siblingCount={0}>
        <PaginationPrevious>‹</PaginationPrevious>
        <PaginationPages />
        <PaginationNext>›</PaginationNext>
      </Pagination>
    </div>
  );
}
