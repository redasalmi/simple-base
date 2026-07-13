---
name: design
description: Designs and implements the product’s professional dark visual system across application and marketing interfaces. Use for UI components, pages, command interactions, responsive layouts, visual polish, and frontend work requiring the project’s primary design direction.
---

# Product Design Direction

Build professional interfaces that feel polished, vibrant, and enjoyable without sacrificing clarity or speed. Application UI follows Linear-inspired density and hierarchy; marketing pages, command interactions, and motion draw from Raycast-inspired depth and atmosphere.

This skill defines how to apply the system. `packages/tokens/src/tokens.dtcg.json` and its resolver are the source of truth for visual values. Use exported semantic tokens rather than copying values from this document. The optional [Linear](linear.md) and [Raycast](raycast.md) references provide deeper inspiration but are not required for normal work.

## Experience Principles

1. **Professional, not sterile.** Use precise alignment, typography, and restrained surfaces; introduce personality through violet highlights, atmosphere, and motion.
2. **Compact, not cramped.** Keep workflows dense while preserving readable type, clear grouping, and usable targets.
3. **Vibrant, not noisy.** Concentrate color around branding, focus, selection, and key moments rather than coloring every component.
4. **Fast and obvious.** Make primary actions, current state, keyboard focus, and system feedback immediately understandable.
5. **Depth through restraint.** Prefer layered surfaces, thin borders, and controlled highlights over large shadows or excessive glass effects.

## Decision Hierarchy

When references suggest different treatments:

- Favor Linear-inspired patterns for application layout, navigation, data views, and density.
- Favor Raycast-inspired patterns for marketing composition, command palettes, keyboard interactions, and motion.
- Use `button.primary.*` for the dominant neutral CTA; do not substitute the brand accent.
- Use `accent.primary` for branding, focus, selection, and links.
- Keep ordinary component radii within `radius.sm` through `radius.lg`.
- Use `font.sans` for UI and editorial text and `font.mono` for technical content and shortcuts.
- Accessibility, theme semantics, and established project conventions override visual inspiration.

## Token Usage

Import tokens from `@simple-base/tokens` or `@simple-base/tokens/css`. In CSS, use the generated `--sb-*` variables. Prefer semantic and component tokens over primitives:

1. Component token, such as `button.primary.bg`
2. Semantic token, such as `fg.primary` or `accent.primary`
3. Primitive token only when defining a new semantic token in the token package

Do not hardcode colors, shadows, radii, typography recipes, spacing, or motion values in components when an appropriate token exists. If the system lacks a reusable value, add it to the source token file first and rebuild the package.

## Foundations

### Color Roles

| Role            | Token                                                              | Usage                                         |
| --------------- | ------------------------------------------------------------------ | --------------------------------------------- |
| Canvas          | `bg.canvas`                                                        | Deepest page or application background        |
| Page            | `bg.page`                                                          | Standard page background                      |
| Base surface    | `bg.surface.default`                                               | Sidebars, cards, and panels                   |
| Raised surface  | `bg.surface.raised`                                                | Focused regions, menus, and elevated cards    |
| Overlay surface | `bg.surface.overlay`                                               | Dialogs, tooltips, and floating controls      |
| Muted surface   | `bg.muted`                                                         | Quiet controls and badges                     |
| Default border  | `border.default`                                                   | Standard boundaries and dividers              |
| Strong border   | `border.strong`                                                    | Focused or emphasized boundaries              |
| Primary text    | `fg.primary`                                                       | Headings, active labels, and important icons  |
| Secondary text  | `fg.secondary`                                                     | Body copy and supporting labels               |
| Muted text      | `fg.muted`                                                         | Descriptions, metadata, and inactive controls |
| Tertiary text   | `fg.tertiary`                                                      | Disabled and lowest-priority content          |
| Inverse text    | `fg.inverse`                                                       | Text on the primary CTA                       |
| Brand accent    | `accent.primary`                                                   | Brand marks, focus, selection, and links      |
| Accent hover    | `accent.hover`                                                     | Hovered accent elements                       |
| Soft accent     | `accent.soft`                                                      | Selected surfaces and restrained highlights   |
| Semantic states | `accent.danger`, `accent.success`, `accent.warning`, `accent.info` | Status and feedback                           |

