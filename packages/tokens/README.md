# @simple-base/tokens

Generated design tokens for Simple Base.

## JavaScript and TypeScript

Use the package root for the resolver and token types:

```ts
import { resolver, type Tokens } from "@simple-base/tokens";

const tokens: Tokens = resolver.apply({ theme: "simple-base-dark" });
```

## Stylesheets

Import CSS custom properties through a CSS-aware bundler:

```css
@import "@simple-base/tokens/css";
```

For Tailwind CSS v4 integration, use the generated theme instead. It includes
Tailwind and the token stylesheet and requires Tailwind in the consuming project:

```css
@import "@simple-base/tokens/tailwind";
```
