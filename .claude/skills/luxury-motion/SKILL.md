---
name: luxury-motion
description: Motion and parallax system for the My Most Coveted site — Lenis, GSAP ScrollTrigger/SplitText, Motion, View Transitions, with reduced-motion and performance rules. Use before writing any animation, scroll effect, parallax, page transition, cursor, or hover interaction.
---

# Luxury motion system

Motion is the luxury signal on this site. It must feel **slow, weighted, and intentional** — like a fashion film, not an app. Nothing bounces, springs, wobbles, or spins.

## Tokens (single source: `lib/motion.ts`)
```ts
export const ease = {
  out: 'expo.out',            // CSS: cubic-bezier(0.16, 1, 0.3, 1)
  inOut: 'power3.inOut',      // CSS: cubic-bezier(0.65, 0, 0.35, 1)
  soft: 'power2.out',
} as const;
export const dur = { hover: 0.3, ui: 0.5, route: 0.6, reveal: 1.1, hero: 1.4 } as const;
export const stagger = { lines: 0.08, items: 0.12 } as const;
export const parallax = { bg: -0.15, mid: -0.3, fg: 0.1 } as const; // fraction of scroll distance
```
Never hard-code a duration or easing elsewhere. Spring physics are banned.

## Architecture
- `components/motion/SmoothScroll.tsx` — client component at the root layout. Lenis (`lerp: 0.08`, `smoothWheel: true`, touch native) driven by `gsap.ticker`; `ScrollTrigger.update` on Lenis scroll; `lagSmoothing(0)`. Disabled entirely under reduced motion.
- Register plugins once in `lib/gsap.ts` (`gsap.registerPlugin(ScrollTrigger, SplitText)`), import from there.
- Use `useGSAP()` from `@gsap/react` with a scope ref for cleanup. Never leave ScrollTriggers alive across route changes.
- Wrap every effect in `gsap.matchMedia()` with three conditions: `(prefers-reduced-motion: reduce)`, `(min-width: 1024px) and (pointer: fine)` (full), and default (mobile-lite).
- Motion code is client-only and loaded after first paint (`next/dynamic` or effect-gated). The hero LCP image renders visible in HTML; the reveal animates a mask *over* it, never `opacity: 0` on the LCP element at SSR.

## Pattern library
| Component | Full (desktop) | Mobile-lite | Reduced motion |
|---|---|---|---|
| `Reveal` | y 40→0, opacity 0→1, `dur.reveal`, `ease.out`, start `top 85%` | y 24 | opacity only, 0.2s |
| `SplitHeading` | SplitText lines, masked, yPercent 100→0, stagger `lines` | same | no split, opacity |
| `ImageReveal` | clip-path `inset(100% 0 0 0)`→`inset(0)` + inner scale 1.15→1, scrub false | same, scale 1.08 | static |
| `Parallax` | yPercent by `parallax.*`, `scrub: true` | 50% strength | none |
| `PinnedHorizontal` | pin section, translate track by its overflow, `scrub: 1`, inner images drift ±6% | **no pin**: native horizontal scroll-snap carousel | vertical stack |
| `OpeningSequence` | wordmark stroke draw 0.9s → hero mask hairline→full 1.2s; once per session (`sessionStorage`) | shorter (0.8s total) | skipped |
| `Cursor` | 10px dot, lerped follow; grows to 72px label "View"/"Book" via `data-cursor` attr | not rendered | not rendered |
| `Magnetic` | CTA translates ≤ 8px toward pointer, `dur.hover` | none | none |
| `PageTransition` | View Transitions API: cross-fade 0.6s; look card image → detail hero via `view-transition-name` | same | instant |
| Hover | image scale 1.03 over 0.6s; underline draws left→right `dur.hover` | tap states only | color change only |

## Rules
1. Animate **only** `transform`, `opacity`, `clip-path` (and SVG `stroke-dashoffset` for the wordmark). Never width/height/top/left/margin.
2. `will-change` only during an animation, removed after.
3. One focal motion per viewport. If two things move at once, one is the hero and the other is subordinate (smaller distance, later start).
4. Nothing loops forever, nothing autoplays with sound, no motion blocks reading or clicking. Every interaction works the instant the page is interactive.
5. Pinned sections must not trap keyboard users: all items are reachable via Tab in DOM order and focus scrolls them into view.
6. Test every pattern with DevTools → Rendering → `prefers-reduced-motion: reduce`, with 4× CPU throttle, and at 375px. Target steady 60fps; no long tasks > 50ms caused by scroll handlers.
7. Respect CLS: reserve space for anything that animates in.
8. WebGL effects are phase-2 only and require a measured Lighthouse mobile ≥ 90 with them on.

## Done checklist for any motion PR
- [ ] Uses tokens from `lib/motion.ts`
- [ ] Three matchMedia branches implemented
- [ ] Cleans up on unmount / route change
- [ ] Verified reduced-motion, mobile, keyboard
- [ ] No CLS, no LCP regression
