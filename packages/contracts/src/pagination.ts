export type PaginationOptions = {
  /** Total number of pages. */
  count: number;
  /** Controlled current page, starting at 1; omit for uncontrolled state. */
  page?: number;
  /** Initial page for uncontrolled state. */
  defaultPage?: number;
  /** Pages shown on each side of the current page before an ellipsis. */
  siblingCount?: number;
  /** Called with the page the user picked. */
  onPageChange?: (page: number) => void;
};

export const paginationDefaults = {
  defaultPage: 1,
  siblingCount: 1,
} as const satisfies Required<Pick<PaginationOptions, "defaultPage" | "siblingCount">>;
