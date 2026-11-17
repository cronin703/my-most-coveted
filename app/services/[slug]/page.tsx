import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatPrice, getLooks, getService, getServices, serviceNumber } from "@/lib/content";
import { processSteps } from "@/lib/copy";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { Mdx } from "@/components/ui/Mdx";
import { PlaceholderFlag } from "@/components/ui/PlaceholderFlag";
import { LookCard } from "@/components/sections/LookCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { TransitionLink } from "@/components/motion/PageTransition";
import { Reveal, SplitHeading } from "@/components/motion/primitives";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: service.title, description: `${service.tagline} ${service.whoFor}` };
}

const modeLabel = {
  "in-person": "In person, New York",
  remote: "Remote, anywhere",
  hybrid: "In person or remote",
};

/**
 * One template for every service (BRIEF §4): hero, facts, who it's for, what's
 * included, how it works, her words, questions, related looks, neighbouring services,
 * and a booking path prefilled with this service. The inline form arrives in Phase 5.
 */
export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const services = getServices();
  const index = services.findIndex((s) => s.slug === service.slug);
  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];
  const bookHref = `/contact?service=${service.slug}`;
  const looks = getLooks().filter((l) => l.relatedService === service.slug);
  const facts = [
    { term: "Format", value: service.format },
    {
      term: "Turnaround",
      value: service.turnaround.startsWith("TODO") ? "To be confirmed" : service.turnaround,
    },
    ...(service.looks ? [{ term: "Looks", value: `${service.looks} tailored outfits` }] : []),
    {
      term: service.priceFrom === null ? "Price" : "From",
      value: service.priceFrom === null ? "On consultation" : formatPrice(service.priceFrom),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="frame grid-editorial gap-y-10 pt-[var(--section-m)] pb-[var(--section-m)]">
        <div className="col-[1/-1] md:col-[1/7] md:row-start-1 md:self-end">
          <p className="label text-stone">
            <TransitionLink href="/services" className="link-draw">
              Services
            </TransitionLink>{" "}
            · {modeLabel[service.mode]}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ChapterLabel number={serviceNumber(service.order)}>Service</ChapterLabel>
            <PlaceholderFlag show={service.placeholder} label="Draft copy" />
          </div>
          <h1 className="display-l mt-4 font-light">{service.title}</h1>
          <p className="lede mt-6 max-w-[34ch]">{service.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={bookHref}>Book a consultation</Button>
            <Button href="#included" variant="text">
              What’s included
            </Button>
          </div>
        </div>
        <div className="col-[1/-1] md:col-[8/13] md:row-start-1">
          <Image
            src={service.heroImage.src}
            alt={service.heroImage.alt}
            width={1600}
            height={2000}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 768px) 38vw, 100vw"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      {/* Facts bar */}
      <section aria-label="At a glance" className="frame">
        <dl className="grid grid-cols-2 gap-x-[var(--gutter)] gap-y-6 border-y border-line py-6 md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.term}>
              <dt className="label text-stone">{fact.term}</dt>
              <dd className="mt-1 font-display text-[1.5rem] leading-tight">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Who it's for + what's included */}
      <section id="included" className="frame grid-editorial section-l scroll-mt-24 gap-y-12">
        <div className="col-[1/-1] md:col-[1/6]">
          <h2 className="label text-stone">Who it’s for</h2>
          <SplitHeading as="p" className="display-s mt-4 font-display font-light">
            {service.whoFor}
          </SplitHeading>
        </div>
        <div className="col-[1/-1] md:col-[7/13]">
          <h2 className="label text-stone">What’s included</h2>
          <ol className="mt-4">
            {service.includes.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={i * 0.08}
                className="grid grid-cols-[2.5rem_1fr] border-t border-line py-4 last:border-b"
              >
                <span className="label pt-1 text-stone">{String(i + 1).padStart(2, "0")}</span>
                <span className="lede">{item}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Her words (MDX body) */}
      <section className="frame grid-editorial section-m border-t border-line">
        <Reveal className="col-[1/-1] md:col-[4/11]">
          <Mdx source={service.body} />
        </Reveal>
      </section>

      {/* How it works: the four steps, compact */}
      <section aria-labelledby="how-title" className="border-t border-line bg-sand">
        <div className="frame section-m">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="how-title" className="display-s font-light">
              How it <em>works</em>
            </h2>
            <Button href="/process" variant="text">
              The full process
            </Button>
          </div>
          <ol className="mt-10 grid gap-x-[var(--gutter)] gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 0.08}
                className="border-t border-ink/20 pt-4"
              >
                <span className="label text-stone">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-[1.75rem] leading-tight">{step.title}</h3>
                <p className="mt-2 text-stone">{step.summary}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Questions */}
      {service.faqs.length > 0 ? (
        <section className="frame grid-editorial section-m gap-y-6 border-t border-line">
          <h2 className="display-s col-[1/-1] font-light md:col-[1/5]">Questions</h2>
          <div className="col-[1/-1] md:col-[6/13]">
            <Accordion items={service.faqs} />
            <p className="mt-6 text-stone">
              More answers on the{" "}
              <TransitionLink
                href="/faq"
                className="underline decoration-accent underline-offset-4"
              >
                FAQ page
              </TransitionLink>
              .
            </p>
          </div>
        </section>
      ) : null}

      {/* Related looks */}
      {looks.length > 0 ? (
        <section className="frame section-m border-t border-line">
          <h2 className="label text-stone">From the lookbook</h2>
          <div className="mt-8 grid gap-[var(--gutter)] sm:grid-cols-2 lg:w-2/3">
            {looks.map((look) => (
              <LookCard key={look.slug} look={look} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Booking path. Phase 5 replaces the button with the inline, prefilled form. */}
      <FinalCta line="Let’s begin." href={bookHref} />

      {/* Previous / next service */}
      <nav aria-label="More services" className="frame border-t border-line">
        <ul className="grid md:grid-cols-2">
          {[
            { dir: "Previous", s: prev },
            { dir: "Next", s: next },
          ].map(({ dir, s }) =>
            s ? (
              <li key={dir} className={dir === "Next" ? "md:text-right" : ""}>
                <TransitionLink href={`/services/${s.slug}`} className="group block py-10">
                  <span className="label text-stone">
                    {dir} service · {serviceNumber(s.order)}
                  </span>
                  <span className="mt-2 block font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-light group-hover:italic">
                    {s.title}
                  </span>
                </TransitionLink>
              </li>
            ) : null,
          )}
        </ul>
      </nav>
    </>
  );
}
