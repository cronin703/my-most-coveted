import { getSite } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/** Sticky minimal header. "Book a consultation" stays one tap away at every width. */
export function Header() {
  const site = getSite();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory">
      <div className="frame relative flex h-[var(--header-h)] items-center justify-between gap-4">
        <Wordmark name={site.name} />

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks items={site.nav} />
        </nav>

        <div className="flex items-center gap-1 sm:gap-4">
          {/* Wrappers carry the visibility: Button's own inline-flex would override `hidden`. */}
          <div className="hidden sm:block">
            <Button href={site.primaryCta.href} className="!px-5">
              {site.primaryCta.label}
            </Button>
          </div>
          <div className="sm:hidden">
            <Button
              href={site.primaryCta.href}
              className="!px-4"
              aria-label={site.primaryCta.label}
            >
              Book
            </Button>
          </div>
          <div className="lg:hidden">
            <MobileMenu items={site.nav} email={site.contact.email} />
          </div>
        </div>
      </div>
    </header>
  );
}
