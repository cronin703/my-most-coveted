# My Most Coveted — Website Brief (source of truth)

_Last updated: 2026-11-14. Companion plan doc: https://claude.ai/artifact/Lbms6gTB9YB49suJ7mBLod_

## 1. Summary & goals
Rebuild the Google Stitch mockup ("My Most Coveted") as a production Next.js site on Vercel. V1 is a **marketing site only** (no booking engine, payments, portal). It must be **CMS-ready** so a self-edit CMS can be bolted on later without a rebuild.

**Client:** NYC personal stylist offering in-person (closet edits, fittings, event styling) and remote (curated shopping links, digital lookbooks) services.

**Success (first 90 days):**
- Working inquiry flow; every lead in her inbox within 1 minute
- 2–4% visitor → inquiry conversion (set real baseline after launch)
- Lighthouse 95+ (perf, a11y, SEO) desktop; 90+ mobile
- A single shareable link that shows her taste better than her Instagram grid
- Placeholders swapped for real content in 2–3 weeks with zero layout code changes

**Out of scope v1:** online booking, deposits, intake quiz, client login, e-commerce, blog engine.

## 2. Review of the Stitch mockup (what to keep / fix)
| Area | Keep | Fix / add |
|---|---|---|
| Brand | Script wordmark, editorial serif, ivory bg, monochrome, whitespace | Formalize as tokens; eyebrow labels too small/low-contrast |
| Nav | Small caps nav; numbered service list | Dropdown stuck open, covers hero; no mobile menu; "Digital Lookbook" is both a nav page and a service |
| Hero | Single headline, primary + secondary CTA | Headline + primary CTA obscured; CTA goal unclear |
| Services | Numbered tiers; Tier 03 has turnaround/delivery/looks/price | 6 services in nav vs 3 cards; Tier 02 empty; Tier 01 no price; cards inconsistent |
| Imagery | Rich interior hero w/ caption | Grey placeholders on mobile; "Architectural Digest" claim unverified — remove until confirmed |
| Process | 3 steps beginning with a low-commitment call | Lowercase "my styling methodology"; no CTA at end |
| Missing | — | About, portfolio, testimonials, press, FAQ, inquiry form, contact, footer, SEO, legal |

See `docs/STITCH_REFERENCE.md` for the captured copy and `reference/` for screenshots.

## 3. Positioning & lead strategy
**One conversion:** request a 30-minute consultation.

**Working positioning line (replace with her voice):** A New York stylist who edits what you own, finds what's missing, and dresses you for the moments that matter — in person or remotely.

**Audiences**
- Busy professionals → Closet Clean, Day-to-Day Styling
- Event clients (weddings, galas, press) → Event Styling (high intent, time-sensitive)
- Remote / outside NYC → Just Links, Digital Lookbook

**Lead path:** discover (IG / referral / Google "NYC personal stylist") → land on Home or a service page, taste is obvious in 5 seconds → trust (story, portfolio, testimonials, transparent pricing) → short inquiry form → instant confirmation email + her reply within 24h.

**Sharing her vision:** Lookbook entries are individually shareable pages with rich OG images; IG link-in-bio uses UTM-tagged URLs; secondary CTA everywhere is "Follow on Instagram".

## 4. Sitemap & page specs
Nav: **Services · Lookbook · The Process · About** + persistent **Book a consultation** button. (Rename nav "Digital Lookbook" → "Lookbook"; the *service* keeps the name Digital Lookbook.)

