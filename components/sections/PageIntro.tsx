import { ChapterLabel } from "@/components/ui/ChapterLabel";

/** Standard page opening: chapter label, oversized title, optional lede. Asymmetric. */
export function PageIntro({
  chapter,
  label,
  title,
  lede,
  children,
}: {
  chapter?: string;
  label: string;
  title: React.ReactNode;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="frame grid-editorial pt-[var(--section-m)] pb-[var(--space-8)]">
      <div className="col-span-4 md:col-span-11">
        <ChapterLabel number={chapter}>{label}</ChapterLabel>
        <h1 className="display-l mt-6">{title}</h1>
      </div>
      {lede ? (
        <p className="lede col-span-4 mt-8 max-w-[44ch] text-stone md:col-span-6 md:col-start-6">
          {lede}
        </p>
      ) : null}
      {children ? <div className="col-span-4 mt-8 md:col-span-12">{children}</div> : null}
    </section>
  );
}