Use readable foreground variants such as `fg.accent.readable` for accent-colored text. A viewport should have a few meaningful accent anchors, not an accent treatment on every interactive element. Semantic colors communicate state and never substitute for the brand accent.

### Atmosphere

Use `gradient.page` for the primary marketing atmosphere and `gradient.section.violet` for restrained section glows. `gradient.section.blue` may support informational or data-focused sections.

Keep gradients behind neutral content. Do not use atmospheric gradients as ordinary card, input, or button fills.

### Typography

Use semantic type recipes rather than reconstructing font size, weight, line height, and tracking independently.

| Role                       | Token                        |
| -------------------------- | ---------------------------- |
| Micro or caption           | `type.caption`               |
| Label                      | `type.label`                 |
| Compact body               | `type.body.md`               |
| Reading or marketing body  | `type.body.lg`               |
| Small heading              | `type.heading.3`             |
| Standard heading           | `type.heading.2`             |
| Large heading              | `type.heading.1`             |
| Display                    | `type.display`               |
| Code, command, or shortcut | `type.code` with `font.mono` |

Use compact body text in application UI and the larger body recipe for marketing or reading-heavy content. Step down through heading tokens at narrower widths instead of allowing awkward wraps.

### Spacing and Layout

Use the `space.*` scale for gaps and padding. Common patterns:

- Application element gap: `space.2`
- Form or card content gap: `space.3` to `space.4`
- Card padding: `space.3` to `space.4`
- Marketing card padding: `space.5` to `space.6`
- Application section gap: `space.6` to `space.8`
- Marketing section gap: `space.16` to `space.24`
- Marketing container: `page.max.width`
- Reading container: `content.max.width`

Use the named layout tokens for panels, sidebars, drawers, popovers, and modals instead of introducing local width constants.

### Shape

- Tags and small indicators: use the smallest suitable primitive radius.
- Inputs, buttons, and compact cards: `radius.sm` or `control.radius`.
- Menus, panels, and standard cards: `radius.md` or `card.radius`.
- Dialogs, marketing cards, and product mockups: up to `radius.lg`.
- Pills and circles: `radius.full` only when the form is semantically appropriate.

### Elevation

Create most hierarchy through surfaces and borders.

- Ordinary floating card: `shadow.card`
- Dialog, command palette, or menu: `shadow.overlay`
- Restrained highlighted boundary: `shadow.ring`
- Physical keyboard-key affordance only: `shadow.key`

Do not apply overlay or tactile shadows to ordinary cards and controls. Colored shadows should not define component elevation.

## Application Layout

- Use stable sidebar or compact top navigation when information architecture requires it.
- Favor aligned lists, tables, boards, split panes, and dense vertical stacks.
- Keep related controls close; separate groups with spacing or subtle boundaries.
- Let data-heavy views use available width while constraining reading-heavy text.
- Preserve predictable placement for page titles, filters, primary actions, and status.
- Use `accent.soft` or `state.selected.bg` to identify selection without flooding navigation with color.

## Marketing Layout

- Use full-bleed themed backgrounds with content constrained by `page.max.width`.
- Establish hierarchy with semantic type recipes, vertical rhythm, product imagery, and restrained atmosphere.
- Use focused two- or three-column feature grids; collapse them before cards become narrow.
- Present product UI in contained `radius.lg` mockups with subtle borders and appropriate elevation.
- Alternate composition and atmosphere rather than switching themes or adding heavy dividers without purpose.
- Keep the neutral primary CTA dominant; use the accent for links, highlights, diagrams, and supporting moments.

## Components

### Primary CTA

Use `button.primary.bg`, `button.primary.fg`, and the corresponding hover, active, shadow, and highlight tokens. Use `control.radius` and the established button size tokens. Theme overrides may invert the neutral CTA to preserve contrast on light backgrounds.

### Secondary and accent actions

Use `button.secondary.*`, `button.tertiary.*`, or `button.ghost.*` according to hierarchy. For accent emphasis without primary-action weight, use readable accent text, an accent border, or `accent.soft` rather than creating another primary variant.

### Navigation

Use `fg.muted` by default and `fg.primary` for active labels. Indicate current location with `bg.surface.raised`, `state.selected.bg`, or a restrained accent marker. Keep focus-visible state distinct from selection.

