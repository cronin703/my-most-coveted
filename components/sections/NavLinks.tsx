"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/motion/PageTransition";

type Item = { label: string; href: string };

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop nav with aria-current on the active section. */
export function NavLinks({ items }: { items: Item[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-8">
      {items.map((item) => (
        <li key={item.href}>
          <TransitionLink
            href={item.href}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            className="label link-draw inline-flex min-h-11 items-center"
          >
            {item.label}
          </TransitionLink>
        </li>
      ))}
    </ul>
  );
}
