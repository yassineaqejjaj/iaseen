import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const x = getI18n(locale).t.privacyPage;
  const p = (l: string) => (l === "en" ? "/privacy" : `/${l}/privacy`);
  return { title: x.metaTitle, description: x.metaDescription, alternates: { canonical: p(locale), languages: { en: p("en"), fr: p("fr"), ar: p("ar") } } };
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const x = getI18n(locale).t.privacyPage;
  return (
    <>
      <Header locale={locale} />
      <main>
        <div className="wrap" style={{ paddingBlock: "56px 96px", maxWidth: 820 }}>
          <h1 className="display" style={{ margin: 0, fontSize: "clamp(34px, 5vw, 56px)" }}>{x.title}</h1>
          <p style={{ margin: "12px 0 32px", color: "var(--muted)", fontSize: 14 }}>{x.updated}</p>
          <div className="prose">
            {x.sections.map((s) => (<section key={s.h}><h2>{s.h}</h2>{s.p.map((q) => <p key={q}>{q}</p>)}</section>))}
          </div>
        </div>
      </main>
    </>
  );
}
