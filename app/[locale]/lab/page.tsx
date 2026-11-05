import { notFound } from "next/navigation";
import Header from "@/components/Header";
import NovaSystem from "@/components/NovaSystem";
import LabGrid from "@/components/LabGrid";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const x = getI18n(locale).t.pages;
  const p = (l: string) => (l === "en" ? "/lab" : `/${l}/lab`);
  return { title: x.labTitle, description: x.labDesc, alternates: { canonical: p(locale), languages: { en: p("en"), fr: p("fr"), ar: p("ar") } }, openGraph: { title: x.labTitle, description: x.labDesc } };
}

export default async function Lab({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const { t } = getI18n(locale);
  return (
    <>
      <Header locale={locale} />
      <main>
        <div className="wrap" data-ambient="ai-lab" style={{ paddingBlock: "56px 96px" }}>
          <p className="eyebrow">{t.lab.eyebrow}</p>
          <h1 className="display" style={{ margin: "8px 0 12px", fontSize: "clamp(34px, 5vw, 56px)" }}>{t.lab.title}</h1>
          <p className="lead" style={{ maxWidth: 720, marginBottom: 36 }}>{t.lab.lead}</p>
          <NovaSystem />
          <FeaturedProducts locale={locale} />
          <div style={{ marginTop: 40 }}><LabGrid /></div>
        </div>
      </main>
    </>
  );
}
