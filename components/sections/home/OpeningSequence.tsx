"use client";

import { useState } from "react";
import { isHydrated } from "@/lib/hydration";
import { wordmarkPaths, wordmarkViewBox } from "@/lib/wordmark";

/**
 * Opening sequence: the wordmark writes itself, fills, then the page opens from a
 * hairline at the centre to reveal the hero. Pure CSS (styles/globals.css, .intro),
 * so it runs from the very first paint and never waits for JavaScript or delays LCP.
 *
 * - Once per session: an inline script in <head> adds .intro-skip to <html> when the
 *   session has already seen a page, and the sequence only renders on a first load,
 *   never on client-side navigation back to Home.
 * - Never blocks: pointer-events none, aria-hidden, finished in ~2.4s (0.9s on mobile).
 * - Reduced motion: not shown at all.
 */
export function OpeningSequence() {
  const [firstLoad] = useState(() => !isHydrated());
  if (!firstLoad) return null;

  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-half intro-half--top" />
      <div className="intro-half intro-half--bottom" />
      <svg viewBox={wordmarkViewBox} className="intro-mark">
        <g className="intro-fill" fill="currentColor">
          {wordmarkPaths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g className="intro-stroke" fill="none" stroke="currentColor" strokeWidth={36}>
          {wordmarkPaths.map((d, i) => (
            <path key={i} d={d} pathLength={1} />
          ))}
        </g>
      </svg>
    </div>
  );
}
