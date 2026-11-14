import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  const site = getSite();
  return (
    <LegalPage title="Terms">
      <h2>Using this site</h2>
      <p>
        The content and photography on this site belong to {site.name} unless stated otherwise.
        Please ask before reusing them.
      </p>
      <h2>Services</h2>
      <p>
        Prices, scope and timelines for each engagement are confirmed in writing before work begins.
        Shopping links point to third-party retailers, whose own terms apply to any purchase.
      </p>
      <h2>Questions</h2>
      <p>Get in touch through the contact page.</p>
    </LegalPage>
  );
}
