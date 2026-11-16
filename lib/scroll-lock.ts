/**
 * Tiny bridge so UI (the overlay menu) can pause smooth scrolling without importing
 * the motion bundle. The motion controller registers Lenis here when it loads.
 */
type Scroller = { stop: () => void; start: () => void };

let scroller: Scroller | null = null;

export function registerScroller(value: Scroller | null) {
  scroller = value;
}

export function lockScroll() {
  scroller?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  document.documentElement.style.overflow = "";
  scroller?.start();
}
