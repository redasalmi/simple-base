import type { Placement } from "./placement";

export type StatusValue = "success" | "warning" | "danger" | "info";

export type StatusOptions = {
  /** Defaults to `info`. */
  status?: StatusValue;
};

export const statusLineDefaults = {
  status: "info",
} as const satisfies Required<StatusOptions>;

export type AlertStatus = StatusValue;

export type AlertOptions = {
  /** Defaults to `info`. */
  status?: AlertStatus;
};

export const alertDefaults = {
  status: "info",
} as const satisfies Required<AlertOptions>;

/**
 * Toasts confirm what the user just did, so they are only `success` or `warning`. Errors and
 * information that need attention belong in an Alert, which stays on the page until it's resolved.
 */
export type ToastStatus = "success" | "warning";

export type ToastOptions = {
  /** Defaults to `success`. */
  status?: ToastStatus;
};

export const toastDefaults = {
  status: "success",
} as const satisfies Required<ToastOptions>;

export type ToasterOptions = {
  /** Corner or edge of the viewport the toasts stack in. Defaults to `bottom-end`. */
  placement?: Placement;
  /** Default time in milliseconds before a toast dismisses itself. Defaults to `5000`. */
  duration?: number;
  /** Most toasts shown at once; later ones wait in a queue. Defaults to `24`. */
  max?: number;
};

export const toasterDefaults = {
  placement: "bottom-end",
  duration: 5000,
  max: 24,
} as const satisfies Required<ToasterOptions>;
