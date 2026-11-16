/**
 * Motion tokens: the single source for easing, durations, stagger and parallax.
 * Never hard-code a duration or easing anywhere else (luxury-motion skill).
 * CSS mirrors live in styles/tokens.css (--ease-out, --dur-hover …).
 */
export const ease = {
  out: "expo.out", // CSS: cubic-bezier(0.16, 1, 0.3, 1)
  inOut: "power3.inOut", // CSS: cubic-bezier(0.65, 0, 0.35, 1)
  soft: "power2.out",
} as const;

export const dur = {
  hover: 0.3,
  ui: 0.5,
  route: 0.6,
  reveal: 1.1,
  hero: 1.4,
  reduced: 0.2,
} as const;

export const stagger = { lines: 0.08, items: 0.12 } as const;

/** Fraction of scroll distance; negative moves against the scroll. */
export const parallax = { bg: -0.15, mid: -0.3, fg: 0.1 } as const;
export type ParallaxLayer = keyof typeof parallax;

/** The three matchMedia branches every effect implements. */
export const mq = {
  reduce: "(prefers-reduced-motion: reduce)",
  full: "(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (pointer: fine)",
  lite: "(prefers-reduced-motion: no-preference) and not ((min-width: 1024px) and (pointer: fine))",
} as const;

export const reveal = { distance: 40, liteDistance: 24, start: "top 85%" } as const;
