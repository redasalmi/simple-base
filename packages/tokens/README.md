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
