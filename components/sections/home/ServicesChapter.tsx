import Image from "next/image";
import { formatPrice, serviceNumber } from "@/lib/content";
import type { Service } from "@/lib/schema";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/motion/PageTransition";
import { PinnedHorizontal, PinnedPanel } from "@/components/motion/PinnedHorizontal";

const facts = (s: Service) => [
  { term: "Turnaround", value: s.turnaround.startsWith("TODO") ? "To be confirmed" : s.turnaround },
  { term: "Format", value: s.format },
  { term: "From", value: formatPrice(s.priceFrom) },
];

/**
 * 02 Services as a horizontal chapter: an opening title panel, then one magazine
 * spread per service (large image, number, title, three facts, price, link).
 * Desktop pins and scrolls sideways; phone swipes; reduced motion stacks.
 */
export function ServicesChapter({ services }: { services: Service[] }) {
  return (
    <div className="section-m border-t border-line">
      <PinnedHorizontal label="Services">
        <PinnedPanel className="pin-panel--title">
          <ChapterLabel number="02">Services</ChapterLabel>
          <h2 className="display-l mt-6 font-light">
            Ways to work <em>together</em>
          </h2>
          <p className="lede mt-6 max-w-[30ch] text-stone">
            In person across New York, or remotely wherever you are. Every service begins with a
            conversation.
          </p>
          <div className="mt-8">
            <Button href="/services" variant="text">
              All services
            </Button>
          </div>
        </PinnedPanel>

        {services.map((s) => (
          <PinnedPanel key={s.slug} className="pin-panel--spread">
            <div className="spread-image overflow-hidden">
              <Image
                data-pin-drift=""
                src={s.heroImage.src}
                alt={s.heroImage.alt}
                width={1600}
                height={2000}
                sizes="(min-width: 1024px) 34vw, 82vw"
                className="h-full w-full scale-[1.14] object-cover"
              />
            </div>
            <div className="spread-text">
              <p className="label text-stone">
                <span className="text-ink">{serviceNumber(s.order)}</span> ·{" "}
                {s.mode.replace("-", " ")}
              </p>
              <h3 className="mt-3 font-display text-[clamp(2rem,3.2vw,3rem)] leading-[1.02] font-light">
                {s.title}
              </h3>
              <p className="mt-3 text-stone">{s.whoFor}</p>
              <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-3">
                {facts(s).map((f) => (
                  <div key={f.term}>
                    <dt className="label text-stone">{f.term}</dt>
                    <dd className="mt-1 text-[var(--text-small)] leading-snug">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <TransitionLink
                href={`/services/${s.slug}`}
                className="label group mt-6 inline-flex min-h-11 items-center gap-3"
              >
                <span className="link-draw">Explore</span>
                <span className="sr-only"> {s.title}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-[var(--dur-hover)] group-hover:translate-x-1"
                >
                  →
                </span>
              </TransitionLink>
            </div>
          </PinnedPanel>
        ))}
      </PinnedHorizontal>
    </div>
  );
}
