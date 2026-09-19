# Solid Playground

Vite app for previewing the components exported by `@simple-base/solid` and the
styles from `@simple-base/css`. Preview examples live in `src/preview/`.

## Reference coverage

The header switches between all nine token themes. Desktop navigation becomes a
native section selector on small screens. Each section has a shareable hash URL
(such as `/#buttons` or `/#alert-dialog`), usage notes, code disclosures, and a
short API reference.

- **Solid components:** Button (six variants, three sizes, disabled states), Badge
  (nine variants, both sizes), Input, TextArea, Checkbox, Radio, Switch, and all
  Dialog and AlertDialog named parts. Form examples cover editable, selected,
  disabled, read-only, and validation states where supported.
- **Foundations:** the heading and body scales, display typography, text roles,
  code, and keyboard shortcuts.
- **CSS-only patterns:** cards, status lines, alerts, toasts, progress, range,
  selects, field grouping, segmented controls, tabs, tables, pagination,
  breadcrumbs, disclosures, command popovers, and empty states.
  These examples do not imply additional Solid component exports.

Examples use local state only. Navigation resets component demonstrations; no
form data is submitted or persisted. Dialog and AlertDialog coordinate their
triggers and native modal content through controlled or uncontrolled state.
Keyboard behavior is demonstrated with native controls, focusable navigation,
and a local accessible tabs example.

The visual structure is a reference workbench: compact masthead, an indexed
navigation rail, and ruled documentation sections beside live specimens. It
reuses the design-system typography and semantic tokens without gradients,
backdrop blur, decorative motion, or additional fonts. Layout and documentation
helpers stay in this app, not the CSS package.

Run commands from the repository root using pnpm.

## Development

```sh
pnpm install
pnpm dev
```

The workspace builds dependencies before starting Vite and watches the Solid
library with tsdown. Open the local URL printed by Vite.

To run only the playground and its library watcher:

```sh
pnpm exec turbo run dev --filter=solid-playground
```

Turbo starts the Solid watcher alongside Vite, after the initial library build.
Watch mode keeps the existing library output in place while rebuilding so Vite's
imports remain resolvable. Production builds still clean the output directory.

## Production build

```sh
pnpm exec turbo run build --filter=solid-playground
pnpm --filter solid-playground preview
```

Turbo builds the library and tokens before the playground. The app is emitted to
`apps/solid-playground/dist/`.

## Type checking

```sh
pnpm typecheck
# Or just the playground:
pnpm exec turbo run typecheck --filter=solid-playground
```

Turbo builds workspace dependencies before checking types. `pnpm check` and
`pnpm quality` also include both the library and playground type checks.

## Modal portal targets

Both `SelectPortal` and `ComboboxPortal` accept `mount?: Node`. Inside a native
modal, mount the popup within the dialog rather than under `document.body`.
Use a signal-backed ref (`const [dialog, setDialog] = createSignal<HTMLDialogElement>()`),
pass `ref={setDialog}` to `AlertDialogContent`, and use `mount={dialog()}` on the portal.
The reactive ref lets the portal follow the dialog once its element is assigned.
