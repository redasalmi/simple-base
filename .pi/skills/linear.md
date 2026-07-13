---
name: linear
description: Designs and implements focused dark interfaces inspired by Linear, using layered near-black surfaces, compact typography, restrained borders, and selective lime accents. Use for product dashboards, developer tools, issue trackers, and other dense application UIs that should follow this visual direction.
---

# Linear-Inspired Interface Design

Use this reference to design or implement interfaces with Linear’s dark, compact, command-center aesthetic. Treat it as an implementation guide inspired by Linear, not as official brand documentation.

## Visual Direction

Build a near-black interface with hierarchy created through subtly lighter surfaces, restrained borders, and precise spacing. Keep most of the UI neutral. Reserve vivid lime for the most important action or active state; use blue only for secondary informational accents.

The result should feel:

- dark, focused, and technical;
- compact without becoming cramped;
- layered without relying on dramatic shadows;
- precise, with clear hierarchy and minimal decoration.

## Core Tokens

### Color

| Purpose              | Value     | Guidance                                       |
| -------------------- | --------- | ---------------------------------------------- |
| Canvas               | `#08090a` | Page and app background                        |
| Surface              | `#0f1011` | Default cards and panels                       |
| Raised surface       | `#161718` | Focused or elevated regions                    |
| Border               | `#23252a` | Standard boundaries and input outlines         |
| Subtle border        | `#323334` | Dividers and low-emphasis boundaries           |
| Control surface      | `#383b3f` | Secondary controls, badges, and filled inputs  |
| Primary text         | `#f7f8f8` | Headings, active labels, and important icons   |
| Secondary text       | `#d0d6e0` | Supporting copy and secondary labels           |
| Muted text           | `#8a8f98` | Descriptions and inactive navigation           |
| Tertiary text        | `#62666d` | Metadata and timestamps                        |
| Primary action       | `#e4f222` | One dominant CTA, focus, or selected state     |
| Informational accent | `#5e6ad2` | Charts, illustrations, or secondary highlights |
| Success              | `#27a644` | Positive status and completion                 |
| Danger               | `#eb5757` | Errors and destructive actions                 |

Do not spread lime across decorative elements. If several actions compete for attention, keep only the dominant action lime and render the rest as neutral or ghost controls.

### Typography

Use `Inter Variable`, falling back to `Inter` and then the system sans-serif stack. Use `Berkeley Mono`, falling back to `IBM Plex Mono` or the system monospace stack, for code and technical data.

| Role          | Size   | Weight | Line height | Tracking  |
| ------------- | ------ | ------ | ----------- | --------- |
| Caption       | `10px` | 400    | 1.4         | `-0.1px`  |
| Body          | `14px` | 400    | 1.4         | `-0.13px` |
| Label         | `13px` | 510    | 1.4         | `-0.11px` |
| Heading       | `24px` | 590    | 1.33        | `-0.22px` |
| Large heading | `48px` | 590    | 1.2         | `-0.22px` |
| Display       | `72px` | 590    | 1           | `-0.22px` |

Prefer tight, restrained headings over oversized marketing typography inside product UI. Use large display sizes only where the layout has enough room.

### Spacing and Shape

Use a `4px` spacing base. Prefer `4`, `8`, `12`, `16`, `24`, `32`, `48`, and `64px`; introduce intermediate values only when required by the existing system.

- Element gap: `8px`
- Card padding: `12px`
- Section gap: `24px` in application UI
- Default radius: `6px`
- Small tags: `2px`
- Badges: `4px`
- Nested or prominent containers: up to `12px`
- Pills: fully rounded only when the control’s meaning calls for it

Avoid large, soft radii on ordinary cards and controls.

### Elevation

Prefer surface contrast and thin borders over diffuse shadows.

```css
--shadow-card: rgba(0, 0, 0, 0.4) 0 2px 4px;
--shadow-inset-border: rgb(35, 37, 42) 0 0 0 1px inset;
--shadow-overlay: rgba(8, 9, 10, 0.6) 0 4px 32px;
```

Use the overlay shadow only for menus, dialogs, or other floating layers. Do not add colored glows or broad decorative shadows.

## Layout

