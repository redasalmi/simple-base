import {
  paginationDefaults,
  type PaginationLabels,
  paginationLabels,
  type PaginationOptions,
} from "@simple-base/contracts";
import { type Accessor, For, type JSX, splitProps } from "solid-js";

import { cn } from "../cn";
import { createRequiredContext } from "../internal/context";
import { createControllableSignal } from "../internal/controllable";
import { composeHandler } from "../internal/props";

type PaginationContextType = {
  page: Accessor<number>;
  count: Accessor<number>;
  siblingCount: Accessor<number>;
  labels: Accessor<PaginationLabels>;
  setPage: (page: number) => void;
};

const [PaginationProvider, usePagination] =
  createRequiredContext<PaginationContextType>("Pagination");

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

// Keeps the first, last, and current pages with their siblings, so the list keeps the same length as the page changes.
function pageItems(page: number, count: number, siblingCount: number): (number | "ellipsis")[] {
  const edgeLength = 3 + siblingCount * 2;
  if (count <= edgeLength + 2) return range(1, count);

  const start = page - siblingCount;
  const end = page + siblingCount;
  if (start <= 3) return [...range(1, edgeLength), "ellipsis", count];
  if (end >= count - 2) return [1, "ellipsis", ...range(count - edgeLength + 1, count)];

  return [1, "ellipsis", ...range(start, end), "ellipsis", count];
}

export type PaginationRootProps = PaginationOptions & {
  children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLElement>, keyof PaginationOptions | "children">;

export function Pagination(props: PaginationRootProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "count",
    "page",
    "defaultPage",
    "siblingCount",
    "labels",
    "onPageChange",
  ]);
  const [currentPage, setCurrentPage] = createControllableSignal({
    value: () => local.page,
    defaultValue: local.defaultPage ?? paginationDefaults.defaultPage,
    onChange: (page) => local.onPageChange?.(page),
  });

  const count = () => Math.max(0, Math.floor(local.count));
  const page = () => Math.min(Math.max(currentPage(), 1), Math.max(count(), 1));
  const labels = () => ({ ...paginationLabels, ...local.labels });

  const context = {
    page,
    count,
    siblingCount: () => Math.max(0, local.siblingCount ?? paginationDefaults.siblingCount),
    labels,
    setPage(next) {
      if (next === page() || next < 1 || next > count()) return;
      setCurrentPage(next);
    },
  } satisfies PaginationContextType;

  return (
    <PaginationProvider value={context}>
      <nav aria-label={labels().root} {...rest} class={cn("sb-pagination", local.class)}>
        {local.children}
      </nav>
    </PaginationProvider>
  );
}

export type PaginationPagesProps = {
  /** Accessible name of each page button. Defaults to the root's `labels.page`, "Page N". */
  getPageLabel?: (page: number) => string;
};

export function PaginationPages(props: PaginationPagesProps) {
  const { page, count, siblingCount, labels, setPage } = usePagination();

  return (
    <For each={pageItems(page(), count(), siblingCount())}>
      {(item) =>
        item === "ellipsis" ? (
          <span class="sb-page-ellipsis" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            type="button"
            class="sb-page-button"
            aria-label={(props.getPageLabel ?? labels().page)(item)}
            aria-current={page() === item ? "page" : undefined}
            onClick={() => setPage(item)}
          >
            {item}
          </button>
        )
      }
    </For>
  );
}

export type PaginationTriggerProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "disabled" | "aria-disabled"
>;

function PaginationTrigger(
  props: PaginationTriggerProps & { step: -1 | 1; label: "previous" | "next" },
) {
  const { page, count, labels, setPage } = usePagination();
  const [local, rest] = splitProps(props, ["class", "step", "label", "onClick"]);
  const target = () => page() + local.step;
  const unavailable = () => target() < 1 || target() > count();

  // aria-disabled keeps focus on the button when it reaches the first or last page.
  return (
    <button
      aria-label={labels()[local.label]}
      {...rest}
      onClick={composeHandler(
        () => local.onClick,
        () => setPage(target()),
      )}
      type="button"
      class={cn("sb-page-button", local.class)}
      aria-disabled={unavailable() ? "true" : undefined}
    />
  );
}

export function PaginationPrevious(props: PaginationTriggerProps) {
  return <PaginationTrigger {...props} step={-1} label="previous" />;
}

export function PaginationNext(props: PaginationTriggerProps) {
  return <PaginationTrigger {...props} step={1} label="next" />;
}