### Card and panel

Use `card.bg`, `card.border`, `card.radius`, and `card.shadow`. Remove the shadow when the card does not genuinely float. Use raised surfaces rather than stronger shadows for focused regions.

### Input

Use `input.bg`, `input.fg`, `input.border`, `input.placeholder`, and `control.radius`. Use `focus.ring.default` for keyboard focus and `input.error.border` with `focus.ring.danger` for errors. Define disabled, read-only, and autofill states without bypassing semantic tokens.

### Badge

Use `badge.bg`, `badge.fg`, and `size.badge`. Use `accent.soft` for a restrained branded badge and semantic state tokens only when the badge communicates status.

### Command Palette

Use `dialog.bg`, `dialog.shadow`, and `radius.lg`. Keep search, grouped results, selection, metadata, and shortcut labels visually connected. Use `state.selected.bg` for selection, `fg.primary` for the selected label, and `type.code` with `font.mono` for shortcuts.

Support autofocus when appropriate, arrow-key navigation, Enter to execute, Escape to dismiss, and clear focus restoration.

### Data Views

Keep rows compact but readable. Use `table.row.hover.bg` and `table.row.selected.bg` for interaction states. Align labels, metadata, status, and actions consistently. Allow horizontal scrolling when necessary rather than shrinking text excessively.

### Dialog and Menu

Use raised or overlay semantic surfaces and `shadow.overlay`. Trap focus in modal dialogs, support Escape where appropriate, and restore focus on close. Expose clear hover, keyboard focus, selected, disabled, and destructive states.

## Interaction and Motion

Use motion tokens consistently:

- Micro-interactions: `duration.fast` or `duration.normal` with `ease.standard`
- Purposeful transforms and entrances: `duration.normal` or `duration.slow` with `ease.out`
- Loading effects: the appropriate named spinner or shimmer duration

Keep transforms small, avoid delaying command execution or navigation, and honor `prefers-reduced-motion` with stable alternatives. Every interactive component should define default, hover, active, focus-visible, disabled, loading, error, and selected states where relevant.

## Responsive Behavior

- Use `space.4` page gutters on small screens and increase them as space permits.
- Use the named breakpoint tokens; do not duplicate breakpoint values locally.
- Collapse sidebars and multi-column grids before content becomes cramped.
- Step display typography down through semantic heading recipes at narrower widths.
- Let dense data views scroll horizontally rather than reducing text below `type.body.md`.
- Keep primary actions reachable without covering content or causing overflow.
- Simplify atmosphere, blur, and complex motion when they reduce performance or clarity.
- Maintain hierarchy and task order when columns become a single stack.

## Accessibility

- Meet WCAG AA contrast for text and essential controls; verify rendered theme combinations.
- Use `focus.ring.default` or the relevant semantic focus token on every interactive control.
- Keep focus distinct from selected state.
- Pair accent and semantic colors with text, icons, or shape when they communicate meaning.
- Use semantic HTML, logical headings, accessible names, and announced asynchronous states.
- Support keyboard interaction appropriate to each component pattern.
- Use at least `dimension.44` for touch targets where touch input is expected.
- Ensure the interface remains usable without blur, gradients, animation, or custom fonts.

## Implementation Workflow

1. Inspect existing tokens, components, and conventions before adding anything.
2. Use component and semantic tokens before primitives.
3. If a reusable value is missing, update `packages/tokens/src/tokens.dtcg.json` and relevant resolver overrides first.
4. Rebuild `@simple-base/tokens`; never edit generated or distribution files directly.
5. Implement interaction states, keyboard behavior, responsive layout, and accessibility with the component.
6. Render or visually inspect changes in relevant light and dark themes at narrow and wide widths.
7. Check contrast, focus, clipping, overflow, reduced motion, loading, empty, and error states before finalizing.

## Avoid

- bypassing semantic tokens with raw values;
- using the brand accent as the primary CTA fill;
- gradients inside ordinary controls or data surfaces;
- large colored areas that overpower content;
- oversized radii, diffuse shadows, and excessive glass effects;
- loose, low-density application layouts;
- decorative motion that slows task completion;
- using color as the only signal for status, focus, or selection;
- copying Linear or Raycast literally instead of maintaining this product’s resolved identity.
