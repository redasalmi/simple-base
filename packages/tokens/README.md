# @simple-base/tokens

Design tokens for Simple Base: primitives, semantic roles, and nine color themes, generated with [Terrazzo](https://terrazzo.app/).

Every token is emitted as a CSS custom property named `--sb-<token-path>`, and the full set is also available as JavaScript objects for tooling.

## Install

```sh
pnpm add @simple-base/tokens
```

## Quick start

Load the token stylesheet once, before component or application styles:

```css
@import "@simple-base/tokens/css";
```

Then use the custom properties anywhere:

```css
.panel {
  background: var(--sb-semantic-color-background-surface);
  color: var(--sb-semantic-color-foreground-primary);
  border: 1px solid var(--sb-semantic-color-border-default);
  border-radius: var(--sb-semantic-radius-md);
}
```

The tokens name the Atkinson Hyperlegible Next, Atkinson Hyperlegible Mono, and Young Serif font families but don't load them. Load the fonts in your app, or the system fallbacks apply.

## Theming

Without a `data-theme` attribute, the page follows the system color scheme: `simple-base-light` when it prefers light, `simple-base-dark` otherwise. Set `data-theme` to pick a theme, on the document root or any nested element:

```html
<html data-theme="nord"></html>
```

| Theme                  | Color scheme |
| ---------------------- | ------------ |
| `simple-base-dark`     | dark         |
| `simple-base-light`    | light        |
| `catppuccin-latte`     | light        |
| `catppuccin-frappe`    | dark         |
| `catppuccin-macchiato` | dark         |
| `catppuccin-mocha`     | dark         |
| `dracula`              | dark         |
| `tokyo-night`          | dark         |
| `nord`                 | dark         |

Each theme is a scoped selector, so different regions of a page can use different themes. The matching `color-scheme` is set alongside the variables. To follow the system again, remove the attribute.

### Theme contract

Every theme layers its backgrounds the same way: `canvas` for the page, `surface` for cards and fields, then `muted` and `strong`, two opaque fills that each step further toward the foreground. `subtle` is a translucent tint of the foreground for hover states and quiet badges, over `canvas`, `surface`, or `muted`.

Every theme meets these WCAG 2 contrast minimums, and `pnpm check` fails if one doesn't:

| Role                                                                         | On                                                                    | Minimum |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------- |
| `foreground.primary`, `secondary`, `muted`                                   | `canvas`, `surface`, `muted`, and `subtle` or `accent.soft` over them | 4.5:1   |
| `foreground.primary`                                                         | `strong`                                                              | 4.5:1   |
| `foreground.inverse`                                                         | `foreground.primary`                                                  | 4.5:1   |
| `accent.text`                                                                | `canvas`, `surface`, `muted`, `accent.soft`                           | 4.5:1   |
| `status.*.text`                                                              | `canvas`, `surface`, its `soft`                                       | 4.5:1   |
| `accent.on-surface`, `status.*.on-surface`, `selection.foreground`           | their fill                                                            | 4.5:1   |
| `border.strong`, `status.danger.base`, `focus.danger-ring`, `accent.surface` | `canvas`, `surface`                                                   | 3:1     |
| `focus.ring`                                                                 | `canvas`, `surface`, `muted`                                          | 3:1     |
| `status.*.base` (glyphs)                                                     | its `soft`                                                            | 3:1     |
| `status.*.surface` (progress fills)                                          | `strong` (the track)                                                  | 3:1     |

Two limits are by design:

- `background.strong` carries `foreground.primary` text only. Set secondary or muted text on `muted` or `surface`.
- `border.default` is below 3:1 in every theme. It is for dividers and card edges; field and control outlines use `border.strong`.

### Ported palettes

Catppuccin, Dracula, Tokyo Night, and Nord start from their official palettes. Each theme file declares its palette under `$extensions["org.simple-base.theme"].palette`, and each color token names the palette color it uses in `$extensions["org.simple-base.palette"]`. Each role uses a palette color that meets the contract. Where none does, the closest palette color is lightened or darkened just enough to pass, and the token records why as an `exception`:

| Theme  | Adjusted color                                                                                                                     |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Latte  | Accent text: `mauve`, darkened. Success and warning glyphs and fills: `green` and `yellow`, darkened. Info fill: `blue`, darkened. |
| Frappé | Accent text: `mauve`, lightened.                                                                                                   |
| Nord   | Danger glyph and fill: `nord11`, lightened, with `nord0` text on the fill.                                                         |

Tints, the modal scrim, and the shadows set their own opacity.

Each status color is shown one of three ways, whichever its palette allows:

- **Tinted**: the label in the status color on a tint of the same color. Most statuses in the dark palettes.
- **Shaded**: the label in the status color on the palette's darkest color, where a tint would lower its contrast too far. Frappé and Dracula danger.
- **Body text**: the label in the body color, with the status color on the glyph, tint, and border. Every status in Latte, and Nord danger and info.

Some palettes also need a different layering. Latte and Nord use the same color for `canvas` and `surface`, because their accent or field-border color only reaches contrast on the lightest (Latte) or darkest (Nord) background; cards are set apart by their border. Dracula and Tokyo Night use their comment grays only for borders, and set secondary and muted text in their lighter text colors. Frappé and Macchiato set muted text in `subtext1`, like secondary, because `subtext0` falls below 4.5:1 on `muted`. Frappé fills danger with `maroon`, its lighter red, and Dracula sets `strong` in `background-light`, so the danger progress fill reaches 3:1 on its track.

## Sizing

Font sizes, spacing, radii, control and icon sizes, and breakpoints are in `rem`, so they grow together when a user raises the browser's default font size. At the default of 16px, `1rem` is 16px and the spacing scale keeps its 4px steps (`semantic.space.1` is `0.25rem`). Border widths, the `full` radius, and shadows stay in `px`. Letter spacing is in `em`, relative to the font size.

## Customizing

Override any token on `:root`, after the token stylesheet. Only colors and shadows are redeclared in each theme scope, so an override of anything else holds inside every theme:

```css
:root {
  --sb-semantic-radius-md: 0.5rem;
}
```

Colors are redeclared in each theme scope, so override a color with the same selector as the theme it changes, after the token stylesheet:

```css
[data-theme="nord"] {
  --sb-semantic-color-accent-text: #8fbcbb;
}
```

The system default uses `:root` for `simple-base-dark` and `@media (prefers-color-scheme: light) { :root:not([data-theme]) { … } }` for `simple-base-light`. Keep an override within the theme contract above.

## Tailwind CSS

For Tailwind CSS v4, import Tailwind and then the generated theme, instead of the token stylesheet. The theme imports the tokens and maps the semantic roles onto Tailwind theme variables:

```css
@import "tailwindcss";
@import "@simple-base/tokens/tailwind";
```

```html
<div class="bg-background-surface text-foreground-primary rounded-md">…</div>
```

Utility names follow the token paths, so `bg-background-surface` uses `--sb-semantic-color-background-surface`. Utilities resolve the same semantic CSS variables as the component styles, so they follow `data-theme` too. Each theme also gets a variant for conditional utilities, which matches the element that sets `data-theme` and everything inside it:

```html
<div class="nord:bg-background-muted">…</div>
```

`simple-base-dark:` and `simple-base-light:` also match a page without `data-theme` when the system color scheme selects that theme. Tailwind's own `dark:` still follows the system color scheme alone, so prefer the theme variants when a page sets `data-theme`. A variant matches any ancestor with that theme, so in a theme nested inside another theme, both themes' variants apply.

Breakpoints are generated as literal `rem` values, the same as Tailwind's defaults, because media queries cannot resolve custom properties.

## JavaScript and TypeScript

The package root exposes the token resolver and full token types:

```ts
import { resolver, type Tokens } from "@simple-base/tokens";

const tokens: Tokens = resolver.apply({ theme: "dracula" });

tokens["semantic.color.foreground.primary"].$value;
```

| Export                        | Description                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------- |
| `resolver.apply()`            | Resolves a permutation (for example `{ theme: "nord" }`) and returns its tokens. |
| `resolver.listPermutations()` | Lists every available permutation.                                               |
| `PERMUTATIONS`                | All permutations keyed by their serialized input.                                |
| `Tokens`                      | Type of a resolved token set; individual value types are exported too.           |

## Reference

**Variable naming.** Dots in a token path become hyphens: `semantic.color.foreground.primary` becomes `--sb-semantic-color-foreground-primary`.

**Primitives versus semantic roles.** Primitive tokens such as `--sb-primitive-color-accent` are raw values; semantic tokens name a purpose. Both are public API and follow semver. Prefer semantic tokens in application and component styles: they say what a value is for, and the components use only them.

## Versioning

Simple Base is on 0.x. All its packages go to 1.0.0 together, once `@simple-base/react` ships the same components as `@simple-base/solid`. Until then a minor release can include breaking changes.

## Links

- [Repository](https://github.com/redasalmi/simple-base)
- [Styling layer](https://www.npmjs.com/package/@simple-base/css)
- [Solid components](https://www.npmjs.com/package/@simple-base/solid)

## License

[MIT](https://github.com/redasalmi/simple-base/blob/main/LICENSE)
