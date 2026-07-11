---
target: packages/design
total_score: 34
p0_count: 0
p1_count: 1
timestamp: 2026-07-11T08-18-46Z
slug: packages-design
---
⚠️ DEGRADED: single-context (no sub-agent or browser automation tool exposed)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|------:|-----------|
| 1 | Visibility of System Status | 3 | State contracts are precise, but many previews are static snapshots. |
| 2 | Match System / Real World | 3 | Familiar product terminology and controls remain strong. |
| 3 | User Control and Freedom | 3 | Contracts define escape and restoration; static examples do not prove them. |
| 4 | Consistency and Standards | 4 | Canonical families, local indexes, semantic roles, and contract structure are cohesive. |
| 5 | Error Prevention | 3 | Contracts cover prevention and resilience; rendered examples sometimes diverge from those contracts. |
| 6 | Recognition Rather Than Recall | 4 | Global index plus five local family indexes provide clear wayfinding. |
| 7 | Flexibility and Efficiency | 4 | Direct local anchors and keyboard tab behavior support efficient lookup and use. |
| 8 | Aesthetic and Minimalist Design | 3 | Distinctive and controlled; exhaustive family pages are necessarily dense. |
| 9 | Error Recovery | 3 | Relevant contracts now specify retry, persistence, failure, and restoration behavior. |
| 10 | Help and Documentation | 4 | All 33 components have specific framework-neutral implementation guidance. |
| **Total** | | **34/40** | **Good — close to implementation-ready** |

## Anti-Patterns Verdict

**LLM assessment:** The textual AI tell from the previous run is resolved. All 198 non-theme contract paragraphs are unique, concrete, and component-specific. The system reads as intentionally authored documentation rather than generated filler. The visual identity remains distinctive and restrained.

**Deterministic scan:** Nineteen warnings: nine overused-font, nine single-font, and one em-dash warning. Font findings remain accepted exceptions because Inter plus a mono technical register is an explicit product-system decision. The em-dash result in `tokens.html` is a false positive from CSS custom-property syntax. The layout detector remains clean.

**Visual overlays:** Browser automation is unavailable, so no rendered overlay, multi-theme screenshot review, or real focus-path evidence is available.

## Overall Impression

The design system specification is now strong enough to guide implementation. The remaining major issue is contract-to-example integrity: some previews claim ARIA widget semantics while remaining static, incomplete in their relationships, or permanently present in normal document flow. A public design system must not teach markup that contradicts its own contracts.

## What's Working

1. **Contract quality is substantially improved:** 231 paragraphs, 199 unique, with no repeated non-theme guidance across all 33 components.
2. **Wayfinding is complete:** Every canonical family has a normal-flow local index, and `components.html` remains a compact global index.
3. **Implementation boundaries are clear:** Browser, CSS, consumer application, and managed-behavior responsibilities are separated without prescribing a Solid API.
4. **Semantic cleanup is meaningful:** Raw CSS color occurrences dropped from 313 to 133 while 187 semantic preview-token references now cover repeated surfaces, rings, shadows, and glows.

## Priority Issues

### [P1] Some rendered examples contradict their production contracts
- **Why it matters:** The Combobox contract requires `aria-controls`, `aria-activedescendant`, and managed focus, but the preview exposes `role="combobox"` and an expanded listbox without those relationships. Dialog previews expose `role="dialog"` permanently in normal page flow without `aria-modal`, complete descriptions, or runnable focus behavior. Adopters may copy invalid or misleading markup.
- **Fix:** Choose one explicit mode for every complex preview: (a) fully runnable and contract-compliant, or (b) static anatomy with widget roles and interactive states removed from the accessibility tree. Add a visible “Static anatomy” label to mode B. Prioritize Combobox, Dialog, Alert Dialog, Popover, menu examples, and selection widgets.
- **Suggested command:** `/impeccable harden packages/design`

### [P2] Family pages need stronger current-location feedback
- **Why it matters:** Local indexes provide anchors, but they do not indicate which component section is currently being read. This matters most on Forms with ten sections.
- **Fix:** Use CSS `:target` to highlight the destination panel and matching link where practical; avoid scroll listeners. Keep the no-hash initial state neutral.
- **Suggested command:** `/impeccable polish packages/design`

### [P2] Remaining raw colors need an explicit acceptance boundary
- **Why it matters:** The semantic pass reduced raw values by 57%, but 133 remain. Without classification, future contributors cannot tell intentional one-off atmosphere from missing tokens.
- **Fix:** Document the rule: repeated functional values belong in generated public tokens; one-off preview atmosphere may remain in `themes.css`; unique component effects require a named reason. Audit the remaining values against that rule once, then stop chasing zero.
- **Suggested command:** `/impeccable document packages/design`

### [P3] Static-page shell duplication remains a maintenance risk
- **Why it matters:** Theme options and primary navigation are copied across pages. This is acceptable while the design remains static, but public release changes could drift.
- **Fix:** Record this as a migration requirement for the future documentation implementation rather than introducing a framework now.
- **Suggested command:** `/impeccable harden packages/design`

## Persona Red Flags

**Alex (Power User):** Local indexes solve lookup speed. The remaining friction is no current-section indication while scanning a long family page.

**Sam (Accessibility-Dependent User):** Precise contracts are excellent, but permanent static elements carrying dialog/combobox widget roles create a mismatch between announced semantics and actual interaction.

**Public design-system adopter:** The specification is now trustworthy until the adopter inspects complex preview markup. Any example that looks copyable must either work or clearly identify itself as non-production anatomy.

## Minor Observations

- Theming guidance is intentionally shared across contracts; all other contract prose is unique.
- The component count remains correct at 33.
- Normal-flow family indexes match the user's chosen navigation behavior.
- Zero raw colors is not a useful goal; an explicit tokenization rule is better.

## Questions to Consider

- Should complex previews become fully interactive now, or remain explicitly static until the framework package is implemented?
- If static, should all preview widgets be hidden from assistive technology while an adjacent textual anatomy description remains readable?
- Is `:target` highlighting sufficient for current location, or should the future documentation app add scroll-aware navigation later?
