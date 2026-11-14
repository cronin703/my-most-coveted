# Kickoff prompt — paste this into Claude Code

> Copy everything inside the box below into Claude Code, run from the root of this folder.

```
You're building the website for "My Most Coveted," a New York personal stylist. This folder is a starter kit, not an app yet.

1. Read CLAUDE.md, then docs/BRIEF.md, docs/ROADMAP.md and docs/STITCH_REFERENCE.md. Look at every image in /reference. Those are screenshots of the Google Stitch mockup we're improving on: keep its mood, fix its problems.
2. Load the project skills in .claude/skills/ (luxury-motion, editorial-layout). Also use the frontend-design skill and any installed UX skills (motion, reduced-motion, transitions, typography, spacing, viewports, anti-slop, ux-audit) if available.
3. Summarize back to me, in under 15 lines: the goal, the stack, the non-negotiables, and the 6 phases. List any contradictions or open questions you notice.
4. Then start Phase 1 (Foundation). Restate its acceptance criteria, propose a short plan, and build it. Scaffold Next.js into this folder without deleting the kit files (docs/, reference/, content/, .claude/, CLAUDE.md). Wire the provided /content files through lib/schema.ts and lib/content.ts.
5. Before you finish: run lint, typecheck and build; open the dev server and check every route at 375px and 1440px; tick the Phase 1 boxes in docs/ROADMAP.md; commit on branch phase-1-foundation; tell me what's done, what's left, and any TODO(client) items.

Don't jump ahead to later phases. Ask me before adding any dependency not named in CLAUDE.md.
```

## Prompts for the following sessions
- **Phase 2:** "Read CLAUDE.md and docs/ROADMAP.md. Load luxury-motion and editorial-layout. Start Phase 2 (design system + motion engine). Build /styleguide first so I can review every component and motion pattern. Verify with reduced motion on and off, at 375 and 1440, keyboard only."
- **Phase 3:** "Start Phase 3: the Home page showpiece, following BRIEF §4 and §5 exactly. Design the mobile layout on its own terms, not just stacked. Profile scroll performance with 4× CPU throttle and report LCP/CLS."
- **Phase 4:** "Start Phase 4: build every remaining route from the sitemap. Services and Lookbook entries each use one shared template. Add the View Transition morph from look card to look detail."
- **Phase 5:** "Start Phase 5: inquiry form (Server Action, Zod, honeypot, Turnstile, Resend for both emails, graceful fallback with no keys), ?service= prefill, SEO metadata, OG images, JSON-LD, sitemap/robots, analytics events. Add Playwright e2e."
- **Phase 6:** "Start Phase 6: run the ux-audit and accessibility checks, fix everything at AA, test the device matrix, and produce a launch checklist report. List every remaining placeholder."
