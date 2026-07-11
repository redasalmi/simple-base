---
target: packages/design
total_score: 23
p0_count: 0
p1_count: 3
timestamp: 2026-07-11T07-29-26Z
slug: packages-design
---
⚠️ DEGRADED: single-context (no sub-agent or browser automation tool exposed)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|------:|-----------|
| 1 | Visibility of System Status | 2 | States are displayed, but most controls are static previews with no real feedback. |
| 2 | Match System / Real World | 3 | Familiar product vocabulary and native elements are used consistently. |
| 3 | User Control and Freedom | 2 | Placeholder links and inert overlay examples do not demonstrate escape, undo, or reset behavior. |
| 4 | Consistency and Standards | 3 | Strong token vocabulary, but hardcoded translucent values bypass semantic theme roles. |
| 5 | Error Prevention | 2 | Error visuals exist, but validation and destructive safeguards are mostly illustrative. |
| 6 | Recognition Rather Than Recall | 2 | A 33-link ungrouped component index overloads scanning. |
| 7 | Flexibility and Efficiency | 2 | Shortcut styling is present, but documented keyboard behavior is not implemented. |
| 8 | Aesthetic and Minimalist Design | 2 | Distinctive atmosphere, but the 2,925-line all-components page has repetitive panels and weak prioritization. |
| 9 | Error Recovery | 2 | Error appearance is documented without a complete recovery pattern. |
| 10 | Help and Documentation | 3 | Dedicated docs and token pages exist, but guidance is shallow relative to the component breadth. |
| **Total** | | **23/40** | **Acceptable — significant improvements needed** |

## Anti-Patterns Verdict

**LLM assessment:** The system does not look like stock shadcn. The obsidian surfaces, lime signal, key shadows, and Linear/Raycast influence create a recognizable direction. The page composition still shows AI-catalog tendencies: one giant sequence of similarly framed showcases, repeated uppercase kickers, decorative command-center status language, and too many components presented with equal visual weight.

**Deterministic scan:** Nine warnings across `docs.html`, `index.html`, and `tokens.html`: three overused-font, three single-font, and three em-dash-overuse warnings. The font warnings are low-confidence for this product system because Inter is an intentional Linear/Raycast-aligned product choice and `DESIGN.md` explicitly permits one family. The `tokens.html` em-dash count is largely a false positive caused by CSS custom-property `--` syntax. The prose em dashes in `docs.html` and `index.html` are worth a copy pass, but are not a structural issue.

**Visual overlays:** No browser automation tool is exposed, so no reliable user-visible overlay or rendered multi-theme inspection was available.

## Overall Impression

The visual identity is already stronger than the average component library. The biggest opportunity is to turn an impressive static catalog into a trustworthy design-system reference: grouped navigation, real behavior, complete states, and theme-safe semantics.

## What's Working

1. **Recognizable visual language:** Signal Lime, layered obsidian surfaces, compact radii, and tactile shadows create a cohesive identity that is not generic shadcn.
2. **Solid token foundation:** Color, typography, spacing, radii, elevation, motion, breakpoints, and z-index roles are centralized and map across nine themes.
3. **Broad semantic and accessibility intent:** Native elements, skip links, labels, `aria-*` examples, reduced motion, error states, and documentation provide a credible base.

## Priority Issues

### [P1] The component index is broken and cognitively overloaded
- **Why it matters:** `.s .sb-component-index` in `css/foundations.css:1696` appears to be a typo, so the index container misses its intended flex layout, spacing, background, and ring. Even when fixed, 33 equal-weight links exceed useful scanning limits.
- **Fix:** Correct the selector, group links into 5–7 component families, add a visible current group, and use progressive disclosure or search for the full list.
- **Suggested command:** `/impeccable layout packages/design`

### [P1] The showcase promises interactive components but mostly demonstrates inert pictures
- **Why it matters:** Buttons use `cursor: default`; 14 links use `href="#"`; menus, tabs, overlays, and selection controls visually imply behavior without proving keyboard navigation, focus management, dismissal, or state changes. Public adopters cannot judge production readiness.
- **Fix:** Separate static anatomy examples from interactive demos. Make representative tabs, dialog, menu, tooltip, and selection examples actually work with keyboard and visible state. Document event and accessibility contracts.
- **Suggested command:** `/impeccable harden packages/design`

### [P1] Focus and theme behavior are not systematically demonstrated
- **Why it matters:** Only two `:focus-visible` selectors are present across the design CSS while dozens of interactive examples exist. Many components use hardcoded white/black translucent fills and lime/red glow values, risking uneven results in light and community themes.
- **Fix:** Define shared focus-visible behavior for every interactive primitive; replace component-level hardcoded translucent colors with semantic state/elevation tokens; validate all nine themes against WCAG 2.2 AA.
- **Suggested command:** `/impeccable audit packages/design`

### [P2] The all-components page has catalog fatigue
- **Why it matters:** `index.html` is 2,925 lines and presents foundations, data, feedback, navigation, forms, overlays, selections, media, states, and primitives in one continuous card-heavy page. Equal panel treatment makes important primitives indistinguishable from niche examples.
- **Fix:** Establish an overview page, family-level navigation, and dedicated detail pages or progressive sections. Lead with foundations and canonical components; move exhaustive state matrices deeper.
- **Suggested command:** `/impeccable distill packages/design`

### [P2] Documentation depth does not match component breadth
- **Why it matters:** `docs.html` explains broad variants and a few accessibility rules but does not define anatomy, state matrices, keyboard contracts, theme constraints, composition guidance, or implementation examples for the showcased set.
- **Fix:** Add a repeatable component documentation template: purpose, anatomy, variants, states, behavior, keyboard interaction, accessibility, theming, and usage examples.
- **Suggested command:** `/impeccable clarify packages/design`

## Persona Red Flags

**Alex (Power User):** The page advertises command-center behavior and keyboard shortcuts, but shortcut visuals are not backed by discoverable functionality. Thirty-three ungrouped anchors are slower than component search or family navigation. Placeholder links interrupt efficient browsing.

**Sam (Accessibility-Dependent User):** The skip link and semantic markup help, but focus-visible coverage is sparse. Static menu, tab, dialog, and selection examples do not establish keyboard behavior or announced state changes. Theme contrast has not been verified across all nine palettes.

**Public design-system adopter:** The visual direction is compelling, but the adopter cannot distinguish production contracts from decorative examples. Missing behavior and implementation guidance creates uncertainty about what can be safely reused.

## Minor Observations

- `h1` uses `letter-spacing: -0.075em`, tighter than the new `DESIGN.md` floor and likely cramped at smaller widths.
- Repeated uppercase kickers and system-status decorations risk becoming a template tic rather than a meaningful product convention.
- Hardcoded default-theme hex values in the system documentation preview can become misleading when another theme is active.
- Inter warnings from the detector should not trigger a font replacement by themselves; product coherence is more important than novelty.
- The reduced-motion rule covers the preview cursor and live dot, but the broader transition system should also be checked.

## Questions to Consider

- Should the primary experience be a browsable documentation site or a single visual stress-test page?
- Which five components must prove production-grade behavior first?
- Should community themes preserve only semantic roles, or also tune elevation and translucent state values for their own luminance?
- What evidence would make a public adopter trust a component without reading its source?
