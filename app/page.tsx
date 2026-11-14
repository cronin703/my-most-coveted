import Image from "next/image";
import Link from "next/link";
import { getLooks, getServices, getSite, getTestimonials, serviceNumber } from "@/lib/content";
import { processSteps } from "@/lib/copy";
import { Button } from "@/components/ui/Button";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { LookCard } from "@/components/sections/LookCard";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Home, Phase 1 skeleton. Section order follows BRIEF §4; the opening sequence,
 * parallax and pinned horizontal chapters arrive in Phases 2–3.
 */
export default function HomePage() {
  const site = getSite();
  const services = getServices();
  const looks = getLooks();
  const [testimonial] = getTestimonials();

  return (
    <>
      {/* Hero: type-as-image headline over the image edge */}
      <section className="frame grid-editorial pt-[var(--space-6)] pb-[var(--section-m)] md:pt-[var(--space-8)]">
        <h1 className="display-xl relative z-10 col-span-4 md:col-span-11">
          Your <em className="font-light">most</em> coveted wardrobe
        </h1>
        <div className="col-span-4 -mt-[0.35em] md:col-span-8 md:col-start-5 md:-mt-[1.1em]">
          {/* LCP image: rendered visible in HTML, never hidden behind JS. */}
          <Image
            src="/images/placeholder/hero.jpg"
            alt="Placeholder image for the hero: the styling atelier"
            width={2400}
            height={1600}
            priority
            sizes="(min-width: 768px) 66vw, 100vw"
            className="aspect-[3/2] w-full object-cover"
          />
        </div>
        <div className="col-span-4 mt-8 md:col-span-4 md:col-start-1 md:row-start-2 md:mt-0 md:self-end">
          <p className="lede max-w-[34ch]">{site.positioning}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={site.primaryCta.href}>{site.primaryCta.label}</Button>
            <Button href="/services" variant="text">
              Explore services
            </Button>
          </div>
        </div>
      </section>

      {/* 01 The Edit */}
      <section className="frame grid-editorial section-l border-t border-line">
        <div className="col-span-4 md:col-span-4">
          <ChapterLabel number="01">The Edit</ChapterLabel>
        </div>
        <div className="col-span-4 mt-6 md:col-span-7 md:col-start-6 md:mt-0">
          <p className="display-s font-display font-light">
            I edit what you own, find what’s missing, and dress you for the moments that matter.
          </p>
          <p className="measure mt-6 text-stone">
            {/* TODO(client): intro paragraph in her voice, from the interview. */}
            Placeholder introduction. A short, warm paragraph in her own voice about how she works
            and who she works with will go here after the client interview.
          </p>
          <Button href="/about" variant="text" className="mt-6">
            About me
          </Button>
        </div>
      </section>

      {/* 02 Services: becomes a pinned horizontal chapter in Phase 3 */}
      <section className="section-m border-t border-line">
        <div className="frame">
          <ChapterLabel number="02">Services</ChapterLabel>
          <h2 className="display-m mt-6 max-w-[16ch]">Ways to work together</h2>
        </div>
        <ol className="frame mt-12">
          {services.map((service) => (
            <li key={service.slug} className="border-t border-line last:border-b">
              <Link
                href={`/services/${service.slug}`}
                className="group grid-editorial items-baseline py-5 md:py-6"
              >
                <span className="label col-span-1 text-stone">{serviceNumber(service.order)}</span>
                <span className="col-span-3 font-display text-[1.75rem] leading-tight font-light transition-[font-style] group-hover:italic md:col-span-6 md:text-[2.5rem]">
                  {service.title}
                </span>
                <span className="col-span-3 col-start-2 mt-1 text-stone md:col-span-4 md:col-start-8 md:mt-0">
                  {service.tagline}
                </span>
                <span aria-hidden="true" className="hidden text-right md:col-span-1 md:block">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* 03 Featured looks: becomes a pinned horizontal chapter in Phase 3 */}
      <section className="section-l border-t border-line">
        <div className="frame flex flex-wrap items-end justify-between gap-6">
          <div>
            <ChapterLabel number="03">Featured looks</ChapterLabel>
            <h2 className="display-m mt-6">From the lookbook</h2>
          </div>
          <Button href="/lookbook" variant="text">
            View the lookbook
          </Button>
        </div>
        <div className="frame mt-12 grid gap-x-[var(--gutter)] gap-y-12 md:grid-cols-12">
          {looks.map((look, i) => (
            <div
              key={look.slug}
              className={
                [
                  "md:col-span-5",
                  "md:col-span-4 md:col-start-7 md:mt-32",
                  "md:col-span-4 md:col-start-3",
                ][i % 3]
              }
            >
              <LookCard look={look} />
            </div>
          ))}
        </div>
      </section>

      {/* 04 The Process */}
      <section className="frame grid-editorial section-m border-t border-line">
        <div className="col-span-4 md:col-span-4">
          <ChapterLabel number="04">The Process</ChapterLabel>
          <h2 className="display-m mt-6">How it works</h2>
        </div>
        <ol className="col-span-4 mt-10 md:col-span-7 md:col-start-6 md:mt-0">
          {processSteps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[3rem_1fr] border-t border-line py-6">
              <span className="label pt-2 text-stone">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-[1.75rem] leading-tight font-normal">
                  {step.title}
                </h3>
                <p className="mt-2 text-stone">{step.summary}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="col-span-4 mt-8 md:col-span-7 md:col-start-6">
          <Button href="/process" variant="text">
            The full process
          </Button>
        </div>
      </section>

      {testimonial ? (
        <div className="border-t border-line">
          <TestimonialBlock testimonial={testimonial} />
        </div>
      ) : null}

      {/* Press strip intentionally omitted until a real mention is confirmed. */}

      <FinalCta />
    </>
  );
}
