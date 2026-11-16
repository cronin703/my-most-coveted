import Image from "next/image";
import { TransitionLink as Link } from "@/components/motion/PageTransition";
import { formatPrice, serviceNumber } from "@/lib/content";
import type { Service } from "@/lib/schema";
import { PlaceholderFlag } from "@/components/ui/PlaceholderFlag";

const modeLabel: Record<Service["mode"], string> = {
  "in-person": "In person",
  remote: "Remote",
  hybrid: "In person or remote",
};

/**
 * Service spread: numbered, display title, who it's for, 3 facts, price, link.
 * `flip` alternates the image side so a list never reads as a card grid.
 */
export function ServiceEntry({ service, flip = false }: { service: Service; flip?: boolean }) {
  const facts = [
    {
      term: "Turnaround",
      value: service.turnaround.startsWith("TODO") ? "To be confirmed" : service.turnaround,
    },
    { term: "Format", value: service.format },
    { term: "From", value: formatPrice(service.priceFrom) },
  ];
  return (
    <article className="grid-editorial items-end gap-y-8 border-t border-line py-[var(--section-m)]">
      <div className={`col-span-4 md:col-span-5 ${flip ? "md:col-start-8" : ""} md:row-start-1`}>
        <Image
          src={service.heroImage.src}
          alt={service.heroImage.alt}
          width={1600}
          height={2000}
          sizes="(min-width: 768px) 38vw, 100vw"
          className="aspect-[4/5] w-full object-cover"
        />
      </div>
      <div
        className={`col-span-4 md:col-span-6 md:row-start-1 ${flip ? "md:col-start-1" : "md:col-start-7"}`}
      >
        <div className="flex items-center gap-4">
          <p className="label text-stone">
            <span className="text-ink">{serviceNumber(service.order)}</span> ·{" "}
            {modeLabel[service.mode]}
          </p>
          <PlaceholderFlag show={service.placeholder} label="Draft copy" />
        </div>
        <h2 className="display-m mt-4">
          <Link href={`/services/${service.slug}`} className="hover:italic">
            {service.title}
          </Link>
        </h2>
        <p className="lede mt-4 max-w-[40ch]">{service.tagline}</p>
        <p className="mt-4 max-w-[48ch] text-stone">{service.whoFor}</p>
        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-4">
          {facts.map((fact) => (
            <div key={fact.term}>
              <dt className="label text-stone">{fact.term}</dt>
              <dd className="mt-1 text-[var(--text-small)] leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <Link
          href={`/services/${service.slug}`}
          className="label group mt-8 inline-flex min-h-11 items-center gap-3"
        >
          <span className="link-draw">Explore</span>
          <span className="sr-only"> {service.title}</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-[var(--dur-hover)] group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