| Page | Route | Purpose | Sections |
|---|---|---|---|
| Home | `/` | Taste in 5s → consult | Opening sequence, parallax hero + CTA, 01 The Edit (intro), 02 Services (horizontal chapter), 03 Featured looks, 04 The Process, testimonial, press strip (only if real), final CTA |
| Services | `/services` | Compare all 6 | Intro, 6 consistent entries (who it's for, includes, turnaround, format, from-price), "Not sure? Start with a consult" |
| Service detail ×6 | `/services/[slug]` | Shareable per offering | Hero, who it's for, what's included, process, deliverables, price, FAQs, related services, inline inquiry form (prefilled) |
| Lookbook | `/lookbook` | Portfolio + POV | Filterable grid: Everyday · Event · Closet Edits · Remote |
| Lookbook entry | `/lookbook/[slug]` | One story | Gallery, brief → edit → result, outfit formula, related service |
| The Process | `/process` | How it works | 4 steps: Consult → Curation → Fitting & Sourcing → Ongoing Guidance; what to prepare |
| About | `/about` | Trust | Portrait, story, philosophy, credentials, IG |
| Contact | `/contact` | Conversion | Form, what happens next, email, service area, response time |
| FAQ | `/faq` | Objections | Pricing, travel, remote, budgets, shopping links |
| Legal | `/privacy`, `/terms` | Required | Plain-language |
| 404 | — | Recovery | Branded, links Home/Services |
| Styleguide | `/styleguide` (noindex) | Internal | Every component + motion pattern |

Global: sticky minimal header (wordmark + nav, full-screen overlay menu on mobile and optionally desktop), persistent "Book" CTA, footer (IG, email, service area, newsletter placeholder — not wired v1).

### Services (6) — slugs and data shape
1. `phone-consultation` — 30-Minute Phone Consultation (entry point; the CTA destination)
2. `just-links` — Just Links (remote curated shopping links)
3. `closet-clean` — In-Person Closet Clean (wardrobe audit & gap analysis)
4. `day-to-day-styling` — Day-to-Day Styling + Links
5. `event-styling` — Event Styling + Links (galas, weddings, press appearances)
6. `the-works` — The Works (full-service)
Plus the Stitch "Digital Lookbook" tier ($1,650, 10 business days, interactive PDF dossier + sourcing app, 20 tailored outfits with direct links) — treat as **`digital-lookbook`**, a 7th service OR the premium remote option within "Just Links". `TODO(client)`: confirm. Default: include it as a 7th service card.

Service schema: `title, slug, tagline, order, mode ('in-person'|'remote'|'hybrid'), whoFor, includes[], turnaround, format, priceFrom (number|null), faqs[{q,a}], heroImage{src,alt}, placeholder`.

## 5. Design system
Quiet luxury: ivory canvas, ink type, photography as the only color.

| Token | Direction |
|---|---|
| Wordmark | Script "My Most Coveted" as inline SVG (recreate from reference; `TODO(client)` final file) |
| Display | High-contrast editorial serif — Cormorant Garamond (free) default; Canela if licensed. Light weights, huge sizes, mixed italic/roman |
| Body | Serif 17–18px (EB Garamond) or Inter for UI; measure 60–72ch |
| Labels | Tracked small caps ≥ 12px, ≥ 4.5:1 contrast |
| Color | `--ivory #FAF8F5`, `--ink #111111`, `--stone #6B6560` (secondary text, check contrast), `--line #E7E2DB`, `--accent #A8854A` antique gold (links/focus only) |
| Spacing | 8pt scale; section padding 96–160px desktop, 64–96px mobile |
| Imagery | Full-bleed editorial, warm grade, 4:5 portraits for looks; next/image AVIF/WebP + blur |
| Components | Button (solid/outline/text-arrow), ServiceEntry, LookCard, Testimonial, PressStrip, Field/Select/Textarea, Accordion, Header, OverlayMenu, Footer, Cursor, ChapterIndex |

### Creative direction — editorial experience, not a template
- Asymmetric 12-col editorial grid; images break the grid, overlap type, sit at different depths. **No three-identical-card rows.**
- Type as image: display headlines up to ~20vw that images slide behind; magazine-cover composition.
- Horizontal chapters: Services and Featured Looks pin and scroll sideways like a lookbook spread (desktop).
- Custom cursor that morphs into "View" over looks / "Book" over CTAs (desktop, pointer:fine only).
- Magazine chapter numbering (01 The Edit, 02 Services, 03 The Process…) + slim progress indicator.
- Full-screen overlay menu, oversized serif links, hover image preview.
- **Guardrail:** every unconventional pattern has a plain, accessible fallback (mobile, reduced-motion, screen reader, no-JS).

### Motion & parallax system
Slow, weighted, intentional. Nothing bounces. Full rules in `.claude/skills/luxury-motion/SKILL.md`.

| Moment | Effect | Tool |
|---|---|---|
| Global | Inertial smooth scroll | Lenis (synced to GSAP ticker) |
| First load | Wordmark draws in → hero unmasks from a hairline to full-bleed (~1.2s, once per session via sessionStorage) | GSAP timeline |
| Hero | Layered parallax: bg image / headline / foreground at different speeds | ScrollTrigger |
| Headings | Line-by-line masked rise | SplitText |
| Images | clip-path reveal + scale 1.15 → 1.0 | ScrollTrigger |
| Services / Looks | Pinned horizontal scroll with inner image drift | ScrollTrigger pin |
| Routes | Cross-fade; clicked look image morphs into detail hero | View Transitions API (Motion fallback) |
| Micro | Magnetic CTAs, 2–3% image zoom, drawn underlines | Motion / CSS |
| Phase 2 option | Subtle WebGL hover distortion on hero imagery | R3F or OGL, only if perf budget holds |

Easing tokens in `lib/motion.ts`: `ease.out = 'expo.out'`/`cubic-bezier(0.16,1,0.3,1)`, `ease.inOut = 'power3.inOut'`; durations: reveal 0.9–1.4s, hover 0.3s, route 0.6s; stagger 0.08s.

## 6. Technical architecture
| Layer | Choice |
|---|---|
| Framework | Next.js App Router, TS strict, SSG |
| Styling | Tailwind + CSS-variable tokens |
| Motion | GSAP (ScrollTrigger, SplitText — free since GSAP 3.13), Lenis, Motion, View Transitions |
| Content v1 | MDX + JSON in `/content`, Zod schemas in `lib/schema.ts`, access only via `lib/content.ts` |
| Content later | Keystatic (git-based) or Sanity — swap `lib/content.ts` only |
| Images | next/image, AVIF/WebP, blur placeholders, explicit sizes |
| Form | Server Action → Resend (to her + confirmation to client); honeypot + Turnstile; Zod validation |
| Analytics | Vercel Web Analytics + Speed Insights; custom events |
| Quality | ESLint, Prettier, Playwright smoke, Lighthouse CI on previews |
| Hosting | Vercel previews per branch; prod on her domain |

Repo layout:
```
app/            routes
components/     ui/ (primitives) + sections/ + motion/ (SmoothScroll, Reveal, Parallax, SplitHeading, PinnedHorizontal, Cursor, PageTransition)
content/        site.json, services/*.mdx, looks/*.mdx, testimonials.json
lib/            content.ts, schema.ts, motion.ts, email.ts, seo.ts, analytics.ts
public/         wordmark.svg, images/placeholder/*
styles/         tokens.css, globals.css
scripts/        check-placeholders.ts
```

Env vars: `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`. Provide `.env.example`. The form must degrade gracefully (log + show success in dev) when keys are absent.

## 7. Lead capture, SEO, analytics
**Form:** name, email, service (select incl. "Not sure yet"), message, how did you hear (select). Optional: event date, Instagram handle. Validate on blur, clear errors instantly, friendly copy, verb-first button ("Request a consultation"). Success state explains next steps. Prefill service from `?service=`.

**SEO:** per-page metadata + generated OG images (`opengraph-image.tsx`); JSON-LD `ProfessionalService` (areaServed: New York City + remote), `Service` per offering, `FAQPage`; sitemap.xml, robots.txt, canonicals; alt text required in schema. Target terms: "NYC personal stylist", "closet edit New York", "event stylist NYC", "virtual stylist".

**Analytics events:** `cta_click {location}`, `form_start`, `form_submit {service}`, `instagram_click`, `look_open {slug}`.

## 8. Content & placeholders
- Images: Unsplash/Pexels editorial fashion/interiors, warm grade, final aspect ratios. Never fabricate a portrait of "her" — About portrait is a labelled frame until real.
- Copy: in her likely voice — warm, confident, concise, first person ("I"), never salesy. Capitalize properly.
- Prices: only $1,650 (Digital Lookbook) confirmed; others `priceFrom: null` → "From $—" / "Inquire".
- Testimonials: 3 samples flagged `placeholder: true`, shown with a "Sample" badge outside production.
- No press logos or "As featured in" until confirmed.

## 9. Open questions (track as `TODO(client)`)
Final business name & domain · public prices vs ranges · lead revenue service · is the Atelier Dressing Suite a real, photographable space · who answers inquiries + response time · Digital Lookbook as its own service or part of Just Links.
