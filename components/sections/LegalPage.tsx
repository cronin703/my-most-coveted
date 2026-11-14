import { PageIntro } from "./PageIntro";

/** Plain-language legal page shell. TODO(client): final wording reviewed before launch. */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <PageIntro
        label="Legal"
        title={title}
        lede="Draft. Plain-language version to be reviewed before launch."
      />
      <div className="frame grid-editorial pb-[var(--section-l)]">
        <div className="prose-editorial measure col-span-4 md:col-span-7 md:col-start-3 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[1.75rem]">
          {children}
        </div>
      </div>
    </>
  );
}
