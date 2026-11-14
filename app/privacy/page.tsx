import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  const site = getSite();
  return (
    <LegalPage title="Privacy">
      <h2>What I collect</h2>
      <p>
        When you send an inquiry, I receive the details you enter: your name, email, the service
        you’re interested in and your message. This site also uses privacy-friendly analytics that
        count visits without cookies or personal profiles.
      </p>
      <h2>How I use it</h2>
      <p>Only to reply to you and, if we work together, to provide the service. I never sell it.</p>
      <h2>Your choices</h2>
      <p>
        Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> at any time to see,
        correct or delete what I hold about you.
      </p>
    </LegalPage>
  );
}
