import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { PageIntro } from "@/components/sections/PageIntro";
import { ServiceEntry } from "@/components/sections/ServiceEntry";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Personal styling in New York and remotely: closet edits, everyday and event styling, curated links and digital lookbooks.",
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <PageIntro
        chapter="02"
        label="Services"
        title={
          <>
            Ways to work <em>together</em>
          </>
        }
        lede="In person across New York, or remotely wherever you are. Every service starts with a conversation and is matched to your budget."
      />
      <div className="frame">
        {services.map((service, i) => (
          <ServiceEntry key={service.slug} service={service} flip={i % 2 === 1} />
        ))}
      </div>
      <FinalCta line="Not sure? Start with a consult." href="/contact?service=phone-consultation" />
    </>
  );
}
