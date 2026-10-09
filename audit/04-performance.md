# Performance audit

## Measurements

I bundled one export at a time from `packages/solid/dist/index.js` with Vite 8: library mode, minified, `solid-js` external.

| Import        | Minified |   Gzip |
| ------------- | -------: | -----: |
| `Dialog`      |   0.8 kB | 0.4 kB |
| `Button`      |   0.9 kB |      — |
| `Field`       |   1.6 kB | 0.8 kB |
| `Tabs`        |    38 kB |  11 kB |
| `Toaster`     |    51 kB |  15 kB |
| `NumberField` |    61 kB |  17 kB |
| `Tooltip`     |    74 kB |  21 kB |
| `Menu`        |   121 kB |  33 kB |
| `Select`      |   125 kB |  34 kB |
| `Combobox`    |   131 kB |  35 kB |
| `DatePicker`  |   173 kB |  45 kB |

Tree-shaking works. The single-file `dist/index.js` (100 kB unminified) has `sideEffects: false`. Importing only `Button` doesn't pull in any Zag code, and a `Select`-only bundle contains no date-picker or number code. The popup components share `@zag-js/popper` (Floating UI), `dismissable`, and `dom-query`, so an app that uses Select, Menu, and Tooltip pays for them once. These sizes are normal for Zag. Nothing here is a library-side problem.

## Things I checked that are not problems

- **Spreading `mergeProps(api().getXProps(), rest)`.** The Solid compiler wraps the spread expression in a function source. Solid 1.9's `mergeProps` wraps function sources in `createMemo` (`solid.js:1332`), so each `getXProps()` runs once per `api()` change, not once per key. No change needed.
- **`api = createMemo(() => connect(service, normalizeProps))`.** This is Zag's documented Solid pattern. Every part re-reads `api()` on each machine change, and Solid's `spread` diffs against the previous props, so only changed attributes reach the DOM.
- **`<For>` and `<Index>`.** Lists of objects (options) use `For`. The calendar grids, which are positional, use `Index`. Both choices are right.

## Findings

### P1. DatePickerCalendar computes all three views on every change (Medium)

`DatePicker.tsx:337-519` always renders the day, month, and year views and relies on Zag's `hidden` to hide two of them. Every `api()` change, including each arrow-key move in the day grid, recomputes:

- `getMonthsGrid()` and `getYearsGrid()`, with `Intl` formatting for 12 cells each,
- `getMonthTableCellProps` and `getYearTableCellProps`, plus their trigger props, for those 24 hidden cells,
- `getDecade()` twice (`:475`).

Fix: wrap each view in `<Show when={api().view === "day" | "month" | "year"}>`, and read `getDecade()` once in a local accessor. The day view then does about a third of the work. This also keeps the inactive views out of the DOM.

### P2. Option validation runs in production (Low)

`validateWidgetOptions` (`validateWidgetOptions.ts`) loops over every option and builds a `Set` each time `options` changes, then throws. It is a developer error check.

Fix: guard it with `isDev` from `solid-js/web`. That export is `true` only in Solid's development build, which bundlers pick through the `development` export condition. Then the check and its strings drop out of production bundles.

### P3. Combobox filtering lowercases every label on each keystroke (Low)

`Combobox.tsx:75-78` runs `option.label.toLowerCase()` for every option on every keystroke. That's fine at invoice-app sizes (hundreds of options). For a few thousand, precompute the lowercased labels in a memo keyed on `local.options`.

Separately, `toLowerCase().includes` ignores accents ("é" doesn't match "e"), which matters for French data. `Intl.Collator(locale, { sensitivity: "base" })` or a normalize-and-strip-diacritics step fixes it. That is correctness more than speed.

### P4. Single-file build output (Low)

tsdown bundles the package into one `index.js` and one `index.jsx`. Tree-shaking works (see the measurements), but:

- consumers' dev servers parse all 100 kB on every cold start,
- the `.jsx` file that Solid-aware bundlers pick up through the `solid` export condition is one 71 kB module compiled again by `vite-plugin-solid` in every consumer.

Option: tsdown's `unbundle` mode emits one file per source module. It doesn't change the public API, and it makes sourcemaps and stack traces readable. Measure it before adopting it. This is optional for v1.

### P5. Small allocations repeated per instance (Low, optional)

- `new Intl.DateTimeFormat().resolvedOptions().timeZone` runs once per DatePicker instance (`DatePicker.tsx:79`). Compute it lazily once per module.
- The `ids` and `value` getters in Select and Combobox return new objects or arrays on each read. Zag compares `value` with `isEqual`, so this costs only allocation. Leave it.
