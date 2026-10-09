# Refactoring: helpers and removing repetition

Each proposal below names the duplicated code, where it lives, and the helper that would replace it. I only proposed helpers that remove three or more copies or fix a bug along the way. A few tempting abstractions are listed at the end as not worth doing.

All helpers would be internal modules under `packages/solid/src/` (for example `src/internal/`), not public exports.

## R1. Description and error wiring: 4 copies, 6 after Select and Combobox (High)

These blocks are nearly identical:

- `Field.tsx:52-87`
- `Fieldset.tsx:50-81`
- `NumberField.tsx:66-147`
- `DatePicker.tsx:73-178`

Each one creates two signals (`hasDescription`, `hasError`), derives `descriptionId` and `errorId`, builds `describedBy`, and defines `registerDescription()` and `registerError()` with `onMount` and `onCleanup`. The Description and Error parts are duplicated in the same way across the four files: same markup, same `sb-field-description` and `sb-field-error` classes.

Proposed helper:

```ts
// internal/createMessages.ts
export function createMessages(id: Accessor<string>, invalid: Accessor<boolean>) {
  const [hasDescription, setHasDescription] = createSignal(false);
  const [hasError, setHasError] = createSignal(false);
  const descriptionId = () => `${id()}-description`;
  const errorId = () => `${id()}-error`;

  return {
    descriptionId,
    errorId,
    invalid,
    describedBy: () =>
      [hasDescription() && descriptionId(), hasError() && invalid() && errorId()]
        .filter(Boolean)
        .join(" ") || undefined,
    registerDescription: () => register(setHasDescription),
    registerError: () => register(setHasError),
  };
}

function register(set: Setter<boolean>) {
  onMount(() => set(true));
  onCleanup(() => set(false));
}
```

It would come with two internal parts that take the messages object, `MessageDescription` and `MessageError`. Each public part (`FieldDescription`, `NumberFieldError`, and so on) becomes a one-line wrapper that passes in its context. Select and Combobox then get Description and Error parts almost for free, which fixes [A1](02-accessibility.md).

The same change fixes a small bug. With two `FieldDescription`s, unmounting one sets `hasDescription` to `false`. Counting mounts instead of using a boolean fixes it in one place.

## R2. Context creation: 16 copies (Medium)

Every compound component repeats the same three steps: `createContext<T | null>(null)`, then a `useX()` that throws, then a hand-written error message. The messages differ between files (see [C9](01-consistency.md)).

```ts
// internal/createRequiredContext.ts
export function createRequiredContext<T>(name: string) {
  const Context = createContext<T>();
  const use = () => {
    const value = useContext(Context);
    if (value === undefined) throw new Error(`${name} parts must be used within a ${name}`);
    return value;
  };
  return [Context.Provider, use] as const;
}
```

## R3. Dialog and AlertDialog are about 90% the same (High)

`Dialog.tsx` (250 lines) and `AlertDialog.tsx` (269 lines) duplicate:

- the root, with its controlled/uncontrolled `open`, the `dialogRef` signal, and three ids,
- the content, with `onCancel`, `onClose`, the `createEffect` that calls `showModal()` and `close()`, and ref merging,
- the trigger,
- four copies of the same close-button `onClick` (`DialogClose`, `DialogAction`, `AlertDialogCancel`, `AlertDialogAction`).

The real differences are small: `role`, the class prefix, the title tag, and the default variants of the action and cancel buttons.

Proposal: one internal `createDialog()` that returns the context value, a `DialogContentBase` that takes `role` and `class`, and a `closeDialogOnClick` behavior object. The public Dialog and AlertDialog parts stay as thin named wrappers, so the API doesn't change. This roughly halves the code and means a dialog bug is fixed once.

## R4. Controllable state: 3 copies (Medium)

The pattern `const open = () => props.open ?? uncontrolled(); const setOpen = (v) => { if (same) return; if (props.open === undefined) setUncontrolled(v); props.onOpenChange?.(v) }` appears in `Dialog.tsx:42-51`, `AlertDialog.tsx:42-51`, and, with clamping, `Pagination.tsx:61-76`.

```ts
export function createControllableSignal<T>(options: {
  value: () => T | undefined;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [Accessor<T>, (next: T) => void];
```

## R5. Popup positioning and portals: 5 copies (Low)

