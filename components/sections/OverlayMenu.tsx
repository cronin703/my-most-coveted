"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { TransitionLink } from "@/components/motion/PageTransition";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

type Item = { label: string; href: string; preview?: { src: string; alt: string } };

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen overlay menu (below 1024px). Dialog semantics, focus trapped inside,
 * Escape closes, focus returns to the Menu button. Oversized numbered serif links;
 * from 768px a preview image of the hovered or focused section fills the right half.
 * Motion is CSS only (clip-path + transform/opacity) and collapses under reduced motion.
 */
export function OverlayMenu({
  items,
  wordmark,
  cta,
  email,
  instagram,
}: {
  items: Item[];
  wordmark: string;
  cta: { label: string; href: string };
  email: string;
  instagram: string;
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const pathname = usePathname();
  const dialogId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  // Close when the route changes (link chosen).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    lockScroll();
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen(true)}
        className="label inline-flex min-h-11 min-w-11 items-center justify-center"
      >
        Menu
      </button>

      <div
        ref={dialogRef}
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        data-open={open}
        className="overlay-menu fixed inset-0 z-50 flex flex-col bg-ivory"
      >
        <div className="frame flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-line">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG wordmark */}
          <img
            src="/wordmark.svg"
            alt={wordmark}
            width={13607}
            height={2422}
            className="h-[26px] w-auto sm:h-[30px]"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={() => close()}
            className="label inline-flex min-h-11 min-w-11 items-center justify-center"
          >
            Close
          </button>
        </div>

        <div className="frame grid min-h-0 flex-1 md:grid-cols-2 md:gap-[var(--gutter)]">
          <nav aria-label="Main" className="flex flex-col justify-center overflow-y-auto py-8">
            <ul>
              {items.map((item, i) => (
                <li
                  key={item.href}
                  className="overlay-item"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <TransitionLink
                    href={item.href}
                    aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                    onPointerEnter={() => setPreview(i)}
                    onFocus={() => setPreview(i)}
                    onClick={() => close(false)}
                    className="group flex items-baseline gap-4 py-2 md:gap-6"
                  >
                    <span className="label w-6 text-stone">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[clamp(2.75rem,11vw,5.5rem)] md:text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[1.02] font-light transition-[font-style] group-hover:italic group-aria-[current=page]:italic">
                      {item.label}
                    </span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div aria-hidden="true" className="relative hidden overflow-hidden md:my-8 md:block">
            {items.map((item, i) =>
              item.preview ? (
                <Image
                  key={item.href}
                  src={item.preview.src}
                  alt=""
                  fill
                  sizes="50vw"
                  data-active={preview === i}
                  className="overlay-preview object-cover"
                />
              ) : null,
            )}
          </div>
        </div>

        <div className="frame flex shrink-0 flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line py-5">
          <TransitionLink
            href={cta.href}
            onClick={() => close(false)}
            className="label inline-flex min-h-11 items-center bg-ink px-6 text-ivory"
          >
            {cta.label}
          </TransitionLink>
          <div className="flex flex-wrap gap-x-6">
            <a href={instagram} className="label link-draw inline-flex min-h-11 items-center">
              Instagram
            </a>
            <a
              href={`mailto:${email}`}
              className="label link-draw inline-flex min-h-11 items-center text-stone"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
