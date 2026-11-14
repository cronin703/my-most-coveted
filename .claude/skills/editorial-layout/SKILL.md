---
name: editorial-layout
description: Magazine-style, non-template layout system for the My Most Coveted site — asymmetric grid, type-as-image, horizontal chapters, overlay menu — with accessible fallbacks. Use before composing any page, section, or component layout.
---

# Editorial layout system

The site should read like a fashion magazine spread, not a business template. Classic palette and type; unconventional composition. Every bold move has a plain fallback.

## Grid
- 12 columns, `max-width: 1440px`, gutters 24px (mobile 16px), outer margin `clamp(16px, 5vw, 80px)`.
- Compose **asymmetrically**: e.g. image spans cols 1–7 and rows 1–3, headline cols 6–12 overlapping the image edge by 1 column; body copy cols 8–11.
- Images may bleed off one edge (full-bleed left or right), never both on consecutive sections — alternate.
- Vary vertical rhythm: section padding alternates large (160px) and medium (96px) to create pacing.
- **Banned:** three identical cards in a row, centered-everything sections back-to-back, icon + heading + paragraph feature grids, rounded shadowed cards, gradient backgrounds.

## Type as image
- Display sizes via `clamp()`: `--display-xl: clamp(3.5rem, 14vw, 18rem)`, `--display-l: clamp(2.75rem, 8vw, 9rem)`, `--display-m: clamp(2rem, 5vw, 5rem)`.
- Tight leading (0.9–1.0) and slight negative tracking for display; mix roman + italic in one headline ("Your *most* coveted wardrobe").
- Images can sit in front of or behind display type using z-index layers — the text must still be real, selectable HTML with ≥ 3:1 contrast where it overlaps imagery (add a subtle scrim if needed).
- Labels: tracked small caps (`letter-spacing: 0.16em`), ≥ 12px, ink or stone that passes 4.5:1.

## Signature patterns
| Pattern | Desktop | Mobile / fallback |
|---|---|---|
| Chapter index | Sections numbered "01 — The Edit"; slim fixed progress line on the right edge | Number inline above heading; no fixed line |
| Horizontal chapter (Services, Featured looks) | Pinned, scrolls sideways; each panel is a spread: large image + title + 3 facts + price + arrow link | Scroll-snap carousel with visible next-card peek, or vertical list |
| Service spread | Numbered (01–07), title in display-m, who-it's-for line, 3 facts (turnaround / format / from-price), "Explore →" | Same content stacked |
| Look card | 4:5 image, caption below in small caps (category · title), hover zoom + cursor "View" | Same, tap |
| Overlay menu | Full-screen ivory, oversized serif links (display-l) numbered, image preview on hover on the right half; Book CTA + IG + email at bottom | Same minus image preview |
| Press strip | Only real publications; monochrome logos, generous spacing | Wraps 2-up |
| Final CTA | Display-xl line ("Let's begin.") + single solid button + response-time note | Same |

## Accessibility fallbacks (mandatory)
- DOM order = reading order regardless of visual overlap. Never rely on CSS order for meaning.
- Every section works with motion off and JS disabled (horizontal chapters become normal stacked content).
- Overlay menu: `role="dialog"`, `aria-modal`, focus trap, Esc closes, focus returns to trigger.
- Tap targets ≥ 44px; "Book a consultation" reachable within one tap on every viewport (sticky header button on mobile).
- Test at 375 / 768 / 1024 / 1440. No horizontal page overflow at any width (horizontal chapters scroll inside their own container only).

## Composition checklist per section
- [ ] Is it asymmetric or intentionally centered for contrast with its neighbor?
- [ ] Does exactly one element dominate (image or display type)?
- [ ] Is there a clear path to the CTA?
- [ ] Does it collapse into a deliberate mobile composition (not just stacking)?
- [ ] Does it pass contrast and reading-order checks?
