import { getLooks, getServices, getSite } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { NavLinks } from "./NavLinks";
import { OverlayMenu } from "./OverlayMenu";

/** Sticky minimal header. "Book a consultation" stays one tap away at every width. */
export function Header() {
  const site = getSite();
  const [firstService] = getServices();
  const [firstLook] = getLooks();
  const hero = { src: "/images/placeholder/hero.jpg", alt: "" };

  // Preview image per section for the overlay menu (tablet and up).
  const previews: Record<string, { src: string; alt: string }> = {
    "/services": firstService?.heroImage ?? hero,
    "/lookbook": firstLook?.cover ?? hero,
    "/process": hero,
    "/about": hero,
  };
  const menuItems = [...site.nav, { label: "Contact", href: "/contact" }].map((item) => ({
    ...item,
    preview: previews[item.href] ?? hero,
  }));

  return (
    <header className="site-header sticky top-0 z-40 border-b border-line bg-ivory">
      <div className="frame relative flex h-[var(--header-h)] items-center justify-between gap-4">
        <Wordmark name={site.name} />

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks items={site.nav} />
        </nav>

        <div className="flex items-center gap-1 sm:gap-4">
          {/* Wrappers carry the visibility: Button's own inline-flex would override `hidden`. */}
          <div className="hidden sm:block">
            <Button href={site.primaryCta.href} className="!px-5" magnetic>
              {site.primaryCta.label}
            </Button>
          </div>
          <div className="sm:hidden">
            <Button
              href={site.primaryCta.href}
              className="!px-4"
              aria-label={site.primaryCta.label}
              magnetic={false}
            >
              Book
            </Button>
          </div>
          <div className="lg:hidden">
            <OverlayMenu
              items={menuItems}
              wordmark={site.name}
              cta={site.primaryCta}
              email={site.contact.email}
              instagram={site.social.instagram}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
