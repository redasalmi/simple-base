# @simple-base/css

Simple Base component styles and typography.

Styles cover components and their internal parts, including functional wrappers
such as select arrows and scrollable tables. Page layouts, component galleries,
and external grouping or showcase helpers belong in the consuming application.

## Visual defaults

- Use `.sb-heading-1` through `.sb-heading-6` for utility headings: sans serif,
  sized 32, 24, 20, 18, 16, and 14px. Reserve `.sb-display` for an intentional
  expressive serif heading, not routine page sections or dialogs.
- Write captions, table headings, and optional dialog kickers in sentence case.
  Monospace is for code, identifiers, shortcuts, and alignment-dependent values;
  omit eyebrows that repeat the heading or add no context.
- Cards group content through surfaces and borders, without default elevation.
  Menus and dialogs use restrained shadows, lighter in light themes. Modal
  backdrops separate context with a scrim, not blur.
- Generic dialog kickers are neutral. Danger styling belongs to destructive
  confirmations, not ordinary settings or editing dialogs.
- Buttons stay in place on hover and press. Color and border changes provide
  feedback; focus rings remain visible.

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
