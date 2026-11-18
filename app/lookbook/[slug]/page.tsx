import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLook, getLooks, getService } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Mdx } from "@/components/ui/Mdx";
import { PlaceholderFlag } from "@/components/ui/PlaceholderFlag";
import { FinalCta } from "@/components/sections/FinalCta";
import { LookCard } from "@/components/sections/LookCard";
import { TransitionLink } from "@/components/motion/PageTransition";
import { ImageReveal, Reveal } from "@/components/motion/primitives";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getLooks().map((look) => ({ slug: look.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const look = getLook((await params).slug);
  if (!look) return {};
  return { title: look.title, description: look.summary };
}

/**
 * One template for every lookbook story: cover (which the card image morphs into),
 * the brief → the edit → the result, the outfit formula, the gallery, the service
 * behind it, and more stories.
 */
export default async function LookPage({ params }: Props) {
  const look = getLook((await params).slug);
  if (!look) notFound();
  const service = getService(look.relatedService);
  const others = getLooks().filter((l) => l.slug !== look.slug);
  const bookHref = service ? `/contact?service=${service.slug}` : "/contact";

  return (
    <>
      <article>
        <header className="frame grid-editorial gap-y-10 pt-[var(--section-m)] pb-[var(--section-m)]">
          <div className="col-[1/-1] md:col-[1/7] md:row-start-1">
            <div style={{ viewTransitionName: `look-${look.slug}` }} className="overflow-hidden">
              <Image
                src={look.cover.src}
                alt={look.cover.alt}
                width={1200}
                height={1500}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 768px) 46vw, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
          <div className="col-[1/-1] md:col-[8/13] md:row-start-1 md:self-end">
            <p className="label text-stone">
              <TransitionLink
                href="/lookbook"
                className="link-draw inline-flex min-h-6 items-center"
              >
                Lookbook
              </TransitionLink>{" "}
              ·{" "}
              <TransitionLink
                href={`/lookbook?category=${encodeURIComponent(look.category)}`}
                className="link-draw inline-flex min-h-6 items-center"
              >
                {look.category}
              </TransitionLink>
            </p>
            <h1 className="display-m mt-4 font-light">{look.title}</h1>
            <p className="lede mt-4">{look.summary}</p>
            <div className="mt-4">
              <PlaceholderFlag show={look.placeholder} label="Sample story" />
            </div>
          </div>
        </header>

        <section className="frame grid-editorial section-m gap-y-12 border-t border-line">
          <Reveal className="col-[1/-1] md:col-[2/8]">
            <h2 className="label text-stone">The story</h2>
            <div className="mt-6">
              <Mdx source={look.body} />
            </div>
          </Reveal>
          {look.formula.length > 0 ? (
            <Reveal delay={0.12} className="col-[1/-1] md:col-[9/13]">
              <h2 className="label text-stone">The outfit formula</h2>
              <ol className="mt-4">
                {look.formula.map((piece, i) => (
                  <li
                    key={`${piece}-${i}`}
                    className="flex gap-4 border-t border-line py-3 last:border-b"
                  >
                    <span className="label pt-1 text-stone">{String(i + 1).padStart(2, "0")}</span>
                    {piece.startsWith("TODO") ? "Piece to be confirmed" : piece}
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}
        </section>

        {look.gallery.length > 0 ? (
          <section
            aria-label="Gallery"
            className="frame grid-editorial gap-y-8 pb-[var(--section-m)]"
          >
            {look.gallery.map((image, i) => (
              <div
                key={image.src}
                className={`col-[1/-1] ${i % 2 === 0 ? "md:col-[6/12]" : "md:col-[2/7]"}`}
              >
                <ImageReveal>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={1500}
                    sizes="(min-width: 768px) 42vw, 100vw"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </ImageReveal>
              </div>
            ))}
          </section>
        ) : null}
      </article>

      {service ? (
        <section className="frame grid-editorial section-m gap-y-6 border-t border-line">
          <div className="col-[1/-1] md:col-[1/7]">
            <p className="label text-stone">The service behind this look</p>
            <p className="display-s mt-4 font-display font-light">{service.title}</p>
            <p className="mt-3 max-w-[44ch] text-stone">{service.tagline}</p>
          </div>
          <div className="col-[1/-1] flex flex-wrap items-center gap-x-6 gap-y-3 md:col-[8/13] md:self-end">
            <Button href={bookHref}>Book a consultation</Button>
            <Button href={`/services/${service.slug}`} variant="text">
              About {service.title}
            </Button>
          </div>
        </section>
      ) : null}

      {others.length > 0 ? (
        <section className="frame section-m border-t border-line">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-s font-light">More stories</h2>
            <Button href="/lookbook" variant="text">
              The full lookbook
            </Button>
          </div>
          <div className="mt-10 grid gap-x-[var(--gutter)] gap-y-12 sm:grid-cols-2 lg:w-2/3">
            {others.slice(0, 2).map((l) => (
              <LookCard key={l.slug} look={l} />
            ))}
          </div>
        </section>
      ) : null}

      <FinalCta href={bookHref} />
    </>
  );
}
