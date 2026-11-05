import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import AskSection from "@/components/AskSection";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { t, c } = getI18n(locale);
  void c;
  const title = `${t.ask.title} | Yassine Aqejjaj`;
  const description = t.ask.text;
  const p = (l: string) => (l === "en" ? "/ask" : `/${l}/ask`);
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
        <div className="wrap" data-ambient="ask" style={{ paddingBlock: "56px 96px", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 340px", minWidth: 0 }}>
            <p className="eyebrow">{t.ask.eyebrow}</p>
            <h1 className="display" style={{ margin: "8px 0 12px", fontSize: "clamp(34px, 5vw, 56px)" }}>{t.ask.title}</h1>
            <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.6, color: "var(--text2)" }}>{t.ask.text}</p>
            <ul style={{ margin: "24px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 15, color: "var(--text2)" }}>
              {t.ask.bullets.map((b) => (<li key={b} style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--signal)" }}>—</span>{b}</li>))}
            </ul>
          </div>
          <AskSection />
        </div>
      </main>
    </>
  );
}
