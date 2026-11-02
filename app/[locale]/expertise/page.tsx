import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import SkillProof from "@/components/SkillProof";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { t, c } = getI18n(locale);
  void c;
  const title = `${t.expertise.title} | Yassine Aqejjaj`;
  const description = t.expertise.lead;
  const p = (l: string) => (l === "en" ? "/expertise" : `/${l}/expertise`);
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
          <p className="eyebrow">{t.expertise.eyebrow}</p>
          <h1 className="display" style={{ margin: "8px 0 12px", fontSize: "clamp(34px, 5vw, 56px)" }}>{t.expertise.title}</h1>
          <p className="lead" style={{ maxWidth: 720, marginBottom: 32 }}>{t.expertise.lead}</p>
          <SkillProof />
        </div>
      </main>
    </>
  );
}
