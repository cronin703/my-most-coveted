import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "solid" | "outline" | "text";

const base =
  "label inline-flex min-h-11 items-center justify-center gap-3 transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)]";

const variants: Record<Variant, string> = {
  solid: "bg-ink px-6 text-ivory hover:bg-ink/85",
  outline: "border border-ink px-6 text-ink hover:bg-ink hover:text-ivory",
  text: "group text-ink",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant };

/** Link-styled button. `text` variant carries a drawn underline and an arrow. */
export function Button({ variant = "solid", className = "", children, ...props }: Props) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
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
    </Link>
  );
}
