"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { dur, ease, mq, parallax, reveal, stagger, type ParallaxLayer } from "@/lib/motion";
import { registerScroller } from "@/lib/scroll-lock";
import { Cursor } from "./Cursor";

/**
 * The single motion engine. Loaded lazily after first paint (see MotionRoot), it
 * scans the page for data-attributes written by the server-rendered motion
 * primitives (Reveal, SplitHeading, ImageReveal, Parallax, PinnedHorizontal,
 * Magnetic, WordmarkDraw, ChapterIndex) and wires them up per route.
 *
 * No-flash rule: an element that is already on screen when the engine starts is
 * left alone. Only off-screen elements are set to their "before" state, so nothing
 * visible ever disappears, and with JS off everything simply renders in place.
 */

let lenis: Lenis | null = null;

function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y });
}

/** True when the element starts below the reveal line, i.e. not yet seen. */
function isBelowFold(el: Element) {
  return el.getBoundingClientRect().top > window.innerHeight * 0.85;
}

const once = (trigger: Element) =>
  ({ trigger, start: reveal.start, once: true }) satisfies ScrollTrigger.Vars;

function setupReveals(reduce: boolean, full: boolean) {
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    if (!isBelowFold(el)) return;
    const delay = Number(el.dataset.revealDelay ?? 0);
    if (reduce) {
      gsap.from(el, { opacity: 0, duration: dur.reduced, scrollTrigger: once(el) });
      return;
    }
    gsap.from(el, {
      y: full ? reveal.distance : reveal.liteDistance,
      opacity: 0,
      duration: dur.reveal,
      ease: ease.out,
      delay,
      clearProps: "transform,opacity",
      scrollTrigger: once(el),
    });
  });
}

function setupSplitHeadings(reduce: boolean) {
  gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
    if (!isBelowFold(el)) return;
    if (reduce) {
      gsap.from(el, { opacity: 0, duration: dur.reduced, scrollTrigger: once(el) });
      return;
    }
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 100,
          duration: dur.reveal,
          ease: ease.out,
          stagger: stagger.lines,
          scrollTrigger: once(el),
        }),
    });
  });
}

function setupImageReveals(reduce: boolean, full: boolean) {
  if (reduce) return; // static under reduced motion
  gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((el) => {
    if (!isBelowFold(el)) return; // never mask an image that is already visible (LCP)
    const inner = el.querySelector("img");
    const tl = gsap.timeline({ scrollTrigger: once(el) });
    tl.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: dur.hero,
        ease: ease.inOut,
        clearProps: "clipPath",
      },
    );
    if (inner) {
      tl.from(
        inner,
        {
          scale: full ? 1.15 : 1.08,
          duration: dur.hero + 0.2,
          ease: ease.out,
          clearProps: "transform",
        },
        0,
      );
    }
  });
}

