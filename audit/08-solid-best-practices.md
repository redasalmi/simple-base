# Solid best practices

I checked the Solid code against the official docs (docs.solidjs.com: props, context, refs, the TypeScript configuration page, and the `prop:` and `attr:` references) and against Solid 1.9.15's own runtime in `node_modules`.

## What already follows the docs

| Practice (docs)                                                      | Status                                                          |
| -------------------------------------------------------------------- | --------------------------------------------------------------- |
| Don't destructure props; use `splitProps` and `mergeProps`           | ✓ Never destructured. Every component splits `local` and `rest` |
| Use context instead of prop drilling for compound components         | ✓ One context per compound component                            |
| Stable ids with `createUniqueId` (SSR-safe)                          | ✓ Everywhere                                                    |
| `<For>` for keyed object lists, `<Index>` for positional lists       | ✓ Options use `For`, calendar grids use `Index`                 |
| `<Show>` with the callback form for narrowing                        | ✓ `Combobox.tsx:162`, `ToastAction`                             |
| Event handlers as camelCase `onX` (delegated)                        | ✓                                                               |
| Library publishing with a `solid` export condition and preserved JSX | ✓ `exports["."].solid → dist/index.jsx`                         |
| `solid-js` as a peer dependency                                      | ✓                                                               |

The hooks destructure context, as in `const { api } = useSelect()`. That is fine, because the context values are accessors and stable functions, not props.

## Findings

### S1. Type `prop:` and `attr:` through `JSX.ExplicitProperties` instead of spread tricks (Low)

The docs' TypeScript page says the way to type `prop:*`, `attr:*`, and `bool:*` is to augment `ExplicitProperties`, `ExplicitAttributes`, and `ExplicitBoolAttributes`. The code avoids the types with object spreads:

- `{...{ "attr:selected": … }}` (`Select.tsx:138`)
- `{...(cond ? {} : { "prop:indeterminate": … })}` (`Checkbox.tsx:18`)
- `{...(cond ? {} : { "prop:defaultValue": … })}` (`Input.tsx:19`, `TextArea.tsx:16`)

Add an internal `src/jsx.d.ts`:

```ts
import "solid-js";
declare module "solid-js" {
  namespace JSX {
    interface ExplicitProperties {
      defaultValue: string;
      indeterminate: boolean;
    }
    interface ExplicitAttributes {
      selected: "" | undefined;
    }
  }
}
```

Then `attr:selected={…}` can be written directly. Two things to watch:

1. Keep the conditional for `prop:defaultValue`. Setting `defaultValue = undefined` writes the string `"undefined"`.
2. Make sure the augmentation doesn't leak into the published `index.d.ts`. It is only picked up if a public type imports it.

There is also a simplification for `Checkbox`. In solid-js 1.9.15, `indeterminate` is already in Solid's DOM `Properties` set (`web.js:7`), so a plain `indeterminate={…}` sets the property. The `prop:` spread is only needed if you support older 1.9.x versions (see [B4](06-build-and-ci.md)).

### S2. Ref forwarding (Low)

The Solid docs forward a ref by passing it on. Splitting `ref` out and calling `local.ref(el)` by hand (`DialogTrigger`, `DialogClose`, `DialogAction`, and the AlertDialog parts) adds nothing when the component doesn't need the element itself. Leave `ref` in `rest`. Where the component does need the element (`CheckboxGroup`, `DialogContent`), use a small `mergeRefs` (see [R7](05-refactoring-helpers.md)).

The manual version also ignores a non-function `ref`. Solid's compiler normally turns `ref={el}` into a function, but a component that forwards `props.ref` from another component may pass an object, and that ref would be silently dropped.

### S3. Prefer refs to `document.getElementById` (Medium)

`DatePicker.tsx:150` reads `document.getElementById(id())` in `onMount`. Inside a shadow root, an iframe, or a page with a duplicate id from another instance, it finds the wrong element or none. Capture the input with a ref through context, or use Zag's own `scope` if the reset logic stays (see [Z7](03-zag-compliance.md)).

### S4. Controlled native inputs need re-syncing (Medium)

Solid writes a property only when the computed value changes. A native radio or checkbox changes its own `checked` state on click. When the controlled value doesn't change because the parent rejected the click, the DOM drifts from state (`RadioGroup.tsx:88`, `CheckboxGroup.tsx:101`). The usual Solid fix is to re-assert the property in the event handler when the control is controlled. See [A5](02-accessibility.md).

### S5. `createEffect` for the dialog sync (Low)

`DialogContent` and `AlertDialogContent` use `createEffect` to call `showModal()` and `close()` when `open()` changes. That is correct, because effects run after render, once the element is connected. One refinement:

- `if (!dialog?.isConnected) return;` is fine. Add `onCleanup(() => dialog.open && dialog.close())`, so that unmounting an open `DialogContent` doesn't leave a top-layer element briefly during transitions.

### S6. SSR safety (Medium if SSR matters, Low otherwise)

The library ships a JSX build for SSR-capable bundlers, but some code assumes a browser:

- `new Intl.DateTimeFormat().resolvedOptions().timeZone` (`DatePicker.tsx:79`) runs on the server too. It returns the server's time zone, so "today" can differ between server and client, which gives a hydration mismatch. Resolve it in `onMount`, or use `isServer` from `solid-js/web` and let the client patch it.
- Field and NumberField register their description and error in `onMount`, which means `aria-describedby` is missing from server HTML until hydration. That is acceptable. Document it if SSR is a target.

If v1 is client-only, as the invoicing app is, say so in the README.

### S7. Component prop types (Low, optional)

The code types props as `JSX.HTMLAttributes<HTMLDivElement>` plus options. That is valid. For future components, two docs-blessed helpers could replace hand-written `children: JSX.Element` fields: `ComponentProps<"div">` (from `solid-js`), which keeps element and attribute types in sync automatically, and `ParentProps<P>`. This isn't worth churning the existing code before 1.0.

### S8. `mergeProps` from `@zag-js/solid` in non-Zag code (Low)

See [R6](05-refactoring-helpers.md). For plain components, Solid's own guidance is `splitProps` plus explicit handler calls. A local `composeHandler` keeps the Zag adapter out of Dialog, Pagination, and the choice groups, and handles Solid's bound `[fn, data]` handler form.

### S9. Getting ready for Solid 2.0 (Low, informational)

Solid 2.0 reached release candidate this year ([solidjs/solid releases](https://github.com/solidjs/solid/releases), [`@solidjs/web` 2.0.0-rc.3](https://newreleases.io/project/github/solidjs/solid/release/@solidjs%2Fweb@2.0.0-rc.3), [InfoQ on Solid 2 async](https://www.infoq.com/news/2026/05/solidjs-2-async/)). The packages and import paths change (for example, `@solidjs/web` and a dropped `mergeProps` re-export). A [proposal](https://hackmd.io/@0u1u3zEAQAO0iYWVAStEvw/SyXYy2swbg) also discusses replacing `splitProps` with `omit`. I couldn't confirm what shipped, so verify against the final 2.0 docs.

1.0 should stay on Solid 1.9 with `"solid-js": "^1.9.x"`. Keeping the `splitProps`, `mergeProps`, and context plumbing behind the few internal helpers in [05](05-refactoring-helpers.md) would make a later 2.0 adapter a much smaller change. Zag's Solid adapter will also need a 2.0-compatible release first.
