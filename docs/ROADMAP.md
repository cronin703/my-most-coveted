# Roadmap — My Most Coveted v1

~16 working days, 6 phases. One phase per Claude Code session, one branch per phase, a Vercel preview link at the end of each for client review. Tick boxes as you go.

---

## Phase 1 — Foundation (days 1–2) · branch `phase-1-foundation`
- [ ] Scaffold Next.js (App Router, TS strict, Tailwind, ESLint, Prettier, pnpm)
- [ ] `styles/tokens.css` with the color/type/spacing tokens from BRIEF §5; fonts via `next/font`
- [ ] `lib/schema.ts` (Zod: Site, Service, Look, Testimonial) + `lib/content.ts` data layer
- [ ] Load the placeholder content in `/content` (already provided) and validate it at build time
- [ ] Every route from the sitemap exists with a simple styled skeleton + header/footer
- [ ] `scripts/check-placeholders.ts` + `pnpm check:placeholders`; fail prod builds if placeholders remain
- [ ] `.env.example`; deploy to Vercel
- **Done when:** all routes render on a preview URL, `pnpm build` passes, content is typed end-to-end.

> Prompt: "Read CLAUDE.md, docs/BRIEF.md and docs/ROADMAP.md. Start Phase 1. Restate the acceptance criteria, propose a plan, then build it. Verify every route renders at 375px and 1440px before finishing."

## Phase 2 — Design system & motion engine (days 3–5) · `phase-2-system`
- [ ] UI primitives + section components (BRIEF §5 list), wordmark SVG
- [ ] `lib/motion.ts` tokens; `components/motion/*`: SmoothScroll (Lenis↔GSAP ticker), Reveal, SplitHeading, Parallax, ImageReveal, PinnedHorizontal, Cursor, Magnetic, PageTransition
- [ ] Global reduced-motion handling (`gsap.matchMedia`) + no-JS fallback
- [ ] Overlay menu with focus trap, Esc to close, focus restore
- [ ] `/styleguide` (noindex) showing every component and motion pattern
- **Done when:** styleguide works at 375/1440, with reduced-motion on/off, keyboard-only; Lighthouse ≥ 90 mobile on /styleguide.

> Prompt: "Load the luxury-motion and editorial-layout skills. Start Phase 2…"

## Phase 3 — Home page, the showpiece (days 6–8) · `phase-3-home`
- [ ] Opening sequence (once per session)
- [ ] Parallax hero with type-as-image headline + "Book a consultation"
- [ ] 01 The Edit intro → 02 Services pinned horizontal chapter → 03 Featured looks → 04 Process → testimonial → final CTA
- [ ] Mobile composition designed on its own terms (not just a stacked version of desktop)
- **Done when:** client review; LCP < 2.5s mobile; CLS < 0.05; no jank in a Chrome performance trace.

## Phase 4 — Remaining pages (days 9–12) · `phase-4-pages`
- [ ] /services + 7 service detail pages (one template)
- [ ] /lookbook (filter) + entry template with View Transition morph
- [ ] /process, /about, /faq, /contact, /privacy, /terms, 404
- **Done when:** every sitemap route is complete with placeholder content and passes a11y checks.

## Phase 5 — Leads, SEO, analytics (days 13–14) · `phase-5-leads`
- [ ] Inquiry Server Action, Zod validation, honeypot + Turnstile, Resend emails (her + client confirmation), graceful dev fallback
- [ ] `?service=` prefill; inline form on service pages
- [ ] Metadata, OG images, JSON-LD, sitemap, robots, canonicals
- [ ] Vercel Analytics + custom events
- **Done when:** a test inquiry reaches the inbox; Playwright e2e passes; Lighthouse SEO 100.

## Phase 6 — QA & launch (days 15–16) · `phase-6-launch`
- [ ] WCAG 2.1 AA audit (run ux-audit + accessibility skills), keyboard + screen reader pass
- [ ] Device matrix: iOS Safari, Android Chrome, desktop Safari/Chrome/Firefox
- [ ] Swap in real content; `pnpm check:placeholders` clean
- [ ] Domain, HTTPS, www redirect, Resend domain SPF/DKIM, Search Console, Google Business Profile
- **Done when:** launch checklist in BRIEF/plan is fully ticked.

---

## Later add-ons (not v1)
1. Keystatic or Sanity CMS (swap `lib/content.ts`) · 2. Cal.com booking + Stripe deposits · 3. Style intake questionnaire · 4. Journal/newsletter · 5. Client portal for Digital Lookbook clients
