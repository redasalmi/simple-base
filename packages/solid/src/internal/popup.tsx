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

/** Zag's `positioning` option. */
export function createPositioning(placement: Accessor<Placement>) {
  return createMemo(() => ({ placement: placement() }));
}
