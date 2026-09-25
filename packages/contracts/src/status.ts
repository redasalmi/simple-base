export type StatusValue = "success" | "warning" | "danger" | "info";

export type StatusOptions = {
  status?: StatusValue;
};

export type AlertStatus = "success" | "warning" | "danger" | "info";

export type AlertOptions = {
  status?: AlertStatus;
};

export type ToastStatus = "success" | "warning";

export type ToastOptions = {
  status?: ToastStatus;
};

export const toastDefaults = {
  status: "success",
} as const satisfies Required<ToastOptions>;
