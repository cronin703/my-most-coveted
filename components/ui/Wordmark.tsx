import Link from "next/link";

/**
 * Temporary typeset wordmark.
 * TODO(client): replace with the original script lettering as an inline SVG (Phase 2).
 */
export function Wordmark({ name, className = "" }: { name: string; className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center shrink-0 font-display text-[1.375rem] leading-none font-normal whitespace-nowrap italic tracking-[-0.01em] sm:text-[1.625rem] md:text-[1.875rem] ${className}`}
    >
      {name}
      <span className="sr-only">, home</span>
    </Link>
  );
}
