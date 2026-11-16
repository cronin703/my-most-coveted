/**
 * Accordion built on native <details>/<summary>: keyboard and screen-reader support
 * for free, works with JS off. Several can be open at once.
 */
export function Accordion({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="border-b border-line">
      {items.map((item) => (
        <details key={item.q} className="accordion group border-t border-line">
          <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-4 font-display text-[1.5rem] leading-tight md:text-[1.75rem]">
            <span>{item.q}</span>
            <span
              aria-hidden="true"
              className="relative h-4 w-4 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-px before:w-4 before:bg-ink after:absolute after:top-1/2 after:left-0 after:h-px after:w-4 after:rotate-90 after:bg-ink after:transition-transform after:duration-[var(--dur-hover)] after:ease-[var(--ease-out)] group-open:after:rotate-0"
            />
          </summary>
          <div className="accordion-body measure pb-6 text-stone">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
