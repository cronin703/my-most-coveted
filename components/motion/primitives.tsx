import type { ElementType, ReactNode } from "react";
import type { ParallaxLayer } from "@/lib/motion";

/**
 * Motion primitives. Each renders plain, fully visible HTML plus a data-attribute;
 * the lazily loaded MotionController animates them. With JS off or motion reduced,
 * the content is simply there.
 */

type Base = { children: ReactNode; className?: string };

/** Rises and fades in when scrolled into view. */
export function Reveal({
  as: Tag = "div",
  delay,
  className,
  children,
}: Base & { as?: ElementType; delay?: number }) {
  return (
    <Tag data-reveal="" data-reveal-delay={delay} className={className}>
      {children}
    </Tag>
  );
}

/** Heading whose lines rise out of a mask, one after another. */
export function SplitHeading({
  as: Tag = "h2",
  className,
  children,
}: Base & { as?: "h1" | "h2" | "h3" | "p" }) {
  return (
    <Tag data-split="" className={className}>
      {children}
    </Tag>
  );
}

/** Image that unmasks upward while settling from a slight zoom. Wrap one image. */
export function ImageReveal({ className = "", children }: Base) {
  return (
    <div data-image-reveal="" className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

/** Moves at a different speed from the scroll. Put data-parallax-scope on the section. */
export function Parallax({ layer = "bg", className, children }: Base & { layer?: ParallaxLayer }) {
  return (
    <div data-parallax={layer} className={className}>
      {children}
    </div>
  );
}

/** Pulls gently toward the pointer (desktop). Wrap a button or link. */
export function Magnetic({ className = "", children }: Base) {
  return (
    <span data-magnetic="" className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
