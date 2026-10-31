import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AskAI from "@/components/AskAI";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://iaseen.com"),
  openGraph: { title: "Yassine Aqejjaj — I don't just lead AI. I build it.", type: "website" },
  title: "Yassine Aqejjaj — I don't just lead AI. I build it.",
  description:
    "Head of AI, product builder and AI strategist. Enterprise AI strategy, production delivery and agentic products.",
};

const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.dataset.theme='dark'}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
        )}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <AskAI />
      </body>
    </html>
  );
}
