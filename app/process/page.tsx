import type { Metadata } from "next";
import { processSteps, prepareList } from "@/lib/copy";
import { PageIntro } from "@/components/sections/PageIntro";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/motion/primitives";

export const metadata: Metadata = {
  title: "The Process",
  description:
    "How personal styling works: consult, curation, fitting and sourcing, and ongoing guidance.",
};

export default function ProcessPage() {
  return (
    <>
      <PageIntro
        chapter="04"
        label="The Process"
        title={
          <>
            How it <em>works</em>
          </>
        }
        lede="Every engagement begins with understanding your lifestyle, your aspirations and how your wardrobe needs to work for you."
      />
      <ol className="frame">
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.title}
            className="grid-editorial gap-y-4 border-t border-line py-[var(--section-m)]"
          >
            <span className="display-m col-span-4 font-display font-light text-stone md:col-span-2">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="display-m col-span-4 md:col-span-5">{step.title}</h2>
            <div className="col-span-4 md:col-span-4 md:col-start-9">
              <p className="lede">{step.summary}</p>
              <p className="mt-4 text-stone">{step.detail}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      <section className="frame grid-editorial section-m border-t border-line">
        <h2 className="display-s col-span-4 md:col-span-4">What to prepare</h2>
        <ul className="col-span-4 mt-6 md:col-span-6 md:col-start-7 md:mt-0">
          {prepareList.map((item) => (
            <li key={item} className="border-t border-line py-3 last:border-b">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <FinalCta line="Start with a call." href="/contact?service=phone-consultation" />
    </>
  );
}
