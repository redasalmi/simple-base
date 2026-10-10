import { type Accessor, onCleanup, onMount } from "solid-js";

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Calls `onReset` when the element's form is reset, unless the `reset` event was prevented. It
 * mirrors `trackFormReset` in `@zag-js/dom-query`, for machines that don't track their form yet.
 * The form is read once on mount, so it runs on the client only.
 */
export function trackFormReset(element: Accessor<Element | undefined>, onReset: () => void) {
  const listener = (event: Event) => {
    if (!event.defaultPrevented) onReset();
  };

  onMount(() => {
    const target = element();
    const form = isFormControl(target) ? target.form : target?.closest("form");
    if (!form) return;

    form.addEventListener("reset", listener, { passive: true });
    onCleanup(() => form.removeEventListener("reset", listener));
  });
}

function isFormControl(element: Element | undefined): element is FormControl {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  );
}
