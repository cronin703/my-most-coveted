import type { Metadata } from "next";
import Image from "next/image";
import {
  getLooks,
  getServices,
  getSite,
  getTestimonials,
  formatPrice,
  serviceNumber,
} from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { Accordion } from "@/components/ui/Accordion";
import { Field, Select, Textarea } from "@/components/ui/Field";
import { PortraitFrame } from "@/components/ui/PortraitFrame";
import { PlaceholderFlag } from "@/components/ui/PlaceholderFlag";
import { LookCard } from "@/components/sections/LookCard";
import { ServiceEntry } from "@/components/sections/ServiceEntry";
import { TestimonialBlock } from "@/components/sections/TestimonialBlock";
import { PressStrip } from "@/components/sections/PressStrip";
import { ChapterIndex } from "@/components/motion/ChapterIndex";
import {
  ImageReveal,
  Magnetic,
  Parallax,
  Reveal,
  SplitHeading,
} from "@/components/motion/primitives";
import { PinnedHorizontal, PinnedPanel } from "@/components/motion/PinnedHorizontal";
import { TransitionLink } from "@/components/motion/PageTransition";
import { WordmarkDraw } from "@/components/motion/WordmarkDraw";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colours = [
  { name: "Ivory", token: "--ivory", hex: "#FAF8F5", use: "Canvas" },
  { name: "Ink", token: "--ink", hex: "#111111", use: "Type, solid buttons (17.8:1)" },
  { name: "Stone", token: "--stone", hex: "#6B6560", use: "Secondary text, labels (5.4:1)" },
  { name: "Line", token: "--line", hex: "#E7E2DB", use: "Rules and borders" },
  { name: "Accent", token: "--accent", hex: "#A8854A", use: "Focus rings, underlines. Never text" },
  {
    name: "Accent text",
    token: "--accent-text",
    hex: "#8A6A35",
    use: "Gold text when needed (4.7:1)",
  },
  { name: "Error", token: "--error", hex: "#9B2C1F", use: "Form errors only (7.1:1)" },
];

const toc = [
  ["identity", "Wordmark"],
  ["colour", "Colour"],
  ["type", "Type"],
  ["buttons", "Buttons"],
  ["forms", "Form fields"],
  ["accordion", "Accordion"],
  ["content", "Content blocks"],
  ["motion", "Motion"],
  ["chapter", "Horizontal chapter"],
] as const;

function Section({
  id,
  number,
  title,
  note,
  children,
}: {
  id: string;
  number: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="frame scroll-mt-24 border-t border-line py-[var(--section-m)]"
    >
      <ChapterLabel number={number}>Styleguide</ChapterLabel>
      <h2 id={`${id}-title`} className="display-m mt-4">
        {title}
      </h2>
      {note ? <p className="measure mt-4 text-stone">{note}</p> : null}
      <div className="mt-10">{children}</div>
    </section>
  );
}

/**
 * Internal, noindex. Every component and motion pattern in one place, for review at
 * 375 and 1440, with reduced motion on and off, and keyboard only.
 */
