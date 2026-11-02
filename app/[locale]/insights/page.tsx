import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import InsightsFull from "@/components/InsightsFull";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { t, c } = getI18n(locale);
  void c;
  const title = `${t.insights.title} | Yassine Aqejjaj`;
  const description = t.insights.lead;
  const p = (l: string) => (l === "en" ? "/insights" : `/${l}/insights`);
  return { title, description, alternates: { canonical: p(locale), languages: { en: p("en"), fr: p("fr"), ar: p("ar") } }, openGraph: { title, description } };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const { t, c, href } = getI18n(locale);
  void c; void href; void Link;
  return (
    <>
      <Header locale={locale} />
      <main>
        <div className="wrap" style={{ paddingBlock: "56px 96px" }}>
          <p className="eyebrow">{t.insights.eyebrow}</p>
          <h1 className="display" style={{ margin: "8px 0 12px", fontSize: "clamp(34px, 5vw, 56px)" }}>{t.insights.title}</h1>
          <p className="lead" style={{ maxWidth: 720, marginBottom: 36 }}>{t.insights.lead}</p>
          <InsightsFull locale={locale} />
        </div>
      </main>
    </>
  );
}
