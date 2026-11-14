"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

type Item = { label: string; href: string };

/**
 * Phase 1 mobile menu: a simple disclosure panel under the header.
 * Phase 2 replaces it with the full-screen overlay (focus trap, image preview).
 */
export function MobileMenu({ items, email }: { items: Item[]; email: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="label inline-flex min-h-11 min-w-11 items-center justify-center"
      >
        {open ? "Close" : "Menu"}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-ivory"
      >
        <nav aria-label="Main" className="frame pt-4 pb-8">
          <ul>
            {items.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="flex min-h-14 items-baseline gap-4 py-3"
                >
                  <span className="label text-stone">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[2rem] leading-none font-light">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${email}`}
            className="label mt-6 inline-flex min-h-11 items-center text-stone"
          >
            {email}
          </a>
        </nav>
      </div>
    </>
  );
}
