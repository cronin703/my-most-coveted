import { TransitionLink } from "@/components/motion/PageTransition";

/**
 * Script wordmark (public/wordmark.svg, generated from Pinyon Script).
 * TODO(client): swap in her original lettering file when it arrives.
 */
export function Wordmark({ name, className = "" }: { name: string; className?: string }) {
  return (
    <TransitionLink href="/" className={`inline-flex min-h-11 shrink-0 items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed */}
      <img
        src="/wordmark.svg"
        alt={name}
        width={13607}
        height={2422}
        className="h-[26px] w-auto sm:h-[30px] md:h-[34px]"
      />
      <span className="sr-only">, home</span>
    </TransitionLink>
  );
}
