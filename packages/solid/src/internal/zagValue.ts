// Zag's single-value pickers hold an array; the components expose one value, with `null` for none.

export function toZagValue<T>(value: T | null | undefined) {
  if (value === undefined) return undefined;
  return value === null ? [] : [value];
}

export function fromZagValue<T>(value: T[]) {
  return value[0] ?? null;
}
