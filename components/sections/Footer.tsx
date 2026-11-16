import { TransitionLink as Link } from "@/components/motion/PageTransition";
import { getSite } from "@/lib/content";

export function Footer() {
  const site = getSite();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="frame grid-editorial gap-y-12 py-16 md:py-24">
        <div className="col-span-4 md:col-span-5">
          <p className="font-display text-[2.5rem] leading-none font-light italic">{site.name}</p>
          <p className="mt-4 max-w-[34ch] text-stone">{site.tagline}</p>
        </div>

        <nav aria-label="Footer" className="col-span-2 md:col-span-2 md:col-start-7">
          <p className="label mb-4 text-stone">Explore</p>
          <ul className="space-y-1">
            {[
              ...site.nav,
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-draw inline-flex min-h-11 items-center">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 md:col-span-3 md:col-start-10">
          <p className="label mb-4 text-stone">Get in touch</p>
          <ul className="space-y-1">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="link-draw inline-flex min-h-11 items-center break-all"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram}
                className="link-draw inline-flex min-h-11 items-center"
              >
                Instagram
              </a>
            </li>
          </ul>
          <p className="mt-4 text-[var(--text-small)] text-stone">{site.contact.serviceArea}</p>
          {/* Newsletter sign-up arrives later; not wired in v1. */}
        </div>

        <div className="col-span-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 md:col-span-12">
          <p className="label text-stone">
            © {year} {site.name}
          </p>
          <ul className="flex gap-6">
            <li>
              <Link
                href="/privacy"
                className="label link-draw inline-flex min-h-11 items-center text-stone"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="label link-draw inline-flex min-h-11 items-center text-stone"
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
