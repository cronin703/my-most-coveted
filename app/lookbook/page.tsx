import type { Metadata } from "next";
import { getLooks } from "@/lib/content";
import { lookCategories } from "@/lib/schema";
import { PageIntro } from "@/components/sections/PageIntro";
import { Suspense } from "react";
import { LookbookGrid, LookbookGridFromUrl } from "@/components/sections/LookbookGrid";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "Everyday formulas, event looks, closet edits and remote styling from a New York personal stylist.",
};

export default function LookbookPage() {
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
      />
      <Suspense fallback={<LookbookGrid looks={getLooks()} categories={lookCategories} />}>
        <LookbookGridFromUrl looks={getLooks()} categories={lookCategories} />
      </Suspense>
      <FinalCta />
    </>
  );
}
