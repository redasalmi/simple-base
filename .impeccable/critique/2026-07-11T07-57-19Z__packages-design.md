---
target: packages/design
total_score: 30
p0_count: 0
p1_count: 1
timestamp: 2026-07-11T07-57-19Z
slug: packages-design
---
⚠️ DEGRADED: single-context (no sub-agent or browser automation tool exposed)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|------:|-----------|
| 1 | Visibility of System Status | 3 | Theme and tab state are visible; most component behavior remains illustrative. |
| 2 | Match System / Real World | 3 | Familiar controls and product terminology remain strong. |
| 3 | User Control and Freedom | 3 | Navigation is direct; runnable overlay escape and focus restoration still belong to the later implementation layer. |
| 4 | Consistency and Standards | 4 | Five canonical families, semantic tokens, and shared production-contract structure are cohesive. |
| 5 | Error Prevention | 3 | State and resilience requirements are present, but many are generic rather than component-specific. |
| 6 | Recognition Rather Than Recall | 4 | The compact component index and family ownership make the system easy to browse. |
| 7 | Flexibility and Efficiency | 3 | Direct family navigation and keyboard tabs work; long family pages lack a local component index. |
| 8 | Aesthetic and Minimalist Design | 3 | Visual identity remains strong; repeated contract language adds hidden documentation bulk. |
| 9 | Error Recovery | 2 | Recovery expectations are documented but not concretely specified for every relevant component. |
| 10 | Help and Documentation | 2 | All 33 components have contracts, but much of the text is boilerplate and not sufficient as public API guidance. |
| **Total** | | **30/40** | **Good — structure is ready; documentation substance is not** |

## Anti-Patterns Verdict

**LLM assessment:** The visual design still avoids generic shadcn styling, and the information architecture is materially better. The new AI tell is textual rather than visual: 33 contracts repeat phrases such as “Use [Component] only for its named product role” and the same state, accessibility, theming, and resilience paragraphs. That reads generated and does not teach an adopter what is unique about each component.

**Deterministic scan:** Twenty-three warnings: nine overused-font, nine single-font, and five em-dash warnings. Font findings remain accepted exceptions because Inter plus a mono register is an intentional product-system decision. Em-dash findings on family pages are largely false positives from repeated `--sb-*` token syntax inside contracts; `tokens.html` is dominated by CSS custom-property syntax. The layout-scoped detector is clean.

**Visual overlays:** Browser automation is unavailable, so no rendered overlay or visual-regression evidence is available.

## Overall Impression

The architecture now matches the chosen direction: each family owns its examples, and `components.html` is an index. The remaining gap is depth. Simple Base currently has complete-looking documentation containers filled with incomplete generic guidance. Before Solid implementation, the contracts must become precise enough to drive implementation without interpretation.

## What's Working

1. **Canonical ownership is solved:** Foundations has 6 panels, Forms 10, Navigation 4, Feedback 7, and Overlays 6; the component index contains no duplicated panels.
2. **All 33 components are covered:** Every component has a production-contract disclosure with the same six review dimensions.
3. **Navigation is efficient:** Overview → component index → canonical family is clear, with valid internal links and no placeholder destinations.
4. **Semantic state migration has started:** Repeated hover, active, disabled, error, success, and information values now use semantic state tokens.

## Priority Issues

### [P1] Production contracts are structurally complete but substantively generic
- **Why it matters:** Public adopters and the later Solid implementation need exact behavior. “Use Forms only for its named product role” and “ship every applicable state” do not define anatomy, applicable states, events, controlled/uncontrolled behavior, focus rules, or edge cases.
- **Fix:** Rewrite each contract with component-specific content. State exactly which states apply, which DOM primitive is required, keyboard keys, focus destination, dismissal behavior, ARIA relationships, overflow policy, and theme roles. Remove dimensions that are genuinely not applicable instead of repeating them.
- **Suggested command:** `/impeccable clarify packages/design`

### [P2] Long family pages need local wayfinding
- **Why it matters:** `forms.html` contains 10 full component panels. Users must scroll or use browser Find to reach Select, Combobox, or Switch.
- **Fix:** Add a compact sticky or in-flow family index linked to local component IDs, grouped when a family exceeds six components. Preserve the global four-item navigation separately.
- **Suggested command:** `/impeccable layout packages/design`

### [P2] Semantic color migration is incomplete
- **Why it matters:** Common state fills are tokenized, but 313 raw color/alpha occurrences remain across showcase CSS. Many are legitimate shadows or atmosphere; others still encode reusable rings, glass surfaces, and accent glows directly.
- **Fix:** Classify remaining values rather than replacing blindly. Promote values reused three or more times into semantic surface, ring, glow, or backdrop tokens. Keep unique illustrative atmosphere local.
- **Suggested command:** `/impeccable colorize packages/design`

### [P2] Documentation describes visual examples, not implementation boundaries
- **Why it matters:** The design package should tell Solid work what belongs in styling versus behavior. For example, Dialog needs explicit trigger ownership, portal expectations, focus trap, Escape behavior, outside-click policy, and focus restoration.
- **Fix:** Add an “Implementation boundary” line to interactive component contracts, distinguishing native HTML behavior, design-system CSS, and framework responsibilities.
- **Suggested command:** `/impeccable harden packages/design`

## Persona Red Flags

**Alex (Power User):** Family ownership helps, but Forms requires scanning ten panels without a local index. The contracts do not yet expose event or state APIs needed to evaluate efficiency.

**Sam (Accessibility-Dependent User):** Generic promises of accessible names and keyboard behavior are not enough. Dialog, Combobox, Tabs, Radio Group, and Tooltip need exact focus and announcement contracts.

**Public design-system adopter:** The documentation appears complete at first glance, then repeats nearly identical guidance. This creates a trust problem: polished containers imply decisions that have not actually been made.

## Minor Observations

- The component count is now correctly maintained at 33.
- Semantic state-token use appears 33 times; the migration is meaningful but incomplete.
- Contract disclosures keep the pages visually manageable, so their volume is primarily a content-quality issue rather than immediate visual clutter.
- Inter remains an accepted product-system choice.

## Questions to Consider

- Should contracts specify framework-neutral behavior only, or also define the future Solid component API shape?
- Which components are allowed to remain native wrappers, and which require managed state or focus behavior?
- Should family indexes become sticky on desktop or remain in normal flow?
