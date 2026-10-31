import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk, Noto_Sans_Arabic } from "next/font/google";
import "../globals.css";
import PointerGlow from "@/components/PointerGlow";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getI18n, isLocale, locales } from "@/lib/i18n";

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
    openGraph: { title: t.meta.title, description: t.meta.description, type: "website", locale },
    alternates: { canonical: locale === "en" ? "/" : `/${locale}`, languages: { en: "/", fr: "/fr", ar: "/ar", "x-default": "/" } },
  };
}

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yassine Aqejjaj",
  jobTitle: "Head of AI",
  worksFor: { "@type": "Organization", name: "Devoteam" },
  url: "https://iaseen.com",
  knowsLanguage: ["en", "fr", "ar"],
  sameAs: ["https://www.linkedin.com/in/yassine-aqejjaj/", "https://github.com/yassineaqejjaj"],
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { dir } = getI18n(locale);
  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${grotesk.variable} ${arabic.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
        )}
      </head>
      <body>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
        <PointerGlow />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  );
}
