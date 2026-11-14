"use client";

import { useSearchParams } from "next/navigation";

/**
 * Shows the service carried in ?service=<slug> without making /contact dynamic.
 * Phase 5 uses the same value to prefill the inquiry form.
 */
export function SelectedService({ services }: { services: { slug: string; title: string }[] }) {
  const slug = useSearchParams().get("service");
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;
  return (
    <p className="mt-4">
      Selected service: <strong className="font-semibold">{service.title}</strong>
    </p>
  );
}
