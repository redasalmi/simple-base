import type { Accessor, Ref } from "solid-js";

// JSX accepts any hyphenated attribute that a type omits, so aria-* must be typed as never to be rejected.
export type WithoutOwnedProps<Props, Owned extends string> = Omit<Props, Owned> & {
  [Key in Owned]?: never;
};

/** A boolean `data-*` attribute: present and empty when true, absent otherwise. */
export function dataAttr(condition: boolean) {
  return condition ? "" : undefined;
}

/** `aria-invalid`, left out rather than set to `false`. */
export function ariaInvalid(condition: boolean) {
  return condition || undefined;
}

type BoundHandler<E> = { 0: (data: unknown, event: E) => void; 1: unknown };

/**
 * Runs the caller's handler first, then ours unless the caller called `preventDefault()`.
 * The caller's handler is read on each event, since Solid binds handlers on native elements once.
 */
export function composeHandler<E extends Event>(
  theirs: Accessor<((event: E) => void) | BoundHandler<E> | undefined>,
  ours: (event: E) => void,
) {
  return (event: E) => {
    const handler = theirs();
    if (typeof handler === "function") handler(event);
    else if (handler) handler[0](handler[1], event);
    if (!event.defaultPrevented) ours(event);
  };
}

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (element: T) => {
    for (const ref of refs) if (typeof ref === "function") (ref as (element: T) => void)(element);
  };
}
