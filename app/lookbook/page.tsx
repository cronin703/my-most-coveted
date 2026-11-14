import type { Metadata } from "next";
import { getLooks } from "@/lib/content";
import { lookCategories } from "@/lib/schema";
import { PageIntro } from "@/components/sections/PageIntro";
import { LookCard } from "@/components/sections/LookCard";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "Everyday formulas, event looks, closet edits and remote styling from a New York personal stylist.",
};

export default function LookbookPage() {
  const looks = getLooks();
  return (
    <>
      <PageIntro
        chapter="03"
        label="Lookbook"
        title={
          <>
            The <em>Lookbook</em>
          </>
        }
        lede="Real wardrobes, real moments. Each story shows the brief, the edit and the result."
      >
        {/* Filtering arrives in Phase 4; categories are listed for orientation. */}
        <p className="label text-stone">{lookCategories.join(" · ")}</p>
      </PageIntro>
      <div className="frame grid gap-x-[var(--gutter)] gap-y-16 pb-[var(--section-l)] sm:grid-cols-2 lg:grid-cols-3">
        {looks.map((look, i) => (
          <div key={look.slug} className={i % 3 === 1 ? "lg:mt-24" : undefined}>
            <LookCard look={look} priority={i < 2} />
          </div>
        ))}
      </div>
      <FinalCta />
    </>
  );
}