export default function StyleguidePage() {
  const site = getSite();
  const services = getServices();
  const looks = getLooks();
  const [testimonial] = getTestimonials();
  const [service] = services;
  const [look] = looks;

  return (
    <>
      <ChapterIndex />
      <header className="frame pt-[var(--section-m)] pb-[var(--space-8)]">
        <ChapterLabel number="00">Internal · not indexed</ChapterLabel>
        <h1 className="display-l mt-6">
          The <em>styleguide</em>
        </h1>
        <p className="lede measure mt-6 text-stone">
          Every component and motion pattern for {site.name}. Try it with reduced motion on, at
          375px, and with the keyboard only.
        </p>
        <nav aria-label="Styleguide sections" className="mt-10">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {toc.map(([id, label], i) => (
              <li key={id}>
                <a href={`#${id}`} className="label link-draw inline-flex min-h-11 items-center">
                  <span className="mr-2 text-stone">{String(i + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <Section
        id="identity"
        number="01"
        title="Wordmark"
        note="Script lettering recreated from the mockup. It draws its outline, then fills, when it scrolls into view. Static with reduced motion. To be replaced by her original file."
      >
        <WordmarkDraw label={site.name} className="h-auto w-full max-w-3xl text-ink" />
      </Section>

      <Section
        id="colour"
        number="02"
        title="Colour"
        note="Quiet luxury: ivory canvas, ink type, photography as the only colour."
      >
        <ul className="grid grid-cols-2 gap-[var(--gutter)] md:grid-cols-4 lg:grid-cols-7">
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
      </Section>

      <Section
        id="type"
        number="03"
        title="Type"
        note="Cormorant Garamond for display, EB Garamond for reading, Inter for labels."
      >
        <div className="space-y-6">
          <p className="display-xl font-display font-light">Coveted</p>
          <p className="display-l font-display font-light">
            Display L, <em>italic</em>
          </p>
          <p className="display-m font-display font-light">Display M</p>
          <p className="display-s font-display font-light">Display S</p>
          <p className="lede measure">Lede: EB Garamond, used for intros and taglines.</p>
          <p className="measure">
            Body: EB Garamond at 18px on a 66-character measure. Quiet, readable, and warm enough
            for her first-person voice.
          </p>
          <p className="label">Label: Inter, tracked small caps, 12px minimum</p>
          <div className="flex flex-wrap items-center gap-4">
            <PlaceholderFlag show label="Sample" />
            <PlaceholderFlag show label="Draft copy" />
          </div>
        </div>
      </Section>

      <Section
        id="buttons"
        number="04"
        title="Buttons"
        note="Solid buttons pull toward the pointer and show the “Book” cursor on desktop. Text buttons draw their underline. All are links and cross-fade between pages."
      >
        <div className="flex flex-wrap items-center gap-6">
          <Button href="/contact">Book a consultation</Button>
          <Button href="/services" variant="outline">
            Outline
          </Button>
          <Button href="/services" variant="text">
            Explore services
          </Button>
        </div>
      </Section>

      <Section
        id="forms"
        number="05"
        title="Form fields"
        note="Visible labels on every field, hints and errors announced to screen readers. The working inquiry form arrives in Phase 5."
      >
        <form aria-label="Example form" className="grid max-w-3xl gap-8 md:grid-cols-2">
          <Field id="sg-name" label="Your name" autoComplete="name" />
          <Field
            id="sg-email"
            label="Email"
            type="email"
            autoComplete="email"
            defaultValue="hello@"
            error="That email looks incomplete. Check it includes a domain, like name@example.com."
          />
          <Select
            id="sg-service"
            label="Service"
            options={[
              { value: "", label: "Not sure yet" },
              ...services.map((s) => ({ value: s.slug, label: s.title })),
            ]}
          />
          <Field
            id="sg-date"
            label="Event date"
            type="date"
            optional
            hint="Only if you have an event in mind."
          />
          <div className="md:col-span-2">
            <Textarea
              id="sg-message"
              label="What are you looking for?"
              hint="A few lines is plenty."
            />
          </div>
        </form>
      </Section>

      <Section
        id="accordion"
        number="06"
        title="Accordion"
        note="Native details/summary: keyboard and screen-reader friendly, works without JavaScript."
      >
        <div className="max-w-3xl">
          <Accordion
            items={[
              {
                q: "Do you work with any budget?",
                a: "Yes. Every recommendation is matched to the budget we agree on up front.",
              },
              {
                q: "Do you travel?",
                a: "In person across New York City; every service has a remote option.",
              },
            ]}
          />
        </div>
      </Section>

      <Section
        id="content"
        number="07"
        title="Content blocks"
        note="Service spread, look card, testimonial, portrait frame. The press strip renders nothing until real press is confirmed."
      >
        {service ? <ServiceEntry service={service} /> : null}
        <div className="grid gap-[var(--gutter)] gap-y-12 border-t border-line pt-12 md:grid-cols-12">
          {look ? (
            <div className="md:col-span-4">
              <LookCard look={look} />
            </div>
          ) : null}
          <div className="md:col-span-3 md:col-start-7">
            <PortraitFrame label="Portrait" />
          </div>
        </div>
        {testimonial ? (
          <div className="-mx-[var(--page-margin)] mt-12 border-t border-line">
            <TestimonialBlock testimonial={testimonial} />
          </div>
        ) : null}
        <div className="border-t border-line pt-8">
          <p className="label text-stone">Press strip</p>
          <PressStrip items={[]} />
          <p className="mt-2 text-stone">Hidden: no confirmed press yet.</p>
        </div>
      </Section>

      <Section
        id="motion"
        number="08"
        title="Motion"
        note="Slow, weighted, intentional. Each pattern has a full desktop version, a lighter mobile version, and a reduced-motion version (a short fade, or nothing)."
      >
        <div className="grid-editorial gap-y-16">
          <div className="col-span-4 md:col-span-5">
            <p className="label text-stone">Reveal</p>
            <Reveal className="mt-4">
              <p className="display-s font-display font-light">
                Rises 40px and fades in as it enters the view.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="mt-4">
              <p className="text-stone">A second line follows a beat later.</p>
            </Reveal>
          </div>

          <div className="col-span-4 md:col-span-6 md:col-start-7">
            <p className="label text-stone">Split heading</p>
            <SplitHeading as="p" className="display-m mt-4 font-display font-light">
              Edit what you own. Find what’s <em>missing</em>.
            </SplitHeading>
          </div>

          <div className="col-span-4 md:col-span-5">
            <p className="label text-stone">Image reveal</p>
            <ImageReveal className="mt-4">
              <Image
                src="/images/placeholder/look-the-gala-edit-1.jpg"
                alt="Placeholder image for The Gala Edit"
                width={1200}
                height={1500}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </ImageReveal>
          </div>

          <div data-parallax-scope="" className="relative col-span-4 md:col-span-6 md:col-start-7">
            <p className="label text-stone">Parallax</p>
            <div className="relative mt-4 aspect-[4/5] overflow-hidden">
              <Parallax layer="bg" className="absolute -inset-y-[12%] inset-x-0">
                <Image
                  src="/images/placeholder/look-monday-uniform-1.jpg"
                  alt="Placeholder image for The Monday Uniform"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </Parallax>
              <Parallax layer="fg" className="absolute bottom-8 left-8">
                <p className="display-m font-display font-light italic">Layers</p>
              </Parallax>
            </div>
          </div>

          <div className="col-span-4 md:col-span-12">
            <p className="label text-stone">Magnetic, cursor and page transition</p>
            <div className="mt-6 flex flex-wrap items-center gap-8">
              <Magnetic>
                <span
                  data-cursor="View"
                  className="label inline-flex min-h-11 items-center border border-ink px-6"
                >
                  Hover me (desktop)
                </span>
              </Magnetic>
              <TransitionLink
                href="/lookbook"
                className="label link-draw inline-flex min-h-11 items-center"
              >
                Cross-fade to the lookbook →
              </TransitionLink>
            </div>
          </div>
        </div>
      </Section>

      <section
        id="chapter"
        aria-labelledby="chapter-title"
        className="scroll-mt-24 border-t border-line py-[var(--section-m)]"
      >
        <div className="frame">
          <ChapterLabel number="09">Styleguide</ChapterLabel>
          <h2 id="chapter-title" className="display-m mt-4">
            Horizontal chapter
          </h2>
          <p className="measure mt-4 text-stone">
            Desktop: pins and scrolls sideways. Mobile and no-JS: swipeable carousel. Reduced
            motion: a plain vertical list. Tab through the links: each panel scrolls into view.
          </p>
        </div>
        <PinnedHorizontal label="Services" className="mt-10">
          {services.map((s) => (
            <PinnedPanel key={s.slug}>
              <div className="overflow-hidden">
                <Image
                  data-pin-drift=""
                  src={s.heroImage.src}
                  alt={s.heroImage.alt}
                  width={1600}
                  height={2000}
                  sizes="(min-width: 1024px) 40vw, 82vw"
                  className="aspect-[4/5] w-full scale-[1.14] object-cover"
                />
              </div>
              <p className="label mt-4 text-stone">
                <span className="text-ink">{serviceNumber(s.order)}</span> ·{" "}
                {formatPrice(s.priceFrom)}
              </p>
              <h3 className="mt-2 font-display text-[2rem] leading-tight font-light">{s.title}</h3>
              <TransitionLink
                href={`/services/${s.slug}`}
                className="label link-draw mt-3 inline-flex min-h-11 items-center"
              >
                Explore<span className="sr-only"> {s.title}</span> →
              </TransitionLink>
            </PinnedPanel>
          ))}
        </PinnedHorizontal>
      </section>
    </>
  );
}
