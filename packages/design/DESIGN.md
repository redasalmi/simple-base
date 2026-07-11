---
name: Simple Base
description: A vibrant, professional design system for distinctive productivity tools.
colors:
  signal-lime: "#e4f222"
  obsidian-canvas: "#040506"
  midnight-page: "#08090a"
  graphite-surface: "#0f1011"
  instrument-graphite: "#111214"
  overlay-graphite: "#1b1c1e"
  border-charcoal: "#23252a"
  porcelain: "#f7f8f8"
  primary-white: "#ffffff"
  secondary-steel: "#9c9c9d"
  muted-slate: "#6a6b6c"
  ember-red: "#ff6363"
  aether-blue: "#56c2ff"
  mint-signal: "#59d499"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "64px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.08px"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.06px"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.04px"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.01px"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.04px"
  code:
    fontFamily: "Geist Mono, Berkeley Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.04px"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "20px"
  full: "999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
  20: "80px"
components:
  button-primary:
    backgroundColor: "{colors.signal-lime}"
    textColor: "{colors.midnight-page}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.instrument-graphite}"
    textColor: "{colors.primary-white}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
  input-default:
    backgroundColor: "{colors.obsidian-canvas}"
    textColor: "{colors.porcelain}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "42px"
  badge-default:
    backgroundColor: "{colors.muted-slate}"
    textColor: "{colors.secondary-steel}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 8px"
    height: "24px"
  card-default:
    backgroundColor: "{colors.graphite-surface}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.lg}"
    padding: "18px"
---

# Design System: Simple Base

## 1. Overview

**Creative North Star: "Chromatic Command Center"**

Simple Base feels like a precision instrument energized by color. Its compact structure comes from Linear; its tactile controls, luminous atmosphere, and layered depth come from Raycast. The result is professional product UI that feels alive rather than ornamental.

The component grammar stays stable while nine themes reinterpret its colors. Catppuccin, Dracula, Tokyo Night, Nord, and the Simple Base themes change the chromatic expression, never the hierarchy, geometry, interaction behavior, or density. The system explicitly rejects the anonymous dashboard styling of another generic shadcn component library.

**Key Characteristics:**

- Compact, task-focused information density
- Vibrant accents reserved for action and state
- Ambient light paired with structural surface layers
- Tactile controls with crisp focus and press feedback
- One recognizable component language across every theme

## 2. Colors

The default palette is an obsidian instrument panel punctuated by rare, high-energy signals; community themes remap semantic roles without weakening their hierarchy.

### Primary

- **Signal Lime:** The default primary action, selection, and focus signal. Its scarcity creates authority.

### Secondary

- **Aether Blue:** Informational state and restrained atmospheric light; never a competing primary action.
- **Mint Signal:** Success and completion feedback, kept semantic rather than decorative.

### Tertiary

- **Ember Red:** Destructive actions and error feedback. Use only where consequence or failure must be unmistakable.

### Neutral

- **Obsidian Canvas:** The deepest default-theme ground.
- **Midnight Page:** The page layer immediately above the canvas.
- **Graphite Surface:** The default card and content surface.
- **Instrument Graphite:** Raised controls and emphasized surfaces.
- **Overlay Graphite:** Menus, tooltips, and overlay-adjacent surfaces.
- **Porcelain:** Strong readable text without the glare of relying on pure white everywhere.
- **Secondary Steel:** Supporting text and inactive controls.
- **Muted Slate:** Metadata and intentionally de-emphasized content; never use it where WCAG 2.2 AA body-text contrast would fail.

**The Semantic Theme Rule.** Every theme must map canvas, page, surface, text, border, accent, danger, information, and success roles. Never style a component against a theme name directly.

**The Rare Signal Rule.** Accent color belongs to primary actions, current selection, focus, and semantic state. It is not surface decoration.

## 3. Typography

**Display Font:** Inter (with `ui-sans-serif` and `system-ui` fallbacks)  
**Body Font:** Inter (with `ui-sans-serif` and `system-ui` fallbacks)  
**Label/Mono Font:** Geist Mono or Berkeley Mono (with `ui-monospace` fallback)

**Character:** A single precise sans keeps product interfaces coherent from data labels to headings. Monospace marks commands, keyboard shortcuts, token values, and technical metadata without turning the entire interface into a terminal.

### Hierarchy

- **Display** (700, 64px, 1): Reserved for showcase moments, never routine application screens.
- **Headline** (700, 32px, 1.12): Page and major panel headings.
- **Title** (700, 24px, 1.15): Section and component-group titles.
- **Body** (400, 14px, 1.55): Default product copy; prose is capped at 65–75ch.
- **Label** (600, 12px, 0.04px): Controls and compact metadata. Uppercase is reserved for genuinely categorical micro-labels.
- **Code** (400, 12px, 1.55): Commands, tokens, shortcuts, and technical values.

**The Product Scale Rule.** Application typography uses fixed sizes and a tight hierarchy. Fluid display type belongs only to the design-system showcase, not task-focused product screens.

**The Two-Register Rule.** Headings contract slightly; metadata may breathe slightly. Never apply wide tracking to large headings.

## 4. Elevation

Simple Base uses a hybrid of structural layering and ambient luminosity. Tonal surface steps establish hierarchy first; monochromatic shadow stacks add physical depth; tightly controlled accent glows identify meaningful action or state. Blur is reserved for overlays and deliberate showcase atmosphere, not used as a universal card treatment.

