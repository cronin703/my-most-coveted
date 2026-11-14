import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { ChapterLabel } from "@/components/ui/ChapterLabel";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colours = [
  { name: "Ivory", token: "--ivory", hex: "#FAF8F5", use: "Canvas" },
  { name: "Ink", token: "--ink", hex: "#111111", use: "Type, solid buttons" },
  { name: "Stone", token: "--stone", hex: "#6B6560", use: "Secondary text, labels (5.4:1)" },
  { name: "Line", token: "--line", hex: "#E7E2DB", use: "Rules and borders" },
  { name: "Accent", token: "--accent", hex: "#A8854A", use: "Focus rings, underlines (not text)" },
  {
    name: "Accent text",
    token: "--accent-text",
    hex: "#8A6A35",
    use: "Gold text when needed (4.7:1)",
  },
];

/** Internal, noindex. Phase 1 shows tokens; Phase 2 adds every component and motion pattern. */
export default function StyleguidePage() {
  return (
    <div className="frame section-m space-y-[var(--section-m)]">
      <header>
        <ChapterLabel number="00">Internal</ChapterLabel>
        <h1 className="display-l mt-6">Styleguide</h1>
      </header>

      <section aria-labelledby="sg-colour">
        <h2 id="sg-colour" className="label text-stone">
          Colour
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-[var(--gutter)] md:grid-cols-3 lg:grid-cols-6">
          {colours.map((c) => (
            <li key={c.token}>
              <div
                className="aspect-square border border-line"
                style={{ background: `var(${c.token})` }}
              />
              <p className="mt-3 font-display text-[1.25rem]">{c.name}</p>
              <p className="label text-stone">{c.hex}</p>
              <p className="mt-1 text-[var(--text-small)] text-stone">{c.use}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sg-type" className="space-y-6">
        <h2 id="sg-type" className="label text-stone">
          Type
        </h2>
        <p className="display-xl">Display XL</p>
        <p className="display-l font-display font-light">
          Display L <em>italic</em>
        </p>
        <p className="display-m font-display font-light">Display M</p>
        <p className="display-s font-display font-light">Display S</p>
        <p className="lede measure">Lede: EB Garamond, used for intros and taglines.</p>
        <p className="measure">
          Body: EB Garamond at 18px with a 66-character measure. Quiet, readable, and warm enough
          for her first-person voice.
        </p>
        <p className="label">Label: Inter, tracked small caps, 12px minimum</p>
      </section>

      <section aria-labelledby="sg-buttons">
        <h2 id="sg-buttons" className="label text-stone">
          Buttons
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <Button href="/contact">Solid</Button>
          <Button href="/contact" variant="outline">
            Outline
          </Button>
          <Button href="/contact" variant="text">
            Text with arrow
          </Button>
        </div>
      </section>
    </div>
  );
}
