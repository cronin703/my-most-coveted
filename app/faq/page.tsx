import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { generalFaqs } from "@/lib/copy";
import { Accordion } from "@/components/ui/Accordion";
import { PageIntro } from "@/components/sections/PageIntro";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pricing, travel, remote styling, budgets and shopping links: answers to common questions.",
};

export default function FaqPage() {
  // General questions first, then any service FAQ not already covered (deduped by question).
  const seen = new Set<string>(generalFaqs.map((f) => f.q));
  const serviceFaqs = getServices()
    .flatMap((s) => s.faqs)
    .filter((f) => (seen.has(f.q) ? false : (seen.add(f.q), true)));
  const faqs = [...generalFaqs, ...serviceFaqs];

  return (
    <>
      <PageIntro
        label="FAQ"
        title={
          <>
            Good <em>questions</em>
          </>
        }
        lede="Draft answers, to be confirmed with her before launch."
      />
      <div className="frame grid-editorial pb-[var(--section-l)]">
        <div className="col-span-4 md:col-span-8 md:col-start-3">
          <Accordion items={faqs} />
        </div>
      </div>
      <FinalCta />
    </>
  );
}