- `createMemo(() => props.placement ? { placement: props.placement } : undefined)` appears in Select, Combobox, Menu, and Tooltip. DatePicker has a variant with a default.
- `SelectPortal`, `ComboboxPortal`, `MenuPortal`, `TooltipPortal`, and `DatePickerPortal` are the same three-line component. Keep the five public names for discoverability, all pointing at one internal `PopupPortal`.

## R6. Event handler composition without Zag (Low)

Five non-Zag components (Dialog, AlertDialog, Pagination, RadioGroup, and CheckboxGroup) import `mergeProps` from `@zag-js/solid` only to chain one handler with the caller's. A local helper keeps the same order (caller's handler first) and lets internal code check `defaultPrevented`:

```ts
export function composeHandler<E extends Event>(
  theirs: JSX.EventHandlerUnion<any, E> | undefined,
  ours: (event: E) => void,
) {
  return (event: E) => {
    if (typeof theirs === "function") theirs(event as never);
    else if (Array.isArray(theirs)) theirs[0](theirs[1], event);
    if (!event.defaultPrevented) ours(event);
  };
}
```

This also handles Solid's bound-handler form `[fn, data]`, which `callAll` in `@zag-js/core` doesn't. Keep `@zag-js/solid`'s `mergeProps` for Zag parts.

## R7. Ref merging: 9 call sites (Low)

`CheckboxGroup.tsx:62-65`, `DialogContent`, and `AlertDialogContent` merge refs by hand with `if (typeof local.ref === "function") local.ref(el)`.

`DialogTrigger`, `DialogClose`, `DialogAction`, `AlertDialogTrigger`, `AlertDialogCancel`, and `AlertDialogAction` split out `ref` and forward it unchanged, which does nothing. Leave `ref` in `rest` there.

Add a tiny `mergeRefs(...refs)` for the three call sites that actually need two refs (the same idea as `@solid-primitives/refs`).

## R8. Small shared helpers and types (Low)

- **`dataAttr(cond)`**, returning `"" | undefined`. `x() ? "" : undefined` appears 8 times across Field, Fieldset, DatePicker, and the dialog triggers.
- **`ariaInvalid(cond)`**, returning `true | undefined`. `x() || undefined` appears 4 times.
- **`WithoutOwnedProps<Props, Owned>`**. It is defined three times (`Field.tsx:122`, `NumberField.tsx:39`, `DatePicker.tsx:43`) and inlined in `RadioGroup.tsx:66` and `CheckboxGroup.tsx:76`, each with the same comment. Move it to `internal/types.ts`.
- **Single-value adapters for Select and Combobox.** `value === undefined ? undefined : value === "" ? [] : [value]` appears 4 times (`Select.tsx:95-102`, `Combobox.tsx:115-122`). Use `toZagValue(value)` and `fromZagValue(value) => value[0] ?? ""`.

## R9. Contracts duplication (Low)

- `SelectOptions` and `ComboboxOptions` are field-for-field identical, and so are `SelectOption` and `ComboboxOption`. Define a `ListboxOption` and `ListboxOptions` base and alias both.
- `AlertStatus` is the same union as `StatusValue`. Use `type AlertStatus = StatusValue`, or keep one name.
- Make `options` `readonly ListboxOption[]` so `as const` arrays type-check. `validateWidgetOptions` already takes `readonly`.

## Abstractions that aren't worth doing

- **A factory for the about 25 class-wrapper parts** (`AlertContent`, `DialogHeader`, `EmptyStateActions`, and so on, as in `createSlot("div", "sb-alert-content")`). Each is 5 readable lines. A factory saves little and makes the types and go-to-definition worse.
- **Wrapping `useMachine` and `connect`.** `const api = createMemo(() => x.connect(service, normalizeProps))` is Zag's documented Solid pattern, and a wrapper would hide it. This also follows the Zag compliance rule in report 03.
- **Merging the Label parts.** `SelectLabel`, `NumberFieldLabel`, and the others each spread different Zag props, so sharing only the `class` isn't worth an abstraction.

## Suggested order

1. R1 and R2, which make the Select and Combobox accessibility fix ([A1](02-accessibility.md)) small.
2. R3 and R4.
3. R6, R7, and R8 as cleanup in the same pass.
4. R9 while you freeze the contracts ([C5](01-consistency.md)).

Do all of it after the behavior tests from [Q1](07-code-quality.md) exist, so the refactor is checked.
