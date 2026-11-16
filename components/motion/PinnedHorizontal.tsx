import type { ReactNode } from "react";

/**
 * Horizontal chapter. Desktop with motion: pinned, scrolls sideways as you scroll down.
 * Mobile and no-JS: a native scroll-snap carousel with the next panel peeking in.
 * Reduced motion: a plain vertical stack. Panels stay in DOM order for keyboard and
 * screen-reader users; focusing one scrolls it into view.
 */
export function PinnedHorizontal({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section data-pin="" aria-label={label} className={`pin-section ${className}`}>
      <div data-pin-track="" className="pin-track">
        {children}
      </div>
    </section>
  );
}

export function PinnedPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-pin-panel="" className={`pin-panel ${className}`}>
      {children}
    </div>
  );
}
