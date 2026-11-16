/**
 * Press mentions. Renders nothing until real, confirmed publications are supplied:
 * we never invent press (CLAUDE.md non-negotiable 5).
 */
export type PressItem = { name: string; href?: string };

export function PressStrip({ items }: { items: PressItem[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-label="As featured in" className="frame section-m border-t border-line">
      <p className="label text-stone">As featured in</p>
      <ul className="mt-8 grid grid-cols-2 gap-x-[var(--gutter)] gap-y-8 md:flex md:flex-wrap md:gap-x-16">
        {items.map((item) => (
          <li
            key={item.name}
            className="font-display text-[1.75rem] leading-none tracking-[0.02em] text-ink/80"
          >
            {item.href ? (
              <a href={item.href} className="link-draw">
                {item.name}
              </a>
            ) : (
              item.name
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
