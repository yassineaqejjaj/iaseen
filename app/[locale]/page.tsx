import Link from "next/link";
import Header from "@/components/Header";
import Journey from "@/components/Journey";
import LabGrid from "@/components/LabGrid";
import SkillProof from "@/components/SkillProof";
import AskSection from "@/components/AskSection";
import ProofPanel from "@/components/ProofPanel";
import HeroPortrait from "@/components/HeroPortrait";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import HeroTitle from "@/components/HeroTitle";
import About from "@/components/About";
import NovaSystem from "@/components/NovaSystem";
import PathLayout from "@/components/PathLayout";
import ClientLogo from "@/components/ClientLogo";
import { profile, real } from "@/lib/content";
import { notFound } from "next/navigation";
import { getI18n, isLocale, type Locale } from "@/lib/i18n";

export const revalidate = 3600;

async function repoCount(): Promise<number | null> {
  try {
    const r = await fetch(`https://api.github.com/users/${profile.githubUser}`, { next: { revalidate: 3600 } });
    if (!r.ok) return null;
    return ((await r.json()) as { public_repos?: number }).public_repos ?? null;
  } catch { return null; }
}

const Arrow = ({ s = 18 }: { s?: number }) => (
  <svg className="flip" aria-hidden width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const { t, c, href } = getI18n(locale);
  const repos = await repoCount();
  const stats = [
    ["13", t.stats.years], ["€12M+", t.stats.pipeline], ["3,000+", t.stats.users], ["1,500+", t.stats.trained], [String(c.books.length), t.stats.books],
    ...(repos ? [[String(repos), t.stats.repos]] : []),
  ];
  const sectionTitle = { margin: "0 0 16px", fontSize: 13, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" } as const;
  return (
    <>
      <Header locale={locale} />
      <PathLayout>
      <section id="top" style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--line)", background: "radial-gradient(900px 500px at 78% 10%, rgba(106,145,255,.16), transparent 60%), radial-gradient(600px 400px at 10% 90%, rgba(152,228,224,.07), transparent 60%), var(--bg)" }}>
        <div className="wrap" style={{ paddingBlock: "88px 72px", display: "flex", flexWrap: "wrap", gap: 56, alignItems: "center" }}>
          <div style={{ flex: "999 1 560px", minWidth: 0 }}>
            <p className="display" style={{ margin: "0 0 14px", fontSize: "clamp(22px, 2.4vw, 30px)", letterSpacing: "-0.02em", color: "var(--text)" }}>Yassine Aqejjaj</p>
            <p className="eyebrow" style={{ marginBottom: 24 }}>{t.hero.roles}</p>
            <HeroTitle line1={t.hero.line1} line2={t.hero.line2} />
            <p style={{ margin: "28px 0 0", maxWidth: 600, fontSize: 19, lineHeight: 1.6, color: "var(--body)" }}>{t.hero.pitch}</p>
            <div className="rise" style={{ animationDelay: ".7s", display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
              <Link href={href("#ai-lab")} className="pill pill-accent" style={{ minHeight: 52, padding: "0 26px", fontSize: 16, color: "#07101f" }}>{t.hero.explore} <Arrow /></Link>
              <Link href={href("#ask")} className="pill pill-line" style={{ minHeight: 52, padding: "0 26px", fontSize: 16 }}>{t.hero.ask}</Link>
              <Link href={href("#experience")} style={{ display: "inline-flex", alignItems: "center", minHeight: 52, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>{t.hero.cv} {t.arrow}</Link>
            </div>
          </div>
          <HeroPortrait alt={t.about.alt} />
        </div>
        <div className="wrap" style={{ paddingBottom: 72 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {stats.map(([v, l]) => (
              <div key={l} className="card" style={{ borderRadius: 16, padding: 24 }}>
                <p className="display" style={{ margin: 0, fontSize: 44 }} dir="ltr">{v}</p>
                <p style={{ margin: "6px 0 0", fontSize: 15, color: "var(--muted)" }}>{l}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 40px" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".14em", color: "var(--muted)" }}>{t.trusted}</span>
            {["thales", "decathlon", "carrefour", "fujitsu", "devoteam", "axa", "banquepopulaire", "pmoffice"].map((l) => (
              <span key={l} dir="ltr" style={{ display: "inline-flex", alignItems: "center", opacity: .85 }}><ClientLogo name={l} /></span>
            ))}
          </div>
        </div>
      </section>

      <About locale={locale} />

      <section id="proof" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingBlock: "96px" }}>
          <p className="eyebrow">{t.proof.eyebrow}</p>
          <h2 className="h2" style={{ marginBottom: 32 }}>{t.proof.title}</h2>
          <ProofPanel />
        </div>
      </section>

      <section id="experience">
        <div className="wrap sec">
          <p className="eyebrow">{t.journey.eyebrow}</p>
          <h2 className="h2">{t.journey.title}</h2>
          <p className="lead" style={{ marginBottom: 32 }}>{t.journey.lead}</p>
          <Journey />
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <a href={profile.cv} download="Yassine-Aqejjaj-CV.pdf" className="pill pill-line">{t.journey.download}</a>
            <span style={{ fontSize: 14, color: "var(--muted)" }}>{t.journey.downloadNote}</span>
          </div>
        </div>
      </section>

      <section id="client-work" style={{ background: "var(--cloud)", borderBlock: "1px solid var(--line)" }}>
        <div className="wrap sec">
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2 className="h2">{t.work.title}</h2>
          <p className="lead">{t.work.lead}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {c.clients.map((cl) => (
              <article key={cl.slug} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 168, background: "linear-gradient(135deg, #0d1320, #131c33)", position: "relative", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".14em", color: "var(--muted)" }}>{cl.sector}</span>
                  <span dir="ltr"><ClientLogo name={cl.logo} scale={1.5} /></span>
                  <span aria-hidden style={{ position: "absolute", insetInlineEnd: 24, top: 24, width: 56, height: 56, borderRadius: 16, border: "1px solid var(--line)" }} />
                  <span aria-hidden style={{ position: "absolute", insetInlineEnd: 44, top: 44, width: 56, height: 56, borderRadius: 16, border: "1px solid var(--accent)" }} />
                </div>
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, lineHeight: 1.3 }}>{cl.client} | {cl.title}</h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--muted)" }}>{cl.summary}</p>
                  {real(cl.impact) && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}><strong>{t.work.impact}</strong> {cl.impact}</p>}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto", paddingTop: 6 }}>
                    {cl.tags.map((tag) => <span key={tag} style={{ fontSize: 12, fontWeight: 500, padding: "5px 10px", borderRadius: 999, background: "rgba(255,255,255,.06)", color: "var(--text2)" }}>{tag}</span>)}
                  </div>
                  <Link href={href(`/work/${cl.slug}`)} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>{t.work.read} <Arrow s={16} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-lab" className="on-dark" style={{ background: "radial-gradient(800px 400px at 15% 0%, rgba(106,145,255,.10), transparent 60%), var(--bg)", color: "#fff" }}>
        <div className="wrap sec">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 40 }}>
            <div>
              <p className="eyebrow">{t.lab.eyebrow}</p>
              <h2 className="h2">{t.lab.title}</h2>
              <p style={{ margin: "14px 0 0", maxWidth: 600, fontSize: 17, lineHeight: 1.6, color: "var(--text2)" }}>{t.lab.lead}</p>
            </div>
            <a href={profile.github} className="pill pill-dark-line" style={{ color: "#fff" }} dir="ltr">github.com/{profile.githubUser}</a>
          </div>
          <NovaSystem />
          <FeaturedProducts locale={locale} />
          <LabGrid />
        </div>
      </section>

      <section id="expertise">
        <div className="wrap sec">
          <p className="eyebrow">{t.expertise.eyebrow}</p>
          <h2 className="h2">{t.expertise.title}</h2>
          <p className="lead">{t.expertise.lead}</p>
          <SkillProof />
        </div>
      </section>

      <section id="insights" style={{ background: "var(--cloud)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap sec">
          <p className="eyebrow">{t.insights.eyebrow}</p>
          <h2 className="h2">{t.insights.title}</h2>
          <p className="lead">{t.insights.lead}</p>
          <h3 style={sectionTitle}>{t.insights.books}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {c.books.map((b) => (
              <a key={b.url} href={b.url} target="_blank" rel="noopener noreferrer" className="card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", color: "var(--text)", overflow: "hidden" }}>
                <span style={{ height: 200, background: b.cover, padding: 22, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", color: b.coverSub }}>{t.insights.author}</span>
                  <span className="display" style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }} dir="ltr">{b.short}</span>
                </span>
                <span style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 6 }}>
                  <span dir="ltr" style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.35, textAlign: "start" }}>{b.title}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.5, color: "var(--muted)" }}>{b.theme}</span>
                  <span style={{ marginTop: 6, fontSize: 14, fontWeight: 600, color: "var(--link)" }}>{t.insights.onAmazon} {t.arrow}</span>
                </span>
              </a>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginTop: 40 }}>
            <div>
              <h3 style={sectionTitle}>{t.insights.onStage}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.stage.map((v) => (
                  <a key={v.url} href={v.url} target="_blank" rel="noopener noreferrer" className="card" style={{ display: "flex", gap: 18, alignItems: "center", textDecoration: "none", color: "var(--text)", padding: 18 }}>
                    <span style={{ flex: "none", width: 120, height: 80, borderRadius: 12, background: "var(--bg)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M10 8.5l5 3.5-5 3.5z" /></svg>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", color: "var(--signal)" }}>{t.insights.kind[v.kind] ?? v.kind}</span>
                      <span dir="auto" style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.35 }}>{v.title}</span>
                      <span style={{ fontSize: 14, color: "var(--muted)" }}>{v.source}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 style={sectionTitle}>{t.insights.teaching}</h3>
              <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span className="display" style={{ fontSize: 40 }} dir="ltr">1,500+</span>
                  <span style={{ fontSize: 15, color: "var(--muted)" }}>{t.insights.trainedLine}</span>
                </div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}><strong style={{ color: "var(--text)" }}>TRAIL Academy</strong> — {t.insights.trailText}</p>
                <a href="https://trailacademy.fr" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", minHeight: 44, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>{t.insights.trailCta} {t.arrow}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ask" className="on-dark" style={{ background: "radial-gradient(700px 400px at 85% 20%, rgba(152,228,224,.08), transparent 60%), var(--cloud)", color: "#fff" }}>
        <div className="wrap sec" style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 340px", minWidth: 0 }}>
            <p className="eyebrow">{t.ask.eyebrow}</p>
            <h2 className="h2">{t.ask.title}</h2>
            <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.6, color: "var(--text2)" }}>{t.ask.text}</p>
            <ul style={{ margin: "24px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 15, color: "var(--text2)" }}>
              {t.ask.bullets.map((b) => (
                <li key={b} style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--signal)" }}>—</span>{b}</li>
              ))}
            </ul>
          </div>
          <AskSection />
        </div>
      </section>

      <section id="positioning">
        <div className="wrap" style={{ paddingBlock: 112, textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>{t.positioning.eyebrow}</p>
          <p className="display" style={{ margin: 0, fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 1.05, letterSpacing: "-0.035em" }}>{t.positioning.l1}<br />{t.positioning.l2}<br /><span style={{ color: "var(--accent)" }}>{t.positioning.l3}</span></p>
          <p style={{ margin: "28px auto 0", maxWidth: 620, fontSize: 19, lineHeight: 1.6, color: "var(--muted)" }}>{t.positioning.text}</p>
        </div>
      </section>

      <footer id="contact" style={{ background: "var(--cloud)", borderTop: "1px solid var(--line)", color: "#fff" }}>
        <div className="wrap" style={{ paddingBlock: "96px 40px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 40, alignItems: "flex-end" }}>
            <div style={{ flex: "1 1 420px", minWidth: 0 }}>
              <h2 className="display" style={{ margin: 0, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05 }}>{t.contact.title}</h2>
              <p style={{ margin: "16px 0 0", maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "var(--text2)" }}>{t.contact.text}</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <a href={`mailto:${profile.email}`} className="pill pill-accent" style={{ minHeight: 52, padding: "0 24px", color: "#07101f" }}>{t.contact.contactMe}</a>
              <a href={profile.cv} download="Yassine-Aqejjaj-CV.pdf" className="pill pill-dark-line" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>{t.contact.cv}</a>
              <a href={profile.linkedin} className="pill pill-dark-line" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>{t.contact.linkedin}</a>
              <a href={profile.github} className="pill pill-dark-line" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>{t.contact.github}</a>
            </div>
          </div>
          <div style={{ marginTop: 72, paddingTop: 24, borderTop: "1px solid var(--line)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, fontSize: 14, color: "var(--muted)" }}>
            <span>© {new Date().getFullYear()} {t.rights}</span>
            <span dir="ltr">iaseen.com</span>
          </div>
        </div>
      </footer>
      </PathLayout>
    </>
  );
}
