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

## Theming

`simple-base-dark` is the default and applies to `:root`. Every other theme activates through `data-theme`, on the document root or any nested element:

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

Each theme is a scoped selector, so different regions of a page can use different themes. The matching `color-scheme` is set alongside the variables.

### Theme contract

Every theme layers its surfaces the same way — `canvas` for the page, `surface` for cards and fields, then `raised` and `overlay` as one small step up each — and meets these contrast minimums against the surface and canvas it sits on:

| Role                                                       | Minimum |
| ---------------------------------------------------------- | ------- |
| `foreground.primary`, `secondary`, `muted` text            | 4.5:1   |
| `accent.text` and `status.*.text`, also on `*.soft`        | 4.5:1   |
| `accent.on-surface`, `status.danger.on-surface`            | 4.5:1   |
| `border.strong` (field, checkbox, switch outlines)         | 3:1     |
| `status.danger.base` (invalid borders)                     | 3:1     |
| `status.*.base` on `*.soft` (glyphs), when text is colored | 3:1     |
| `focus.ring`, `accent.surface`                             | 3:1     |

### Ported palettes

Catppuccin, Dracula, Tokyo Night, and Nord use only their official palette colors. Each theme file declares its palette under `$extensions["org.simple-base.theme"].palette`, and each color token names the palette color it uses in `$extensions["org.simple-base.palette"]`. Colors are never lightened or darkened to pass contrast. Instead, each role picks a palette color that passes, and the only adjustment is the opacity of tints and the modal scrim.

Each status color is shown one of three ways, whichever its palette allows:

- **Tinted**: the label in the status color on a tint of the same color. Most statuses in the dark palettes.
- **Shaded**: the label in the status color on the palette's darkest color, where a tint would lower its contrast too far. Frappé and Dracula danger.
- **Body text**: the label in the body color, with the status color on the glyph, tint, and border. Used where no palette pairing reaches 4.5:1: every status in Latte, and Nord danger and info.

Some palettes also need a different layering. Latte and Nord use the same color for `canvas` and `surface`, because their accent or field-border color only reaches contrast on the lightest (Latte) or darkest (Nord) background; cards are set apart by their border. Dracula and Tokyo Night use their comment grays only for borders, and set secondary and muted text in their lighter text colors. Frappé sets muted text in `subtext1`, like secondary, because `subtext0` falls below 4.5:1 on `raised`.

The one exception is Nord's `danger-surface`, the danger button fill: no Nord color reaches 4.5:1 as text on `nord11`, so it uses `nord11` darkened. The exception is recorded in the token.

## Tailwind CSS

For Tailwind CSS v4, use the generated theme instead of importing the token stylesheet directly. It imports Tailwind and the tokens, and maps the semantic roles onto Tailwind theme variables:

```css
@import "@simple-base/tokens/tailwind";
```

```html
<div class="bg-background-surface text-foreground-primary rounded-md">…</div>
```

Tailwind must be installed in the consuming project. Utilities resolve the same semantic CSS variables as the component styles, so they follow `data-theme` too. Each theme also gets a `@custom-variant` for conditional utilities:

```html
<div class="nord:bg-background-raised">…</div>
```

Breakpoints are generated as literal dimensions, because CSS media queries cannot resolve custom properties.

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

**Primitives versus semantic roles.** Primitive tokens such as `--sb-primitive-color-accent` are raw values. Semantic tokens name a purpose and are the stable public surface — prefer them in application and component styles, since a theme changes semantics rather than primitives.

## Links

- [Repository](https://github.com/redasalmi/simple-base)
- [Styling layer](https://www.npmjs.com/package/@simple-base/css)
- [Solid components](https://www.npmjs.com/package/@simple-base/solid)

## License

[MIT](https://github.com/redasalmi/simple-base/blob/main/LICENSE)
