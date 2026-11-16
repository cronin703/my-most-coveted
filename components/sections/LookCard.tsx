import Image from "next/image";
import { TransitionLink as Link } from "@/components/motion/PageTransition";
import type { Look } from "@/lib/schema";

/** 4:5 look card, caption in small caps below. */
export function LookCard({ look, eager = false }: { look: Look; eager?: boolean }) {
  return (
    <article className="group">
      <Link href={`/lookbook/${look.slug}`} className="block" data-cursor="View">
        <div className="overflow-hidden">
          <Image
            src={look.cover.src}
            alt={look.cover.alt}
            width={1200}
            height={1500}
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="aspect-[4/5] w-full object-cover transition-transform duration-[600ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
          />
        </div>
        <p className="label mt-4 text-stone">{look.category}</p>
        <h3 className="mt-2 font-display text-[1.75rem] leading-tight font-normal">{look.title}</h3>
        <p className="mt-2 text-stone">{look.summary}</p>
      </Link>
    </article>
  );
}
