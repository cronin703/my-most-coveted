import { getSite } from "@/lib/content";
import { Button } from "@/components/ui/Button";

/** Closing call to action used at the foot of most pages. */
export function FinalCta({ line = "Let’s begin.", href }: { line?: string; href?: string }) {
  const site = getSite();
  return (
    <section className="frame section-l border-t border-line">
      <h2 className="display-xl">{line}</h2>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button href={href ?? site.primaryCta.href}>{site.primaryCta.label}</Button>
        <p className="label text-stone">Replies {site.contact.responseTime.toLowerCase()}</p>
      </div>
    </section>
  );
}
