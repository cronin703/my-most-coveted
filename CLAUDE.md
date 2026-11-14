# CLAUDE.md — My Most Coveted

You are building the marketing website for **My Most Coveted**, a New York personal stylist (in-person + remote). The site's single job: turn visitors who love her taste into **30-minute consultation inquiries**, and give her a beautiful place to share her fashion point of view.

Read these before any work:
- `docs/BRIEF.md` — full product + design + motion + tech spec (source of truth)
- `docs/ROADMAP.md` — phases, acceptance criteria, current phase
- `docs/STITCH_REFERENCE.md` + `reference/*.jpg` — the original Google Stitch mockup we are improving on
- `.claude/skills/luxury-motion/SKILL.md` and `.claude/skills/editorial-layout/SKILL.md` — load before any motion or layout work

## Stack (decided — don't relitigate)
- Next.js (latest, App Router) + TypeScript (strict), static generation everywhere except the inquiry Server Action
- Tailwind CSS; design tokens as CSS variables in `styles/tokens.css`
- Motion: GSAP (+ ScrollTrigger, SplitText), Lenis smooth scroll, Motion (framer-motion) for component-level/hover, View Transitions API for route transitions
- Content: MDX/JSON in `/content`, validated with Zod. **Pages never import content files directly** — only through `lib/content.ts` (`getSite()`, `getServices()`, `getService(slug)`, `getLooks()`, `getLook(slug)`, `getTestimonials()`). This is what makes a future CMS (Keystatic/Sanity) a one-file swap.
- Email: Resend. Spam: honeypot + Cloudflare Turnstile. Analytics: Vercel Web Analytics + Speed Insights.
- Hosting: Vercel. Package manager: pnpm.

## Non-negotiables
1. **Mobile-first.** Design at 375px, verify at 375 / 768 / 1440. No horizontal page overflow.
2. **Accessibility: WCAG 2.1 AA.** Visible focus, keyboard-operable menu/cursor-free paths, alt text required by schema, contrast ≥ 4.5:1 (eyebrow labels too — the Stitch mockup failed this).
3. **`prefers-reduced-motion` respected everywhere** — Lenis off, parallax off, pinning off, reveals become ≤200ms opacity fades. Content must be fully readable with JS disabled.
4. **Performance budget:** LCP < 2.5s on mobile 4G, CLS < 0.05, Lighthouse ≥ 90 mobile / ≥ 95 desktop. Animate only `transform` and `opacity`. Lazy-load motion code after first paint; hero LCP image is never hidden behind JS.
5. **Placeholders are flagged.** Any placeholder content has `placeholder: true`. `pnpm check:placeholders` lists them; production builds (`VERCEL_ENV=production`) fail if any remain. Never invent press, client names, or credentials. Keep the only confirmed price ($1,650 Digital Lookbook); others show "From $—".
6. **One primary CTA:** "Book a consultation" → `/contact` (prefill `?service=<slug>` when coming from a service). Never more than one tap away.
7. No generic SaaS visuals: no gradients-everywhere, glassmorphism, emoji, stock "smiling team" photos, rounded-card grids of three. It should feel like a fashion magazine.

## Workflow
- Work one roadmap phase per session. Start by restating the phase goal + acceptance criteria, then propose a short plan before coding.
- After building UI, **verify in a browser**: screenshot at 375px and 1440px, test reduced-motion, tab through with keyboard. Fix before calling done.
- Run `pnpm lint && pnpm typecheck && pnpm build` before every commit. Commit at the end of each phase with a clear message; one branch per phase (`phase-1-foundation`, …) so Vercel creates a preview URL.
- Update the checkbox status in `docs/ROADMAP.md` as phases complete.
- When unsure about a brand/content decision, leave a `TODO(client):` comment and list it in your summary rather than guessing.

## Commands (create these in phase 1)
- `pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm typecheck`
- `pnpm test:e2e` (Playwright smoke: every route 200, form submits, menu opens/closes, reduced-motion renders)
- `pnpm check:placeholders`