function setupParallax(full: boolean) {
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const layer = (el.dataset.parallax ?? "bg") as ParallaxLayer;
    const strength = (parallax[layer] ?? parallax.bg) * (full ? 1 : 0.5);
    const scope = el.closest<HTMLElement>("[data-parallax-scope]") ?? el;
    // Already on screen at load (the hero): start at the top of the page so the layout
    // is exactly as designed until the visitor scrolls.
    const onScreen = scope.getBoundingClientRect().top < window.innerHeight;
    gsap.to(el, {
      yPercent: strength * 100,
      ease: "none",
      scrollTrigger: {
        trigger: scope,
        start: onScreen ? 0 : "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

/** Desktop only: pin the section and translate the track sideways. */
function setupPinned() {
  const cleanups: (() => void)[] = [];
  gsap.utils.toArray<HTMLElement>("[data-pin]").forEach((section) => {
    const track = section.querySelector<HTMLElement>("[data-pin-track]");
    if (!track) return;
    section.classList.add("is-pinned");
    const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        // Pin just below the sticky header so nothing slides underneath it.
        start: () =>
          `top ${document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0}`,
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Inner images drift ±6% against the track for depth.
    track.querySelectorAll<HTMLElement>("[data-pin-drift]").forEach((img) => {
      gsap.fromTo(
        img,
        { xPercent: -6 },
        {
          xPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        },
      );
    });

    // Keyboard: focusing a panel scrolls the page so the panel is in view.
    const onFocus = (event: FocusEvent) => {
      const panel = (event.target as HTMLElement).closest<HTMLElement>("[data-pin-panel]");
      const st = tween.scrollTrigger;
      if (!panel || !st) return;
      // The browser's own scroll-into-view nudges the clipped section sideways; undo it,
      // then scroll the page so the track brings this panel to the left margin.
      section.scrollLeft = 0;
      track.scrollLeft = 0;
      const margin = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const progress = gsap.utils.clamp(
        0,
        1,
        (panel.offsetLeft - margin) / Math.max(1, distance()),
      );
      scrollToY(st.start + progress * (st.end - st.start));
    };
    section.addEventListener("focusin", onFocus);
    cleanups.push(() => {
      section.removeEventListener("focusin", onFocus);
      section.classList.remove("is-pinned");
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/** CTAs drift up to 8px toward the pointer. Desktop, motion allowed. */
function setupMagnetic() {
  const cleanups: (() => void)[] = [];
  gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: dur.hover, ease: ease.soft });
    const yTo = gsap.quickTo(el, "y", { duration: dur.hover, ease: ease.soft });
    const clamp = gsap.utils.clamp(-8, 8);
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo(clamp((e.clientX - (r.left + r.width / 2)) * 0.3));
      yTo(clamp((e.clientY - (r.top + r.height / 2)) * 0.3));
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { clearProps: "transform" });
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

/** Wordmark draws its outline, then the filled letters fade in over it. */
function setupWordmarkDraw(reduce: boolean, full: boolean) {
  if (reduce) return; // static, already filled
  gsap.utils.toArray<SVGSVGElement>("[data-wordmark-draw]").forEach((svg) => {
    const strokes = svg.querySelectorAll<SVGPathElement>("[data-stroke] path");
    const fill = svg.querySelector("[data-fill]");
    strokes.forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
    const tl = gsap.timeline({ scrollTrigger: once(svg) });
    tl.set(svg.querySelector("[data-stroke]"), { opacity: 1 })
      .to(strokes, {
        strokeDashoffset: 0,
        duration: full ? 0.9 : 0.6,
        ease: ease.inOut,
        stagger: 0.04,
      })
      .fromTo(fill, { opacity: 0 }, { opacity: 1, duration: dur.ui, ease: ease.soft }, "-=0.2")
      .to(svg.querySelector("[data-stroke]"), { opacity: 0, duration: dur.ui }, "<");
  });
}

/** Slim progress line on the right edge (desktop). */
function setupChapterProgress() {
  gsap.utils.toArray<HTMLElement>("[data-chapter-progress]").forEach((bar) => {
    gsap.fromTo(
      bar,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: 0, end: "max", scrub: true },
      },
    );
  });
}

export default function MotionController() {
  const pathname = usePathname();

  // Smooth scroll: Lenis on the GSAP ticker, off entirely under reduced motion.
  useEffect(() => {
    const reduceQuery = window.matchMedia(mq.reduce);
    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      registerScroller(lenis);
    };
    const stop = () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      registerScroller(null);
    };
    const onChange = (e: MediaQueryListEvent) => (e.matches ? stop() : start());

    if (!reduceQuery.matches) start();
    reduceQuery.addEventListener("change", onChange);
    return () => {
      reduceQuery.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  // Page effects: rebuilt on every route change, fully reverted on the way out.
  useEffect(() => {
    let cancelled = false;
    const mm = gsap.matchMedia();

    const init = () => {
      if (cancelled) return;
      mm.add({ reduce: mq.reduce, full: mq.full, lite: mq.lite }, (context) => {
        const { reduce = false, full = false } = context.conditions ?? {};
        setupReveals(reduce, full);
        setupSplitHeadings(reduce);
        setupImageReveals(reduce, full);
        setupWordmarkDraw(reduce, full);
        setupChapterProgress();
        const cleanups: (() => void)[] = [];
        if (!reduce) setupParallax(full);
        if (full) {
          cleanups.push(setupPinned());
          cleanups.push(setupMagnetic());
        }
        return () => cleanups.forEach((fn) => fn());
      });
      ScrollTrigger.refresh();
    };

    // Split text needs final font metrics; wait for fonts, then the next frame.
    document.fonts.ready.then(() => requestAnimationFrame(init));

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, [pathname]);

  return <Cursor />;
}
