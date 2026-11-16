import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getService, getServices, getLooks, serviceNumber } from "@/lib/content";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { Mdx } from "@/components/ui/Mdx";
import { PlaceholderFlag } from "@/components/ui/PlaceholderFlag";
import { LookCard } from "@/components/sections/LookCard";
import { FinalCta } from "@/components/sections/FinalCta";

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

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const bookHref = `/contact?service=${service.slug}`;
  const related = getServices()
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);
  const looks = getLooks().filter((l) => l.relatedService === service.slug);
  const facts = [
    {
      term: "Turnaround",
      value: service.turnaround.startsWith("TODO") ? "To be confirmed" : service.turnaround,
    },
    { term: "Format", value: service.format },
    ...(service.looks ? [{ term: "Looks", value: `${service.looks} tailored outfits` }] : []),
    {
      term: service.priceFrom === null ? "Price" : "From",
      value: service.priceFrom === null ? "Inquire" : formatPrice(service.priceFrom),
    },
  ];

  return (
    <>
      <section className="frame grid-editorial gap-y-10 pt-[var(--section-m)] pb-[var(--section-m)]">
        <div className="col-span-4 md:col-span-6 md:self-end">
          <div className="flex flex-wrap items-center gap-4">
            <ChapterLabel number={serviceNumber(service.order)}>Service</ChapterLabel>
            <PlaceholderFlag show={service.placeholder} label="Draft copy" />
          </div>
          <h1 className="display-l mt-6">{service.title}</h1>
          <p className="lede mt-6 max-w-[34ch]">{service.tagline}</p>
          <div className="mt-8">
            <Button href={bookHref}>Book a consultation</Button>
          </div>
        </div>
        <div className="col-span-4 md:col-span-5 md:col-start-8">
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

      <section className="frame grid-editorial gap-y-10 section-m border-t border-line">
        <div className="col-span-4 md:col-span-4">
          <h2 className="label text-stone">Who it’s for</h2>
          <p className="display-s mt-4 font-display font-light">{service.whoFor}</p>
        </div>
        <div className="col-span-4 md:col-span-6 md:col-start-7">
          <h2 className="label text-stone">What’s included</h2>
          <ul className="mt-4">
            {service.includes.map((item) => (
              <li key={item} className="border-t border-line py-3 last:border-b">
                {item}
              </li>
            ))}
          </ul>
          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.term}>
                <dt className="label text-stone">{fact.term}</dt>
                <dd className="mt-1 leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="frame grid-editorial section-m border-t border-line">
        <div className="col-span-4 md:col-span-6 md:col-start-4">
          <Mdx source={service.body} />
        </div>
      </section>

      {service.faqs.length > 0 ? (
        <section className="frame grid-editorial section-m border-t border-line">
          <h2 className="display-s col-span-4 md:col-span-4">Questions</h2>
          <div className="col-span-4 mt-6 md:col-span-7 md:col-start-6 md:mt-0">
            <Accordion items={service.faqs} />
          </div>
        </section>
      ) : null}

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

      <section className="frame section-m border-t border-line">
        <h2 className="label text-stone">Other services</h2>
        <ul className="mt-6">
          {related.map((s) => (
            <li key={s.slug} className="border-t border-line last:border-b">
              <Link
                href={`/services/${s.slug}`}
                className="group flex min-h-16 items-baseline justify-between gap-4 py-3"
              >
                <span className="font-display text-[1.75rem] leading-tight font-light group-hover:italic">
                  {s.title}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Inline, prefilled inquiry form arrives in Phase 5. */}
      <FinalCta line="Let’s begin." href={bookHref} />
    </>
  );
}
