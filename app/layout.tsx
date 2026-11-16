import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, EB_Garamond, Inter } from "next/font/google";
import { getSite } from "@/lib/content";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { TransitionProvider } from "@/components/motion/PageTransition";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Roman only: body italics are rare, and dropping the italic file saves ~43 KB on mobile.
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.positioning,
};

export const viewport: Viewport = {
  themeColor: "#faf8f5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${ebGaramond.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="label sr-only z-50 bg-ink px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <TransitionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </TransitionProvider>
        <MotionRoot />
      </body>
    </html>
  );
}