For application interfaces:

- Use a stable sidebar or compact top navigation when navigation depth requires it.
- Organize content into dense vertical stacks, lists, and restrained grids.
- Keep related controls close and separate groups with spacing or subtle dividers.
- Constrain reading-heavy content; let tables, boards, and timelines use available width.
- Preserve alignment across headings, labels, controls, and data columns.

For responsive behavior:

- Collapse or move the sidebar behind navigation at narrow widths.
- Reduce multi-column layouts to one column before compressing content excessively.
- Preserve at least `12px` page gutters on small screens and increase them to `24px` or more when space permits.
- Allow tables and dense data views to scroll horizontally rather than shrinking text below readable sizes.
- Replace display typography with the next smaller role when it would wrap awkwardly.
- Keep primary actions visible without covering content or forcing horizontal overflow.

## Components

### Primary action

Use `#e4f222` fill, `#08090a` text, `6px` radius, and medium-weight Inter. Provide hover, active, focus-visible, loading, and disabled states. Darken or desaturate slightly for hover/active feedback rather than introducing another accent.

### Secondary and ghost actions

Use transparent or neutral fills with `#d0d6e0` text. On hover, raise text toward `#f7f8f8` and introduce a subtle surface or border. Keep tertiary text actions visually quieter than secondary buttons.

### Navigation item

Use `#8a8f98` text by default and `#f7f8f8` for the active label. Indicate active state with a subtle surface, a restrained lime marker, or both; do not fill every selected item with lime.

### Card or panel

Use `#0f1011`, a `1px` subtle boundary where needed, `6px` radius, and `12px` padding. Use `#161718` for elevated or focused regions. Nested content may return to `#08090a` to reinforce depth.

### Input

Use a transparent or dark-neutral background, `#f7f8f8` text, `#23252a` border, `6px` radius, and approximately `10–12px` vertical by `12–14px` horizontal padding. Use muted text for placeholders, but maintain sufficient contrast. Show focus with a visible neutral or lime ring that does not depend on color alone.

### Badge

Use `#383b3f` fill, `#8a8f98` or `#d0d6e0` text, `4px` radius, and compact horizontal padding. Reserve semantic colors for badges that communicate status, not category decoration.

### Dialog and menu

Use `#161718` or `#0f1011`, a subtle border, and the overlay shadow. Keep menus compact, clearly highlight keyboard focus, and expose shortcuts with muted monospace labels.

## Interaction and Motion

Every interactive component should define:

- default, hover, active, focus-visible, and disabled states;
- selected or current state where relevant;
- loading and error states for asynchronous controls;
- keyboard behavior consistent with the control type.

Keep transitions short and functional, generally `120–200ms`. Animate opacity, color, border color, or small transforms. Avoid ornamental motion and honor `prefers-reduced-motion`.

## Accessibility

- Meet WCAG AA contrast for text and essential controls; verify combinations rather than assuming token names are sufficient.
- Do not use lime, green, or red as the only status indicator; pair color with text, an icon, or shape.
- Keep focus indicators visible on every dark surface.
- Preserve semantic HTML, logical heading order, labels, and keyboard navigation.
- Target at least `44px` touch areas where the interface is expected to support touch, even when the visible control is compact.
- Do not reduce body text below the defined `14px` role merely to fit more content.

## Implementation Rules

1. Inspect and reuse the project’s existing tokens and components before adding new ones.
2. Map this reference onto the project’s naming conventions instead of creating a parallel design system.
3. Establish canvas, surface, text, and border hierarchy before adding accent color.
4. Implement all relevant states and responsive behavior with the component.
5. Check the result at narrow and wide widths, with keyboard navigation and reduced motion enabled.
6. If visual rendering is available, inspect contrast, density, clipping, alignment, and hierarchy before finalizing.

## Avoid

- light page backgrounds or alternating light sections;
- multiple bright accent colors competing for attention;
- decorative gradients across major surfaces;
- large amounts of empty space in product workflows;
- broad, soft shadows as the primary elevation mechanism;
- excessive rounding that makes the interface feel playful;
- hard-coded one-off values when an existing project token is suitable;
- sacrificing readability or touch accessibility for visual density.
