import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ClientCard from "@/components/ClientCard";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const x = getI18n(locale).t.pages;
  const p = (l: string) => (l === "en" ? "/work" : `/${l}/work`);
  return { title: x.workTitle, description: x.workDesc, alternates: { canonical: p(locale), languages: { en: p("en"), fr: p("fr"), ar: p("ar") } }, openGraph: { title: x.workTitle, description: x.workDesc } };
}

export default async function Work({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const { t, c } = getI18n(locale);
  return (
    <>
      <Header locale={locale} />
      <main>
        <div className="wrap" style={{ paddingBlock: "56px 96px" }}>
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h1 className="display" style={{ margin: "8px 0 12px", fontSize: "clamp(34px, 5vw, 56px)" }}>{t.work.title}</h1>
          <p className="lead" style={{ maxWidth: 720 }}>{t.work.lead}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 20, marginTop: 36 }}>
            {c.clients.map((cl) => <ClientCard key={cl.slug} cl={cl} locale={locale} />)}
          </div>
        </div>
      </main>
    </>
  );
}
