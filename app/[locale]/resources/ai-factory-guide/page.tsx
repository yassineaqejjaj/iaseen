import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import WhitepaperForm from "@/components/WhitepaperForm";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { t } = getI18n(locale);
  const p = (l: string) => (l === "en" ? "/resources/ai-factory-guide" : `/${l}/resources/ai-factory-guide`);
  return {
    title: t.wp.metaTitle, description: t.wp.metaDescription,
    openGraph: { title: t.wp.metaTitle, description: t.wp.metaDescription, type: "website" as const, locale, images: [{ url: "/whitepapers/ai-factory-cover.webp", width: 794, height: 1123 }] },
    alternates: { canonical: p(locale), languages: { en: p("en"), fr: p("fr"), ar: p("ar") } },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const { t, href } = getI18n(locale);
  const w = t.wp;
  return (
    <>
      <Header locale={locale} />
      <main>
        <section style={{ background: "radial-gradient(900px 480px at 80% 0%, rgba(76,111,240,.18), transparent 60%), var(--bg)", borderBottom: "1px solid var(--line)" }}>
          <div className="wrap" style={{ paddingBlock: "56px 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56, alignItems: "start" }}>
            <div>
              <p className="eyebrow">{w.eyebrow}</p>
              <h1 className="display" style={{ margin: 0, fontSize: "clamp(38px, 5.4vw, 68px)", lineHeight: 1.04 }}>{w.title}</h1>
              <p style={{ margin: "20px 0 0", maxWidth: 560, fontSize: 19, lineHeight: 1.6, color: "var(--text2)" }}>{w.lead}</p>
              <p className="mono" style={{ margin: "18px 0 0", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".16em", color: "var(--muted)", textTransform: "uppercase" }}>{w.meta}</p>
              <h2 style={{ margin: "36px 0 12px", fontSize: 13, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>{w.insideTitle}</h2>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10, maxWidth: 560 }}>
                {w.inside.map((x) => (
                  <li key={x} style={{ display: "flex", gap: 12, fontSize: 16, lineHeight: 1.5, color: "var(--text2)" }}>
                    <span aria-hidden style={{ flex: "none", marginTop: 8, width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} />{x}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: "grid", gap: 24 }}>
              <Image src="/whitepapers/ai-factory-cover.webp" alt={w.title} width={794} height={1123} priority style={{ width: "100%", maxWidth: 360, height: "auto", borderRadius: 14, boxShadow: "0 30px 80px -20px rgba(76,111,240,.35)", border: "1px solid var(--line)", justifySelf: "center" }} />
              <WhitepaperForm id="ai-factory-guide" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