### Shadow Vocabulary

- **Card:** `rgba(0, 0, 0, 0.4) 0 2px 4px` — quiet separation for ordinary content surfaces.
- **Key:** `rgba(0, 0, 0, 0.4) 0 1.5px 0.5px 2.5px, rgb(0, 0, 0) 0 0 0.5px 1px, rgba(0, 0, 0, 0.25) 0 2px 1px 1px inset, rgba(255, 255, 255, 0.18) 0 1px 1px 1px inset` — tactile depth for pressable controls.
- **Ring:** `rgba(255, 255, 255, 0.05) 0 1px 0 inset, rgba(255, 255, 255, 0.16) 0 0 0 1px, rgba(0, 0, 0, 0.2) 0 -1px 0 inset` — crisp separation for tertiary controls and selected surfaces.
- **Overlay:** `rgba(0, 0, 0, 0.4) 0 4px 40px 8px` — strong separation for dialogs and floating layers.

**The Layer Before Glow Rule.** A component must remain legible through surface, border, and hierarchy before any glow is added. Glow reinforces importance; it never creates structure.

**The Monochrome Shadow Rule.** Shadows remain black or white. Chromatic light is a restrained companion reserved for primary and semantic states.

## 5. Components

Components are vibrant and confident, grounded by compact geometry and consistent interaction states.

### Buttons

- **Shape:** Compact, gently curved controls (8px radius) with 40px default height and 16px inline padding.
- **Primary:** Signal Lime action surface with Midnight Page text, a subtle top highlight, tactile key shadow, and restrained lime aura.
- **Hover / Focus:** Hover lifts by 1px and strengthens the relevant shadow. Focus remains visibly ringed in the active theme accent. Active feedback must feel immediate; reduced motion removes translation.
- **Secondary / Tertiary:** Secondary buttons use a raised neutral surface and key depth. Tertiary buttons use a translucent surface and ring. Ghost actions recede until hover.
- **Danger:** Ember Red is exclusive to destructive action and consequence.

### Chips

- **Style:** Compact 24px badges use 6px corners, 8px inline padding, 12px semibold type, and role-specific tonal fills.
- **State:** Command badges use overlay depth; success and danger badges combine readable semantic text with a subtle inset ring. Never rely on fill color alone.

### Cards / Containers

- **Corner Style:** 12px for standard cards; 16px for larger panels and dialogs.
- **Background:** Default cards use Graphite Surface. Raised and highlighted variants step through semantic surfaces rather than choosing arbitrary grays.
- **Shadow Strategy:** Card shadow at rest; a 2px lift on hover only when the entire card is interactive.
- **Border:** One-pixel inset separation using the theme border role.
- **Internal Padding:** 18px for compact cards, 20–24px for panels.

### Inputs / Fields

- **Style:** 42px controls with an 8px radius, 14px inline padding, inset border, and theme-aware canvas fill.
- **Focus:** Accent inset border plus a 3px low-opacity aura. Keyboard focus must remain visible in every theme.
- **Error / Disabled:** Error uses both Ember Red treatment and explicit message or icon. Disabled state reduces emphasis and retains readable content.

### Navigation

- **Style:** Compact 30px navigation items use 8px corners, 12px bold labels, and neutral translucent surfaces. Hover increases contrast; active state uses the theme accent sparingly and must not depend on color alone.
- **Responsive behavior:** Navigation wraps or collapses structurally. Typography does not fluidly shrink to force items into place.

### Dialogs and Overlays

- Use 16px corners, a distinct overlay surface, and the overlay shadow. Dialogs require a labelled title, description, focus management, Escape behavior, and focus restoration. Blur may support separation but cannot substitute for backdrop contrast.

**The Complete State Rule.** Every public interactive component ships default, hover, focus-visible, active, disabled, loading, and error states wherever the state is applicable.

**The Theme-Invariant Grammar Rule.** Theme changes may alter semantic token values, but never component geometry, hierarchy, spacing, or behavior.

## 6. Do's and Don'ts

### Do:

- **Do** build every component from semantic `--sb-*` roles so all nine themes remain coherent.
- **Do** preserve Linear's compact precision and Raycast's tactile depth without copying either product wholesale.
- **Do** reserve Signal Lime and each theme's primary accent for action, selection, and focus.
- **Do** meet WCAG 2.2 AA in every theme, including visible keyboard focus, reduced motion, and non-color state cues.
- **Do** use the 4px spacing foundation, 8px control radius, 12px card radius, and 16px dialog radius consistently.
- **Do** keep product transitions responsive, normally 160–200ms, and animate transform, opacity, color, background, or shadow intentionally.

### Don't:

- **Don't** make Simple Base look like another generic shadcn component library through anonymous card grids, default-looking controls, or interchangeable dashboard styling.
- **Don't** let community themes change component structure or behavior; they set design-system colors only.
- **Don't** spread bright accent color across inactive surfaces or use multiple accents as competing calls to action.
- **Don't** use glassmorphism as the default card language. Blur belongs to overlays and rare atmospheric moments.
- **Don't** nest cards when spacing, grouping, or a divider communicates the relationship more clearly.
- **Don't** invent arbitrary radii, spacing, z-index values, or shadow stacks outside the token system.
- **Don't** sacrifice contrast for muted aesthetics or communicate error, success, selection, or focus through color alone.
