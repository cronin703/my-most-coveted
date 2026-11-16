import { processSteps } from "@/lib/copy";
import { Button } from "@/components/ui/Button";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { Reveal, SplitHeading } from "@/components/motion/primitives";

/**
 * 04 The Process. The heading stays put (CSS sticky, no JS) while the four steps
 * rise past it; ends on the low-commitment first step: a call.
 */
export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-title"
      className="frame grid-editorial section-l border-t border-line"
    >
      <div className="col-span-4 md:col-span-4">
        <div className="md:sticky md:top-[calc(var(--header-h)+var(--space-6))]">
          <ChapterLabel number="04">The Process</ChapterLabel>
          <SplitHeading id="process-title" className="display-m mt-6 font-light">
            How it <em>works</em>
          </SplitHeading>
          <div className="mt-8 hidden md:block">
            <Button href="/contact?service=phone-consultation">Start with a call</Button>
          </div>
        </div>
      </div>
      <ol className="col-span-4 mt-10 md:col-span-7 md:col-start-6 md:mt-0">
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.title}
            className="grid grid-cols-[3.5rem_1fr] border-t border-line py-8 md:py-12"
          >
            <span className="display-s font-display font-light text-stone">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-[2rem] leading-tight font-normal">{step.title}</h3>
              <p className="lede mt-3">{step.summary}</p>
              <p className="mt-3 text-stone">{step.detail}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      <div className="col-span-4 mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 md:col-span-7 md:col-start-6">
        <div className="md:hidden">
          <Button href="/contact?service=phone-consultation">Start with a call</Button>
        </div>
        <Button href="/process" variant="text">
          The full process
        </Button>
      </div>
    </section>
  );
}
