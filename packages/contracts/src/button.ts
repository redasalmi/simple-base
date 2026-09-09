export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "danger"
  | "danger-subtle";

export type ButtonSize = "small" | "medium" | "large";

export type ButtonOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const buttonDefaults = {
  variant: "primary",
  size: "medium",
} as const satisfies Required<ButtonOptions>;
