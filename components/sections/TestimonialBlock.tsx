import type { Testimonial } from "@/lib/schema";
import { PlaceholderFlag } from "@/components/ui/PlaceholderFlag";

export function TestimonialBlock({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="frame grid-editorial section-l">
      <blockquote className="col-span-4 md:col-span-9 md:col-start-2">
        <p className="display-s font-display font-light italic leading-[1.15]">
          “{testimonial.quote}”
        </p>
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
