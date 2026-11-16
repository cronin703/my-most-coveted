"use client";

import dynamic from "next/dynamic";

/**
 * Loads the motion engine (GSAP, ScrollTrigger, SplitText, Lenis) as a separate
 * chunk after hydration, so it never competes with the first paint or LCP.
 */
const MotionController = dynamic(() => import("./MotionController"), { ssr: false });

export function MotionRoot() {
  return <MotionController />;
}
