import { For } from "solid-js";
import { Button, type ButtonSize, type ButtonVariant } from "../components/Button";

const variants: ButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "danger",
  "danger-subtle",
];
const sizes: ButtonSize[] = ["small", "medium", "large"];
const items = sizes.flatMap((size) =>
  variants.map((variant) => ({ variant, size, text: `${variant} ${size}` })),
);

export function Buttons() {
  return (
    <div class="flex flex-col gap-4">
      <h1>Buttons</h1>
      <div class="grid grid-cols-3 gap-4">
        <For each={items}>
          {({ variant, size, text }) => (
            <Button variant={variant} size={size} class="capitalize">
              {text}
            </Button>
          )}
        </For>
      </div>
    </div>
  );
}
