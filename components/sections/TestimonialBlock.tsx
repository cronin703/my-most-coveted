import type { Testimonial } from "@/lib/schema";
import { PlaceholderFlag } from "@/components/ui/PlaceholderFlag";
import { SplitHeading } from "@/components/motion/primitives";

export function TestimonialBlock({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="frame grid-editorial section-l">
      <blockquote className="col-span-4 md:col-span-9 md:col-start-2">
        <SplitHeading as="p" className="display-s font-display leading-[1.15] font-light italic">
          “{testimonial.quote}”
        </SplitHeading>
      </blockquote>
      <figcaption className="col-span-4 mt-8 flex items-center gap-4 md:col-span-6 md:col-start-2">
        <span className="label">
          {testimonial.name} <span className="text-stone">· {testimonial.context}</span>
        </span>
        <PlaceholderFlag show={testimonial.placeholder} />
      </figcaption>
    </figure>
  );
}
