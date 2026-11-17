import Image from "next/image";
import type { Look } from "@/lib/schema";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { TransitionLink } from "@/components/motion/PageTransition";
import { PinnedHorizontal, PinnedPanel } from "@/components/motion/PinnedHorizontal";

/**
 * 03 Featured looks: a staggered sideways gallery, like turning a lookbook. Panels sit
 * at different heights on desktop; the final panel leads to the full lookbook.
 */
export function LooksChapter({ looks }: { looks: Look[] }) {
  return (
    <div className="section-m border-t border-line">
      <PinnedHorizontal label="Featured looks" className="looks-chapter">
        <PinnedPanel className="pin-panel--title">
          <ChapterLabel number="03">Featured looks</ChapterLabel>
          <h2 className="display-l mt-6 font-light">
            From the <em>lookbook</em>
          </h2>
          <p className="lede mt-6 max-w-[28ch] text-stone">
            Real wardrobes and real moments: the brief, the edit, the result.
          </p>
        </PinnedPanel>

        {looks.map((look, i) => (
          <PinnedPanel key={look.slug} className="pin-panel--look">
            <TransitionLink
              href={`/lookbook/${look.slug}`}
              data-cursor="View"
              className="group block"
            >
              <div className="overflow-hidden" style={{ viewTransitionName: `look-${look.slug}` }}>
                <Image
                  data-pin-drift=""
                  src={look.cover.src}
                  alt={look.cover.alt}
                  width={1200}
                  height={1500}
                  sizes="(min-width: 1024px) 28vw, 82vw"
                  className="aspect-[4/5] w-full scale-[1.14] object-cover transition-transform duration-[600ms] ease-[var(--ease-out)]"
                />
              </div>
              <p className="label mt-4 text-stone">
                <span className="text-ink">{String(i + 1).padStart(2, "0")}</span> · {look.category}
              </p>
              <h3 className="mt-2 font-display text-[1.75rem] leading-tight font-normal group-hover:italic">
                {look.title}
              </h3>
            </TransitionLink>
          </PinnedPanel>
        ))}

        <PinnedPanel className="pin-panel--title pin-panel--end">
          <TransitionLink href="/lookbook" className="group block">
            <span className="label text-stone">The full lookbook</span>
            <span className="display-m mt-4 block font-light group-hover:italic">
              View every look <span aria-hidden="true">→</span>
            </span>
          </TransitionLink>
        </PinnedPanel>
      </PinnedHorizontal>
    </div>
  );
}
