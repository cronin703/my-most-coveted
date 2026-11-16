import type { ComponentProps } from "react";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Magnetic } from "@/components/motion/primitives";

type Variant = "solid" | "outline" | "text";

const base =
  "label inline-flex min-h-11 items-center justify-center gap-3 transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]";

const variants: Record<Variant, string> = {
  solid: "bg-ink px-6 text-ivory hover:bg-ink/85",
  outline: "border border-ink px-6 text-ink hover:bg-ink hover:text-ivory",
  text: "group text-ink",
};

type Props = ComponentProps<typeof TransitionLink> & {
  variant?: Variant;
  /** Desktop pointer pull. On by default for solid CTAs. */
  magnetic?: boolean;
};

/**
 * Link-styled button with route cross-fade. Solid CTAs are magnetic and show the
 * "Book" cursor on desktop. The `text` variant draws its underline and nudges its arrow.
 */
export function Button({ variant = "solid", magnetic, className = "", children, ...props }: Props) {
  const link = (
    <TransitionLink
      data-cursor={variant === "solid" ? "Book" : undefined}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {variant === "text" ? (
        <>
          <span className="link-draw">{children}</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-[var(--dur-hover)] ease-[var(--ease-out)] group-hover:translate-x-1"
          >
            →
          </span>
        </>
      ) : (
        children
      )}
    </TransitionLink>
  );
  return (magnetic ?? variant === "solid") ? <Magnetic>{link}</Magnetic> : link;
}
