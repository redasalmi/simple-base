// The component adapters. Each has the same components and the same examples, under
// src/examples/<id>. Set released once its package is published.
export const frameworks = [
  { id: "solid", label: "Solid", package: "@simple-base/solid", released: true },
  { id: "react", label: "React", package: "@simple-base/react", released: false },
] as const;

export type Framework = (typeof frameworks)[number]["id"];
