# @simple-base/css

Simple Base component styles and typography.

## All styles

Import the stylesheet for its side effects through a CSS-aware bundler:

```ts
import "@simple-base/css";
```

Or import it from CSS:

```css
@import "@simple-base/css";
```

The package root includes the token stylesheet. Stylesheet imports do not export
a JavaScript value or CSS string.

## Individual stylesheets

Load tokens once, then select the component styles you need:

```css
@import "@simple-base/tokens/css";
@import "@simple-base/css/button";
@import "@simple-base/css/badge";
```

Individual stylesheets use explicit, extensionless exports such as `/button`,
`/badge`, `/alert-dialog`, and `/typography`. The internal `styles/` directory and
`.css` filenames are not public import paths. These exports also support
side-effect imports in TypeScript:

```ts
import "@simple-base/css/button";
```
