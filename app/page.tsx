import { getLooks, getServices, getSite, getTestimonials } from "@/lib/content";
import { ChapterIndex } from "@/components/motion/ChapterIndex";
import { FinalCta } from "@/components/sections/FinalCta";
import { PressStrip } from "@/components/sections/PressStrip";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { EditIntro } from "@/components/sections/home/EditIntro";
import { Hero } from "@/components/sections/home/Hero";
import { LooksChapter } from "@/components/sections/home/LooksChapter";
import { OpeningSequence } from "@/components/sections/home/OpeningSequence";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { ServicesChapter } from "@/components/sections/home/ServicesChapter";

/**
 * Home: taste in five seconds, then a clear path to "Book a consultation".
 * Order follows BRIEF §4. Press strip renders nothing until real press is confirmed.
 */
export default function HomePage() {
  const site = getSite();
  const services = getServices();
  const looks = getLooks();
  const [testimonial] = getTestimonials();
  const editImage = looks[0]?.gallery[0] ?? looks[0]?.cover;

  return (
    <>
      <OpeningSequence />
      <ChapterIndex />
      <Hero site={site} />
      {editImage ? <EditIntro image={editImage} /> : null}
      <ServicesChapter services={services} />
      <LooksChapter looks={looks} />
      <ProcessSection />
      {testimonial ? (
        <div className="border-t border-line">
          <TestimonialBlock testimonial={testimonial} />
        </div>
      ) : null}
      <PressStrip items={[]} />
      <FinalCta />
    </>
  );
}
