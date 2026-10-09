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
  /** Accessible names of the navigation and its buttons, for example to translate them. Each one defaults to `paginationLabels`. */
  labels?: Partial<PaginationLabels>;
};

export type PaginationLabels = {
  root: string;
  previous: string;
  next: string;
  page: (page: number) => string;
};

export const paginationDefaults = {
  defaultPage: 1,
  siblingCount: 1,
} as const satisfies Required<Pick<PaginationOptions, "defaultPage" | "siblingCount">>;

/** Accessible names used when the caller doesn't pass its own. */
export const paginationLabels = {
  root: "Pagination",
  previous: "Previous page",
  next: "Next page",
  page: (page: number) => `Page ${page}`,
} as const satisfies PaginationLabels;
