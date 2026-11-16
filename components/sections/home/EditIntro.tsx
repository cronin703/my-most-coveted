import Image from "next/image";
import type { Look } from "@/lib/schema";
import { Button } from "@/components/ui/Button";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { ImageReveal, Reveal, SplitHeading } from "@/components/motion/primitives";

/**
 * 01 The Edit. Asymmetric: a portrait image bleeds off the left edge and drops
 * below the statement, which sits high on the right.
 * TODO(client): intro paragraph in her voice, from the interview.
 */
export function EditIntro({ image }: { image: Look["cover"] }) {
  return (
    <section aria-labelledby="edit-title" className="section-l border-t border-line">
      <div className="frame grid-editorial gap-y-12">
        <div className="col-span-4 md:col-span-6 md:col-start-6 md:row-start-1">
          <ChapterLabel number="01">The Edit</ChapterLabel>
          <SplitHeading id="edit-title" className="display-m mt-6 font-light">
            I edit what you own, find what’s <em>missing</em>, and dress you for the moments that
            matter.
          </SplitHeading>
          <Reveal className="mt-8">
            <p className="measure text-stone">
              Placeholder introduction. A short, warm paragraph in her own voice about how she works
              and who she works with will go here after the client interview.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-6">
            <Button href="/about" variant="text">
              About me
            </Button>
          </Reveal>
        </div>
        <div className="col-span-3 -ml-[var(--page-margin)] md:col-span-4 md:row-start-1 md:mt-[var(--space-20)]">
          <ImageReveal>
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={1500}
              sizes="(min-width: 768px) 34vw, 75vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
