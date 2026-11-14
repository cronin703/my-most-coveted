import type { Metadata } from "next";
import { Suspense } from "react";
import { getServices, getSite } from "@/lib/content";
import { SelectedService } from "@/components/sections/SelectedService";
import { PageIntro } from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "Book a consultation",
  description:
    "Request a 30-minute consultation with a New York personal stylist. Replies within 24 hours.",
};

const nextSteps = [
  "You’ll get a confirmation email straight away.",
  "I reply personally, usually within a day, to find a time for a 30-minute call.",
  "On the call we talk through your goals and I recommend the right service. No obligation.",
];

export default function ContactPage() {
  const site = getSite();
  const services = getServices().map(({ slug, title }) => ({ slug, title }));

  return (
    <>
      <PageIntro
        label="Contact"
        title={
          <>
            Book a <em>consultation</em>
          </>
        }
        lede="Tell me a little about what you’re looking for. Every engagement begins with a 30-minute call."
      />

      <section className="frame grid-editorial gap-y-12 pb-[var(--section-l)]">
        <div className="col-span-4 md:col-span-6">
          {/* Phase 5 replaces this with the inquiry form (Server Action, validation, spam protection). */}
          <div className="border border-dashed border-stone p-8">
            <p className="label text-stone">Inquiry form · coming in Phase 5</p>
            <Suspense fallback={null}>
              <SelectedService services={services} />
            </Suspense>
            <p className="mt-4">
              Until then, email{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="underline decoration-accent underline-offset-4"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </div>
        </div>

        <aside className="col-span-4 md:col-span-4 md:col-start-9">
          <h2 className="label text-stone">What happens next</h2>
          <ol className="mt-4">
            {nextSteps.map((step, i) => (
              <li key={step} className="flex gap-4 border-t border-line py-3 last:border-b">
                <span className="label pt-1 text-stone">{String(i + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="label text-stone">Email</dt>
              <dd className="mt-1 break-all">
                <a href={`mailto:${site.contact.email}`} className="link-draw">
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-stone">Service area</dt>
              <dd className="mt-1">{site.contact.serviceArea}</dd>
            </div>
            <div>
              <dt className="label text-stone">Response time</dt>
              <dd className="mt-1">{site.contact.responseTime}</dd>
            </div>
          </dl>
        </aside>
      </section>
    </>
  );
}
