"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { dur, ease, mq } from "@/lib/motion";

/**
 * Custom cursor: a 10px dot that follows the pointer and grows into a 72px label
 * ("View", "Book") over elements with data-cursor. Desktop, fine pointer, motion
 * allowed only. Purely decorative: the native cursor stays, nothing depends on it.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const query = window.matchMedia(mq.full);
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!enabled || !dot || !label) return;

    const SIZE = 72;
    const REST = 10 / SIZE;
    gsap.set(dot, { xPercent: -50, yPercent: -50, scale: REST, opacity: 0 });
    const xTo = gsap.quickTo(dot, "x", { duration: dur.ui, ease: ease.soft });
    const yTo = gsap.quickTo(dot, "y", { duration: dur.ui, ease: ease.soft });
    let active: string | null = null;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      gsap.to(dot, { opacity: 1, duration: dur.hover, overwrite: "auto" });
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const next = target?.dataset.cursor ?? null;
      if (next === active) return;
      active = next;
      if (next) label.textContent = next;
      gsap.to(dot, { scale: next ? 1 : REST, duration: dur.ui, ease: ease.out });
      gsap.to(label, { opacity: next ? 1 : 0, duration: dur.hover });
    };
    const leave = () => gsap.to(dot, { opacity: 0, duration: dur.hover });

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      gsap.killTweensOf([dot, label]);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[60] flex h-[72px] w-[72px] items-center justify-center rounded-full bg-ink"
    >
      <span ref={labelRef} className="label text-ivory opacity-0" />
    </div>
  );
}
