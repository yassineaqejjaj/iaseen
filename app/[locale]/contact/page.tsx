import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";
import { profile } from "@/lib/content";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { t, c } = getI18n(locale);
  void c;
  const title = `${t.contact.title} | Yassine Aqejjaj`;
  const description = t.contact.text;
  const p = (l: string) => (l === "en" ? "/contact" : `/${l}/contact`);
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
        <div className="wrap" data-ambient="contact" style={{ paddingBlock: "56px 40px" }}>
          <h1 className="display" style={{ margin: "8px 0 12px", fontSize: "clamp(34px, 5vw, 56px)" }}>{t.contact.title}</h1>
          <p style={{ margin: "16px 0 28px", maxWidth: 560, fontSize: 18, lineHeight: 1.6, color: "var(--text2)" }}>{t.contact.text}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a href={`mailto:${profile.email}`} className="pill pill-accent" style={{ minHeight: 52, padding: "0 24px", color: "#05060a" }}>{t.contact.contactMe}</a>
            <a href={profile.cv} download="Yassine-Aqejjaj-CV.pdf" className="pill pill-line" style={{ minHeight: 52, padding: "0 24px" }}>{t.contact.cv}</a>
            <a href={profile.linkedin} className="pill pill-line" style={{ minHeight: 52, padding: "0 24px" }}>{t.contact.linkedin}</a>
            <a href={profile.github} className="pill pill-line" style={{ minHeight: 52, padding: "0 24px" }}>{t.contact.github}</a>
          </div>
        </div>
        <div className="wrap" style={{ paddingBottom: 56 }}><ContactForm /></div>
        <Faq locale={locale} />
      </main>
    </>
  );
}
