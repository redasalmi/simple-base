---
name: raycast
description: Designs and implements polished dark interfaces inspired by Raycast, using near-black layered surfaces, compressed typography, atmospheric gradients, tactile controls, and restrained red accents. Use for command palettes, launchers, developer tools, productivity apps, and dark product marketing pages.
---

# Raycast-Inspired Interface Design

Use this reference to design or implement interfaces with Raycast’s dark, tactile, command-oriented aesthetic. Treat it as an implementation guide inspired by Raycast, not as official brand documentation.

## Visual Direction

Build the interface on a near-black canvas. Create depth with slightly lighter neutral surfaces, thin highlight rings, monochrome shadow stacks, and occasional frosted-glass effects. Use low-opacity blue or violet radial gradients as atmospheric light behind content—not as opaque section fills.

The result should feel:

- dark, focused, and keyboard-centric;
- tactile without becoming skeuomorphic;
- polished through light, shadow, and motion rather than color variety;
- spacious in marketing layouts and compact inside product UI.

## Core Tokens

### Color

| Purpose             | Value                                 | Guidance                                     |
| ------------------- | ------------------------------------- | -------------------------------------------- |
| Canvas              | `#040506`                             | Page background and deepest layer            |
| Base surface        | `#07080a`                             | Cards, navigation, and section surfaces      |
| Raised surface      | `#111214`                             | Elevated cards, menus, and dialogs           |
| Overlay surface     | `#1b1c1e`                             | Badges, tooltips, and high layers            |
| Strong border       | `#363739`                             | Defined boundaries and dividers              |
| Subtle border       | `#454647` or `rgba(255,255,255,0.06)` | Quiet boundaries and control outlines        |
| Primary text        | `#ffffff`                             | Headings, active labels, and important icons |
| Secondary text      | `#9c9c9d`                             | Body copy, navigation, and supporting labels |
| Muted text          | `#6a6b6c`                             | Metadata, disabled states, and quiet icons   |
| Primary action      | `#e6e6e6`                             | High-contrast CTA background                 |
| Primary action text | `#2f3031`                             | Text and icons on the primary action         |
| Brand accent        | `#ff6363`                             | Logo, small highlights, and selected signals |
| Success             | `#59d499`                             | Positive status only                         |
| Informational       | `#56c2ff`                             | Informational status or illustration detail  |

Use red sparingly. It should not replace the near-white primary action or cover large surfaces. Pair semantic colors with text, icons, or shape rather than relying on color alone.

### Atmospheric Gradients

Use gradients as low-opacity light sources behind otherwise neutral content.

```css
--gradient-blue-atmosphere: radial-gradient(
  84.6% 73.49% at 50% 26.51%,
  rgba(4, 63, 150, 0.7),
  rgba(6, 18, 37, 0.25)
);

--gradient-violet-atmosphere: radial-gradient(
  86.88% 75.47% at 50% 24.53%,
  rgba(82, 48, 145, 0.7),
  rgba(26, 11, 51, 0.14)
);
```

Keep content surfaces transparent or within the neutral surface stack. Do not use these gradients as button fills, card fills, or substitutes for hierarchy.

### Typography

Use `Inter`, falling back to the system sans-serif stack. Use `Geist Mono`, falling back to `JetBrains Mono`, `IBM Plex Mono`, or the system monospace stack, for commands, shortcuts, versions, and technical data.

| Role          | Size   | Weight | Line height | Tracking  |
| ------------- | ------ | ------ | ----------- | --------- |
| Caption       | `11px` | 500    | 1.45        | `0.8px`   |
| Body          | `16px` | 400    | 1.5         | `0.1px`   |
| Subheading    | `18px` | 400    | 1.4         | `0.06px`  |
| Small heading | `24px` | 600    | 1.33        | `-0.05px` |
| Heading       | `32px` | 600    | 1.2         | `-0.06px` |
| Large heading | `56px` | 600    | 1.1         | `-0.11px` |
| Display       | `64px` | 600    | 1           | `-0.13px` |

Use tighter tracking for headings and positive tracking for small labels. Use monospace at `10–14px`, weight `300–500`, with slightly positive tracking. Do not force display typography into compact product UI.

### Spacing and Shape

Use an `8px` spacing base. Prefer `8`, `16`, `24`, `32`, `48`, `64`, `80`, and `96px`.

- Product UI element gap: `8–16px`
- Card padding: `24px`
- Marketing section gap: approximately `80px`
- Control radius: `8px`
- Card radius: `11–16px`
- Large card or feature container: up to `20px`
- Badge radius: `6px`
- Pill or circular control: fully rounded only when its form requires it
- Marketing content max-width: approximately `1200px`

Avoid large soft radii on ordinary cards. Reserve pills for keys, compact CTAs, and circular icon controls.

## Depth and Material

Prefer layered monochrome shadows over strong surface-color contrast.

### Tactile control

Use this stack selectively for keyboard keys or controls intended to feel physically pressable:

```css
box-shadow:
  rgba(0, 0, 0, 0.4) 0 1.5px 0.5px 2.5px,
  #000 0 0 0.5px 1px,
  rgba(0, 0, 0, 0.25) 0 2px 1px 1px inset,
  rgba(255, 255, 255, 0.2) 0 1px 1px 1px inset;
```

