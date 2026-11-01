import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStepper from "@/components/CaseStepper";
import ClientLogo from "@/components/ClientLogo";
import Header from "@/components/Header";
import { contentEn } from "@/lib/content";
import { getI18n, isLocale, type Locale } from "@/lib/i18n";
import { caseGraph, ld } from "@/lib/schema";

export function generateStaticParams() { return contentEn.clients.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const { c, t } = getI18n(locale);
  const cl = c.clients.find((x) => x.slug === slug);
  if (!cl) return {};
  const short = cl.client.split(" · ")[0];
  const title = `${short}: ${t.case.label.toLowerCase()}, ${cl.tags.slice(0, 2).join(" & ")} | ${t.meta.caseSuffix}`;
  const description = `${cl.summary} ${cl.role}`.slice(0, 160);
  const image = [{ url: `${locale === "en" ? "" : `/${locale}`}/opengraph-image`, width: 1200, height: 630, alt: `${short} — Yassine Aqejjaj` }];
  const p = (l: string) => (l === "en" ? `/work/${slug}` : `/${l}/work/${slug}`);
  return { title, description, openGraph: { title, description, type: "article" as const, locale, images: image }, alternates: { canonical: p(locale), languages: { en: p("en"), fr: p("fr"), ar: p("ar") } } };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: l, slug } = await params;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const { t, c, href } = getI18n(locale);
  const k = c.clients.findIndex((x) => x.slug === slug);
  if (k < 0) notFound();
  const cl = c.clients[k];
  const next = c.clients[(k + 1) % c.clients.length];
  const facts = [[t.case.role, cl.role], [t.case.client, cl.org], [t.case.focus, cl.focus], ...(cl.year ? [[t.case.year, cl.year]] : [])];
  const graph = caseGraph(locale, slug);
  return (
    <>
      {graph && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(graph) }} />}
      <Header locale={locale} />
      <main>
      <section style={{ background: "radial-gradient(800px 400px at 80% 0%, rgba(106,145,255,.16), transparent 60%), var(--bg)", color: "#fff", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingBlock: "48px 64px" }}>
          <Link href={href("#client-work")} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, marginBottom: 20, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            <svg className="flip" aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "scaleX(-1)" }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>{t.case.back}
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
            <span dir="ltr"><ClientLogo name={cl.logo} scale={1.6} /></span>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, letterSpacing: ".14em", color: "var(--signal)" }}>{t.case.label} · {cl.sector}{cl.year ? ` · ${cl.year}` : ""}</p>
          </div>
          <h1 className="display" style={{ margin: 0, maxWidth: 860, fontSize: "clamp(38px, 5.4vw, 68px)", lineHeight: 1.05 }}>{cl.client}: {cl.title}</h1>
          <p style={{ margin: "22px 0 0", maxWidth: 680, fontSize: 19, lineHeight: 1.6, color: "var(--text2)" }}>{cl.summary}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginTop: 40 }}>
            {facts.map(([label, v]) => (
              <div key={label} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: 18 }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: ".1em", color: "var(--muted)" }}>{label}</p>
                <p style={{ margin: "6px 0 0", fontSize: 16, fontWeight: 600 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {cl.sensitive && (
        <div style={{ background: "var(--cloud)", borderBottom: "1px solid var(--line)" }}>
          <div className="wrap" style={{ paddingBlock: 16, fontSize: 14, lineHeight: 1.5, color: "var(--body)" }}>{t.case.confidential}</div>
        </div>
      )}
      <CaseStepper steps={cl.steps} />
      </main>
      <footer style={{ background: "var(--cloud)", borderTop: "1px solid var(--line)", color: "#fff" }}>
        <div className="wrap" style={{ paddingBlock: 56, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <p className="display" style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em" }}>{t.case.nextCase}: {next.client}, {next.title}</p>
          <Link href={href(`/work/${next.slug}`)} className="pill" style={{ minHeight: 52, padding: "0 24px", background: "var(--accent)", color: "#07101f" }}>{t.case.readIt}</Link>
        </div>
      </footer>
    </>
  );
}
