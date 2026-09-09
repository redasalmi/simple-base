export type StatusValue = "success" | "danger" | "info";

export type StatusOptions = {
  status?: StatusValue;
};

export type AlertStatus = "danger" | "info";

export type AlertOptions = {
  status?: AlertStatus;
};

export type ToastStatus = "success";

export type ToastOptions = {
  status?: ToastStatus;
};

export const toastDefaults = {
  status: "success",
} as const satisfies Required<ToastOptions>;
