import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import PointerGlow from "@/components/PointerGlow";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://iaseen.com"),
  title: "Yassine Aqejjaj — I don't just lead AI. I build it.",
  description: "Head of AI, product builder and AI strategist. Enterprise AI strategy, production delivery and agentic products.",
  openGraph: { title: "Yassine Aqejjaj — I don't just lead AI. I build it.", type: "website" },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yassine Aqejjaj",
  jobTitle: "Head of AI",
  worksFor: { "@type": "Organization", name: "Devoteam" },
  url: "https://iaseen.com",
  sameAs: ["https://www.linkedin.com/in/yassine-aqejjaj/", "https://github.com/yassineaqejjaj"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
        )}
      </head>
      <body>
        {children}
        <PointerGlow />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  );
}
