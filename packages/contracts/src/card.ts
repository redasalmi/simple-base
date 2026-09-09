export type CardVariant = "flat" | "rule";

export type CardOptions = {
  variant?: CardVariant;
  padding?: boolean;
};

export const cardDefaults = {
  variant: "flat",
  padding: false,
} as const satisfies Required<CardOptions>;
