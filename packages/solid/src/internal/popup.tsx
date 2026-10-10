import type { Placement } from "@simple-base/contracts";
import { type Accessor, createMemo, type JSX } from "solid-js";
import { Portal } from "solid-js/web";

export type PopupPortalProps = {
  children: JSX.Element;
  mount?: Node;
};

export function PopupPortal(props: PopupPortalProps) {
  return <Portal mount={props.mount}>{props.children}</Portal>;
}

/** Zag's `positioning` option, left undefined without a placement so Zag's default applies. */
export function createPositioning(placement: Accessor<Placement | undefined>) {
  return createMemo(() => {
    const value = placement();
    return value ? { placement: value } : undefined;
  });
}
