import {
  createContext,
  createSignal,
  For,
  splitProps,
  useContext,
  type Accessor,
  type JSX,
} from "solid-js";
import { mergeProps } from "@zag-js/solid";
import { cn } from "../cn";
import { paginationDefaults, type PaginationOptions } from "@simple-base/contracts";

type PaginationContextType = {
  page: Accessor<number>;
  count: Accessor<number>;
  siblingCount: Accessor<number>;
  setPage: (page: number) => void;
};

const PaginationContext = createContext<PaginationContextType | null>(null);

function usePagination() {
  const context = useContext(PaginationContext);
  if (!context) throw new Error("Pagination parts must be used within a Pagination");

  return context;
}

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
    "onPageChange",
  ]);
  const [uncontrolledPage, setUncontrolledPage] = createSignal(
    local.defaultPage ?? paginationDefaults.defaultPage,
  );

  const count = () => Math.max(0, Math.floor(local.count));
  const page = () => Math.min(Math.max(local.page ?? uncontrolledPage(), 1), Math.max(count(), 1));

  const context = {
    page,
    count,
    siblingCount: () => Math.max(0, local.siblingCount ?? paginationDefaults.siblingCount),
    setPage(next) {
      if (next === page() || next < 1 || next > count()) return;
      if (local.page === undefined) setUncontrolledPage(next);
      local.onPageChange?.(next);
    },
  } satisfies PaginationContextType;

  return (
    <PaginationContext.Provider value={context}>
      <nav aria-label="Pagination" {...rest} class={cn("sb-pagination", local.class)}>
        {local.children}
      </nav>
    </PaginationContext.Provider>
  );
}

export type PaginationPagesProps = {
  /** Accessible name of each page button. Defaults to "Page N". */
  getPageLabel?: (page: number) => string;
};

export function PaginationPages(props: PaginationPagesProps) {
  const { page, count, siblingCount, setPage } = usePagination();

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
            aria-label={props.getPageLabel?.(item) ?? `Page ${item}`}
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

function PaginationTrigger(props: PaginationTriggerProps & { step: -1 | 1; label: string }) {
  const { page, count, setPage } = usePagination();
  const [local, rest] = splitProps(props, ["class", "step", "label"]);
  const target = () => page() + local.step;
  const unavailable = () => target() < 1 || target() > count();
  const behavior = {
    "aria-label": local.label,
    onClick() {
      setPage(target());
    },
  };

  // aria-disabled keeps focus on the button when it reaches the first or last page.
  return (
    <button
      {...mergeProps(behavior, rest)}
      type="button"
      class={cn("sb-page-button", local.class)}
      aria-disabled={unavailable() ? "true" : undefined}
    />
  );
}

export function PaginationPrevious(props: PaginationTriggerProps) {
  return <PaginationTrigger {...props} step={-1} label="Previous page" />;
}

export function PaginationNext(props: PaginationTriggerProps) {
  return <PaginationTrigger {...props} step={1} label="Next page" />;
}
