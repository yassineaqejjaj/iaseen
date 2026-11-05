import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Journey from "@/components/Journey";
import Constellation from "@/components/Constellation";
import { profile } from "@/lib/content";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { t, c } = getI18n(locale);
  void c;
  const title = `${t.journey.title} | Yassine Aqejjaj`;
  const description = t.journey.lead;
  const p = (l: string) => (l === "en" ? "/experience" : `/${l}/experience`);
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
        <div className="wrap" data-ambient="experience" style={{ paddingBlock: "56px 96px" }}>
          <p className="eyebrow">{t.journey.eyebrow}</p>
          <h1 className="display" style={{ margin: "8px 0 12px", fontSize: "clamp(34px, 5vw, 56px)" }}>{t.journey.title}</h1>
          <p className="lead" style={{ maxWidth: 720, marginBottom: 32 }}>{t.journey.lead}</p>
          <div className="fx"><Constellation /></div>
          <Journey />
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <a href={profile.cv} download="Yassine-Aqejjaj-CV.pdf" className="pill pill-line">{t.journey.download}</a>
            <span style={{ fontSize: 14, color: "var(--muted)" }}>{t.journey.downloadNote}</span>
          </div>
        </div>
      </main>
    </>
  );
}
