/** Magazine chapter numbering: "01 — The Edit". Without a number it's a plain label. */
export function ChapterLabel({ number, children }: { number?: string; children: React.ReactNode }) {
  return (
    <p className="label flex items-center gap-3 text-stone">
      {number ? (
        <>
          <span className="text-ink">{number}</span>
          <span aria-hidden="true" className="h-px w-8 bg-stone" />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
