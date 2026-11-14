import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { generalFaqs } from "@/lib/copy";
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
      <dl className="frame grid-editorial pb-[var(--section-l)]">
        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="col-span-4 border-t border-line py-6 md:col-span-8 md:col-start-3"
          >
            <dt className="font-display text-[1.75rem] leading-tight">{faq.q}</dt>
            <dd className="measure mt-3 text-stone">{faq.a}</dd>
          </div>
        ))}
      </dl>
      <FinalCta />
    </>
  );
}
