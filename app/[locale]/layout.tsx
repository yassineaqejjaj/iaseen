import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk, Noto_Sans_Arabic } from "next/font/google";
import "../globals.css";
import PointerGlow from "@/components/PointerGlow";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getI18n, isLocale, locales } from "@/lib/i18n";
import { ld, siteGraph } from "@/lib/schema";
import { modeScript } from "@/lib/mode";
import CommandLauncher from "@/components/CommandLauncher";
import MagneticCursor from "@/components/MagneticCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic", weight: ["400", "500", "600", "700"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { t } = getI18n(locale);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://iaseen.com"),
    title: t.meta.title,
    description: t.meta.description,
    openGraph: { title: t.meta.title, description: t.meta.description, type: "website", locale, siteName: "Yassine Aqejjaj", images: [{ url: `${locale === "en" ? "" : `/${locale}`}/opengraph-image`, width: 1200, height: 630, alt: "Yassine Aqejjaj, Head of AI" }] },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    authors: [{ name: "Yassine Aqejjaj", url: "https://iaseen.com" }],
    verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION, other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined },
    alternates: { canonical: locale === "en" ? "/" : `/${locale}`, languages: { en: "/", fr: "/fr", ar: "/ar", "x-default": "/" } },
  };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { dir } = getI18n(locale);
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={`${inter.variable} ${grotesk.variable} ${arabic.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
        )}
      </head>
      <body>
        <LocaleProvider locale={locale}>{children}<CommandLauncher /></LocaleProvider>
        <PointerGlow />
        <MagneticCursor />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(siteGraph(locale)) }} />
      </body>
    </html>
  );
}
