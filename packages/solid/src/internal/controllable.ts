import { type Accessor, createSignal } from "solid-js";

type ControllableSignalOptions<T> = {
  /** The controlled value, or `undefined` to keep the value internally. */
  value: Accessor<T | undefined>;
  defaultValue: T;
  onChange?: (value: T) => void;
};

export function createControllableSignal<T>(
  options: ControllableSignalOptions<T>,
): [Accessor<T>, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = createSignal(options.defaultValue);

  const value = () => {
    const controlled = options.value();
    return controlled === undefined ? uncontrolled() : controlled;
  };
  const setValue = (next: T) => {
    if (Object.is(next, value())) return;
    if (options.value() === undefined) setUncontrolled(() => next);
    options.onChange?.(next);
  };

  return [value, setValue];
}
