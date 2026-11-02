import { notFound } from "next/navigation";
import WhitepaperLanding from "@/components/WhitepaperLanding";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { t } = getI18n(locale);
  const p = (l: string) => (l === "en" ? "/resources/agentic-transformation" : `/${l}/resources/agentic-transformation`);
  return {
    title: t.wp2.metaTitle, description: t.wp2.metaDescription,
    openGraph: { title: t.wp2.metaTitle, description: t.wp2.metaDescription, type: "website" as const, locale, images: [{ url: "/whitepapers/agentic-transformation-cover.webp", width: 794, height: 1123 }] },
    alternates: { canonical: p(locale), languages: { en: p("en"), fr: p("fr"), ar: p("ar") } },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const { t } = getI18n(locale);
  return <WhitepaperLanding locale={locale} id="agentic-transformation" fileName="Guide-Transformation-Agentique-Yassine-Aqejjaj.pdf" cover="/whitepapers/agentic-transformation-cover.webp" doc={t.wp2} />;
}
