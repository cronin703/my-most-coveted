import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLook, getLooks, getService } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Mdx } from "@/components/ui/Mdx";
import { PlaceholderFlag } from "@/components/ui/PlaceholderFlag";
import { FinalCta } from "@/components/sections/FinalCta";

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

export default async function LookPage({ params }: Props) {
  const look = getLook((await params).slug);
  if (!look) notFound();
  const service = getService(look.relatedService);

  return (
    <>
      <section className="frame grid-editorial gap-y-10 pt-[var(--section-m)] pb-[var(--section-m)]">
        <div className="col-span-4 md:col-span-6 md:col-start-1">
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
        <div className="col-span-4 md:col-span-5 md:col-start-8 md:self-end">
          <p className="label text-stone">
            <Link href="/lookbook" className="link-draw">
              Lookbook
            </Link>{" "}
            · {look.category}
          </p>
          <h1 className="display-m mt-4">{look.title}</h1>
          <p className="lede mt-4">{look.summary}</p>
          <div className="mt-4">
            <PlaceholderFlag show={look.placeholder} label="Sample story" />
          </div>
        </div>
      </section>

      <section className="frame grid-editorial gap-y-10 section-m border-t border-line">
        <div className="col-span-4 md:col-span-6 md:col-start-2">
          <Mdx source={look.body} />
        </div>
        {look.formula.length > 0 ? (
          <div className="col-span-4 md:col-span-3 md:col-start-9">
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
          </div>
        ) : null}
      </section>

      {look.gallery.length > 0 ? (
        <section className="frame grid-editorial gap-y-8 pb-[var(--section-m)]">
          {look.gallery.map((image, i) => (
            <div
              key={image.src}
              className={`col-span-4 ${i % 2 === 0 ? "md:col-span-5 md:col-start-6" : "md:col-span-5 md:col-start-2"}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={1500}
                sizes="(min-width: 768px) 38vw, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          ))}
        </section>
      ) : null}

      {service ? (
        <section className="frame section-m border-t border-line">
          <p className="label text-stone">The service behind this look</p>
          <p className="display-s mt-4 font-display font-light">{service.title}</p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <Button href={`/services/${service.slug}`} variant="text">
              About {service.title}
            </Button>
          </div>
        </section>
      ) : null}

      <FinalCta href={service ? `/contact?service=${service.slug}` : undefined} />
    </>
  );
}