Do not apply this treatment to every button or card.

### Highlight ring

For selected or featured dark cards, combine a faint top highlight with a restrained outer ring:

```css
box-shadow:
  rgba(255, 255, 255, 0.05) 0 1px 0 inset,
  rgba(255, 255, 255, 0.25) 0 0 0 1px,
  rgba(0, 0, 0, 0.2) 0 -1px 0 inset;
```

### Glass surface

For product mockups or floating app windows, use a dark translucent surface, `1px solid rgba(255,255,255,0.1)`, `12px` radius, and restrained backdrop blur. Ensure text remains readable when blur is unsupported.

## Layout

For product interfaces:

- Make keyboard navigation and command search central to the hierarchy.
- Use compact rows, grouped results, and clear selected states.
- Align icons, labels, metadata, and shortcuts consistently.
- Keep search or command input visually integrated with the surrounding panel.
- Place secondary metadata and shortcuts at the trailing edge.

For marketing interfaces:

- Use full-bleed dark sections with centered constrained content.
- Separate sections through vertical rhythm and atmosphere shifts rather than light backgrounds or heavy dividers.
- Use two- or three-column feature grids where content supports comparison.
- Present product UI in contained dark mockups rather than decorating every section.

For responsive behavior:

- Collapse multi-column grids before cards become narrow or text wraps excessively.
- Reduce display type to the next smaller role at narrower widths.
- Preserve at least `16px` page gutters on small screens and increase them as space permits.
- Let dense command results or tables scroll when necessary instead of shrinking text below readable sizes.
- Simplify or collapse fixed navigation while keeping the primary action reachable.
- Disable or reduce expensive blur and atmosphere effects where performance or readability suffers.

## Components

### Primary action

Use `#e6e6e6` fill, `#2f3031` text, `8px` radius, and medium-weight Inter. Define hover, active, focus-visible, loading, and disabled states. Keep pure white for text and highlights rather than the button fill.

### Ghost action and navigation link

Use a transparent background with `#9c9c9d` text. Raise text toward `#ffffff` on hover or active state. Add a subtle surface or ring when the control needs a larger interaction target.

### Command or search input

Use `rgba(255,255,255,0.05)` fill, light text, a subtle white border, `8px` radius, and approximately `8px 12px` padding. Keep placeholders muted but legible. Use an unmistakable focus-visible ring.

### Result row

Use a transparent default state and a slightly lighter neutral surface for hover or selection. Pair the selected state with strong text and, if useful, a small red marker. Show shortcuts in muted monospace text. Ensure selection is visible without color alone.

### Feature card

Use a transparent or base-surface background, `16px` radius, `24px` padding, and a faint border. Avoid a conventional diffuse drop shadow. Use a highlight ring only for selected or featured cards.

### Badge

Use `#1b1c1e` fill, light text, `6px` radius, compact horizontal padding, and positive tracking. Reserve semantic colors for badges that communicate actual status.

### Dialog or command palette

Use `#111214` or `#07080a`, a subtle highlight border, and a restrained black shadow. Keep the search field, results, and footer shortcuts visually connected. Trap focus where appropriate and support dismissal with Escape.

## Interaction and Motion

Every interactive component should define default, hover, active, focus-visible, disabled, loading, and selected states where relevant.

- Use approximately `200ms ease` for color, opacity, border, and shadow transitions.
- Use up to `400ms` for purposeful transforms or entrances.
- For entrances, a fast-attack, slow-settle curve such as `cubic-bezier(0.23, 1, 0.32, 1)` can reinforce the snappy feel.
- Keep movement functional and generally below `700ms`.
- Avoid motion that delays command execution or obscures keyboard selection.
- Honor `prefers-reduced-motion` and provide a stable non-animated state.

## Accessibility

- Meet WCAG AA contrast for text and essential controls; verify actual rendered combinations.
- Keep focus indicators visible against every neutral surface and gradient backdrop.
- Support expected keyboard behavior for menus, lists, dialogs, tabs, and command palettes.
- Pair red, green, and blue states with labels, icons, or shapes.
- Use semantic elements, accessible names, logical headings, and announced loading or error states.
- Target at least `44px` touch areas where touch input is expected, even if the visible control is compact.
- Ensure text and controls remain usable when blur, gradients, or animation are unavailable.

## Implementation Rules

1. Inspect and reuse the project’s existing tokens, components, and interaction patterns first.
2. Map this reference onto the project’s conventions instead of creating a parallel design system.
3. Establish neutral surface hierarchy before introducing gradients, glass, or accent color.
4. Reserve tactile shadows for controls whose interaction benefits from physical affordance.
5. Implement keyboard behavior, responsive layout, and all relevant states with each component.
6. Check narrow and wide layouts, keyboard navigation, reduced motion, contrast, clipping, and effect fallbacks before finalizing.

## Avoid

- red primary buttons or large red surfaces;
- pure-white button fills when `#e6e6e6` provides the intended contrast;
- opaque colored section backgrounds;
- gradients inside ordinary cards and controls;
- colored drop shadows or neon glows;
- positive tracking on large headings;
- excessive blur, bevels, or tactile shadows;
- horizontal dividers as the main separator between marketing sections;
- sacrificing keyboard usability or readability for visual effects.
