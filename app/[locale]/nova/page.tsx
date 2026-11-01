import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { KpiTable } from "@/components/Kpi";
import NovaGallery from "@/components/NovaGallery";
import { profile } from "@/lib/content";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";
import { ld, novaGraph } from "@/lib/schema";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { t } = getI18n(locale);
  const n = t.novaPage;
  const p = (l: string) => (l === "en" ? "/nova" : `/${l}/nova`);
  const image = [{ url: `${locale === "en" ? "" : `/${locale}`}/opengraph-image`, width: 1200, height: 630, alt: "NOVA Suite: Yassine Aqejjaj" }];
  return {
    title: n.metaTitle, description: n.metaDescription,
    openGraph: { title: n.metaTitle, description: n.metaDescription, type: "website" as const, locale, images: image },
    alternates: { canonical: p(locale), languages: { en: p("en"), fr: p("fr"), ar: p("ar") } },
  };
}

const card = { background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 20 } as const;

export default async function NovaPage({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const { t, href } = getI18n(locale);
  const n = t.novaPage;
  const urls = [`${profile.github}/NOVA`, `${profile.github}/ORBIT`, `${profile.github}/FORGE`];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(novaGraph(locale)) }} />
      <Header locale={locale} />
      <main>
        <section style={{ background: "radial-gradient(900px 480px at 78% 0%, rgba(76,111,240,.18), transparent 60%), radial-gradient(600px 300px at 10% 100%, rgba(123,150,255,.08), transparent 60%), var(--bg)", color: "#fff", borderBottom: "1px solid var(--line)" }}>
          <div className="wrap" style={{ paddingBlock: "48px 72px" }}>
            <Link href={href("#ai-lab")} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, marginBottom: 20, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
              <span aria-hidden className="flip">←</span> {n.back}
            </Link>
            <p className="eyebrow">{n.eyebrow}</p>
            <h1 className="display" style={{ margin: 0, maxWidth: 900, fontSize: "clamp(38px, 5.6vw, 72px)", lineHeight: 1.04 }}>{n.title}</h1>
            <p style={{ margin: "22px 0 0", maxWidth: 700, fontSize: 19, lineHeight: 1.6, color: "var(--text2)" }}>{n.lead}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12, marginTop: 40 }}>
              {n.facts.map(([v, label]) => (
                <div key={label} style={{ ...card, padding: 20 }}>
                  <p className="display" style={{ margin: 0, fontSize: 42 }} dir="ltr">{v}</p>
                  <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--muted)" }}>{label}</p>
                </div>
              ))}
            </div>
            <p style={{ margin: "28px 0 0", maxWidth: 700, fontSize: 16, lineHeight: 1.6, color: "var(--text2)" }}>
              <strong style={{ color: "var(--signal)", letterSpacing: ".12em", fontSize: 12 }}>{n.roleLabel}</strong><br />{n.role}
            </p>
          </div>
        </section>

        <section style={{ borderBottom: "1px solid var(--line)" }}>
          <div className="wrap sec">
            <NovaGallery />
          </div>
        </section>

        <section style={{ borderBottom: "1px solid var(--line)" }}>
          <div className="wrap sec">
            <h2 className="h2">{t.kpi.title}</h2>
            <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28 }}>
              <KpiTable id="nova" title="NOVA Suite" />
              <KpiTable id="nova-agents" title="Nova Agents" />
              <KpiTable id="nova-context" title="Nova Context" />
              <KpiTable id="nova-evals" title="Nova Evals" />
            </div>
          </div>
        </section>

        <section style={{ borderBottom: "1px solid var(--line)", background: "var(--cloud)" }}>
          <div className="wrap sec">
            <h2 className="h2">{n.archTitle}</h2>
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {n.layers.map((x, i) => (
                <article key={x.name} style={{ ...card, padding: 28, position: "relative", overflow: "hidden" }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: ".14em", color: "var(--signal)" }}>{x.tag}</p>
                  <h3 className="display" style={{ margin: "10px 0 0", fontSize: 28 }}>{x.name}</h3>
                  <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.65, color: "var(--text2)" }}>{x.text}</p>
                  <span aria-hidden className="display" dir="ltr" style={{ position: "absolute", insetInlineEnd: 18, top: 8, fontSize: 84, color: "rgba(255,255,255,.04)", lineHeight: 1 }}>{i + 1}</span>
                </article>
              ))}
            </div>
            <div style={{ ...card, marginTop: 16, padding: 28, borderColor: "rgba(76,111,240,.35)", background: "linear-gradient(135deg, rgba(76,111,240,.14), rgba(123,150,255,.05))" }}>
              <h3 className="display" style={{ margin: 0, fontSize: 24 }}>{n.loopTitle}</h3>
              <p style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.65, color: "var(--text2)", maxWidth: 760 }}>{n.loopText}</p>
            </div>
          </div>
        </section>

        <section style={{ borderBottom: "1px solid var(--line)" }}>
          <div className="wrap sec">
            <h2 className="h2">{n.usesTitle}</h2>
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {n.uses.map(([title, text]) => (
                <article key={title} style={{ ...card, padding: 24 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{title}</h3>
                  <p style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.65, color: "var(--text2)" }}>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="wrap sec">
            <h2 className="h2">{n.reposTitle}</h2>
            <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {n.repos.map(([name, desc], i) => (
                <a key={name} href={urls[i]} target="_blank" rel="noopener noreferrer" className="card" style={{ padding: 24, textDecoration: "none", color: "var(--text)", display: "flex", flexDirection: "column", gap: 8 }}>
                  <span className="display" style={{ fontSize: 24 }} dir="ltr">{name} ↗</span>
                  <span style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.5 }}>{desc}</span>
                </a>
              ))}
            </div>
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href={href("#ask")} className="pill pill-accent" style={{ minHeight: 52, padding: "0 24px", color: "#05060a" }}>{n.ask}</Link>
              <Link href={href("#ai-lab")} className="pill pill-line" style={{ minHeight: 52, padding: "0 24px" }}>{n.back}</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
