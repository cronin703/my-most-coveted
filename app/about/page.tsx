import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { PortraitFrame } from "@/components/ui/PortraitFrame";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal, SplitHeading } from "@/components/motion/primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "A New York personal stylist who edits what you own, finds what's missing, and dresses you for the moments that matter.",
};

/* TODO(client): story, philosophy and credentials come from the voice-note interview. */
export default function AboutPage() {
  const site = getSite();
  return (
    <>
      <section className="frame grid-editorial gap-y-10 pt-[var(--section-m)] pb-[var(--section-l)]">
        <div className="col-span-4 md:col-span-5">
          <PortraitFrame label="Portrait" />
        </div>
        <div className="col-span-4 md:col-span-6 md:col-start-7 md:self-end">
          <ChapterLabel number="05">About</ChapterLabel>
          <h1 className="display-l mt-6">
            Hello, <em>I’m</em> …
          </h1>
          <p className="lede mt-6 max-w-[38ch]">{site.positioning}</p>
        </div>
      </section>

      <section className="frame grid-editorial gap-y-10 section-m border-t border-line">
        <h2 className="label col-span-4 text-stone md:col-span-3">My story</h2>
        <Reveal className="measure col-span-4 space-y-4 md:col-span-6 md:col-start-5">
          <p>
            Placeholder. Her story goes here: how she started, why she does this work, and what a
            first session with her feels like. Written from the client interview, in first person.
          </p>
          <p className="text-stone">
            Two or three short paragraphs. Warm, confident, never salesy.
          </p>
        </Reveal>
      </section>

      <section className="frame grid-editorial gap-y-10 section-m border-t border-line">
        <h2 className="label col-span-4 text-stone md:col-span-3">Philosophy</h2>
        <SplitHeading
          as="p"
          className="display-s col-span-4 font-display font-light italic md:col-span-7 md:col-start-5"
        >
          Placeholder. One line that sums up her point of view on style.
        </SplitHeading>
      </section>

      <section className="frame grid-editorial gap-y-6 section-m border-t border-line">
        <h2 className="label col-span-4 text-stone md:col-span-3">Credentials</h2>
        <p className="col-span-4 text-stone md:col-span-6 md:col-start-5">
          To be confirmed with her. Press mentions are shown only once verified.
        </p>
        <div className="col-span-4 md:col-span-6 md:col-start-5">
          <Button href={site.social.instagram} variant="text">
            Follow on Instagram
          </Button>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
