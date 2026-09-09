export type BadgeVariant =
  | "default"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "accent"
  | "command"
  | "outline"
  | "muted";

export type BadgeSize = "small" | "medium";

export type BadgeOptions = {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

export const badgeDefaults = {
  variant: "default",
  size: "medium",
} as const satisfies Required<BadgeOptions>;
