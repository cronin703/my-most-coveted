# My Most Coveted — Claude Code starter kit

Everything Claude Code needs to build the site from the plan, with no extra explaining needed.

## How to use (5 minutes)
1. Unzip into a new, empty folder (e.g. `~/projects/my-most-coveted`).
2. `cd` into it and run `git init` (optional but recommended).
3. Start Claude Code in that folder (`claude`).
4. Open `KICKOFF_PROMPT.md` and paste the prompt in the box.
5. At the end of each phase, push the branch to GitHub and import the repo into Vercel (once), so every branch gets a preview link to send her.

## What's inside
| Path | What it is |
|---|---|
| `CLAUDE.md` | Project rules Claude Code reads automatically: stack, non-negotiables, workflow |
| `KICKOFF_PROMPT.md` | First prompt + one prompt per later phase |
| `docs/BRIEF.md` | The full spec: review, strategy, sitemap, design system, creative direction, motion, tech, SEO |
| `docs/ROADMAP.md` | 6 phases with checklists and acceptance criteria |
| `docs/STITCH_REFERENCE.md` | Captured copy and structure of the original Stitch mockup, with its problems |
| `docs/CONTENT_CHECKLIST.md` | What to collect from her (send her this) |
| `reference/*.jpg` | Screenshots of the Stitch mockup (desktop and mobile) |
| `.claude/skills/luxury-motion/` | Project skill: motion and parallax system rules |
| `.claude/skills/editorial-layout/` | Project skill: magazine-style layout rules |
| `content/` | Placeholder content (7 services, 3 looks, testimonials, site settings), all flagged `placeholder: true` |

## You'll need
- Node 20+ and pnpm
- A Vercel account (you already have one connected)
- Later, for the form: a Resend account and API key, Cloudflare Turnstile keys, and her domain

## Working on the site
```bash
pnpm install
pnpm dev                 # http://localhost:3000
pnpm lint && pnpm typecheck && pnpm build
pnpm test:e2e            # Playwright smoke tests at 375px and 1440px
pnpm check:placeholders  # lists placeholder content and TODO(client) notes
```
Production builds (`VERCEL_ENV=production`) fail while any content is still flagged `placeholder: true`. Preview builds are fine.

Living plan doc: https://claude.ai/artifact/Lbms6gTB9YB49suJ7mBLod
