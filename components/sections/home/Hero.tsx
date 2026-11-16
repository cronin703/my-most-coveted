import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Parallax } from "@/components/motion/primitives";
import type { Site } from "@/lib/schema";

/**
 * Home hero: type as image. The display headline is real, selectable text layered
 * over a parallax photograph, with the CTA one tap away.
 *
 * Desktop: headline across the top, photo cols 5–12 sliding under lines 2–3, lede and
 * CTA bottom-left, caption on the photo. Phone: its own composition, not a stacked
 * copy: three-line headline, tall 4:5 photo offset right and tucked under the last
 * line, a vertical location label in the left margin, lede and CTA below.
 *
 * LCP: the photo renders visible in the HTML with fetchPriority high; motion only
 * ever moves it (transform), never hides it.
 */
export function Hero({ site }: { site: Site }) {
  return (
    <section
      data-parallax-scope=""
      aria-labelledby="hero-title"
      className="frame relative pt-[var(--space-4)] pb-[var(--section-m)] md:pt-[var(--space-6)]"
    >
      <div className="grid-editorial">
        <Parallax layer="mid" className="relative z-10 col-[1/-1] row-start-1">
          <h1 id="hero-title" className="display-xl font-light">
            <span className="block">
              Your <em>most</em>
            </span>
            <span className="block md:pl-[1.1em]">coveted</span>
            <span className="block md:pl-[2.6em]">wardrobe</span>
          </h1>
        </Parallax>

        {/* Vertical location label, phone only, set in the left margin beside the photo. */}
        <p
          aria-hidden="true"
          className="label col-[1/2] row-start-2 mt-[calc(var(--display-xl)*-0.35)] self-start pt-10 text-stone [writing-mode:vertical-rl] rotate-180 md:hidden"
        >
          New York · Remote
        </p>

        <div className="relative col-[2/5] row-start-2 -mt-[calc(var(--display-xl)*0.42)] md:col-[5/13] md:row-start-1 md:mt-[calc(var(--display-xl)*1.25)]">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[16/11]">
            <Parallax layer="bg" className="absolute inset-x-0 -inset-y-[10%]">
              <Image
                src="/images/placeholder/hero.jpg"
                alt="Placeholder image for the hero: the styling atelier"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 768px) 66vw, 75vw"
                className="object-cover"
              />
            </Parallax>
          </div>
          <Parallax layer="fg" className="absolute right-3 bottom-3 hidden md:block">
            <p className="label bg-ivory px-3 py-2 text-ink">
              In person in New York · Remote worldwide
            </p>
          </Parallax>
        </div>

        <div className="col-[1/-1] row-start-3 mt-10 md:col-[1/5] md:row-start-1 md:mt-0 md:self-end md:pb-2">
          <p className="lede max-w-[32ch]">{site.positioning}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={site.primaryCta.href}>{site.primaryCta.label}</Button>
            <Button href="/services" variant="text">
              Explore services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
