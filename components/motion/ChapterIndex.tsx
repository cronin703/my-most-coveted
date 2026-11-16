/**
 * Slim reading-progress line fixed to the right edge (desktop only, decorative).
 * Chapter numbers themselves stay inline above each heading for everyone.
 */
export function ChapterIndex() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-1/2 right-[clamp(8px,1.4vw,24px)] z-30 hidden h-[28vh] w-px -translate-y-1/2 bg-line lg:block"
    >
      <div data-chapter-progress="" className="h-full w-full origin-top scale-y-0 bg-ink" />
    </div>
  );
}
