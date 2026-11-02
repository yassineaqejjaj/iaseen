import Link from "next/link";
import ClientCard from "@/components/ClientCard";
import MobileFold from "@/components/MobileFold";
import Header from "@/components/Header";
import AskSection from "@/components/AskSection";
import LogoMarquee from "@/components/LogoMarquee";
import { latestPosts } from "@/lib/blog";
import { KpiRow } from "@/components/Kpi";
import Interlude from "@/components/Interlude";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import HeroStory from "@/components/HeroStory";
import About from "@/components/About";
import SectionAsk from "@/components/SectionAsk";
import Faq from "@/components/Faq";
import { homeGraph, ld } from "@/lib/schema";
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
    ["13", t.stats.years], ["€12M+", t.stats.pipeline], ["800", t.stats.users], ["1,500+", t.stats.trained], [String(c.books.length), t.stats.books],
    ...(repos ? [[String(repos), t.stats.repos]] : []),
  ];
  const sectionTitle = { margin: "0 0 16px", fontSize: 13, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" } as const;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(homeGraph(locale)) }} />
      <Header locale={locale} />
      <nav className="m-anchors" aria-label="Sections">
        {(["#about", "#client-work", "#ai-lab", "#insights", "#contact"] as const).map((id, i) => <a key={id} href={id}>{t.more.anchors[i]}</a>)}
      </nav>
      <main className="paths">
      <HeroStory />

      <section id="numbers" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingBlock: "56px 64px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {stats.map(([v, l]) => (
              <div key={l} className="card" style={{ borderRadius: 16, padding: 24 }}>
                <p className="display" style={{ margin: 0, fontSize: 44 }} dir="ltr">{v}</p>
                <p style={{ margin: "6px 0 0", fontSize: 15, color: "var(--muted)" }}>{l}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <LogoMarquee label={t.trusted} names={["thales", "decathlon", "carrefour", "fujitsu", "devoteam", "axa", "banquepopulaire", "pmoffice"]} seconds={38} />
            <LogoMarquee label={t.partners} names={["anthropic", "google", "elevenlabs", "cursor"]} reverse seconds={30} />
          </div>
        </div>
      </section>

      <About locale={locale} />
      <Interlude i={0} />

      <section id="experience">
        <div className="wrap sec">
          <p className="eyebrow">{t.journey.eyebrow}</p>
          <h2 className="h2">{t.journey.title}</h2>
          <p className="lead" style={{ marginBottom: 32 }}>{t.journey.lead}</p>
          <SectionAsk q={[0, 2]} />
          <p style={{ margin: "0 0 20px" }}><Link href={href("/experience")} className="pill pill-accent" style={{ color: "#05060a" }}>{t.about.journey} {t.arrow}</Link></p>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <a href={profile.cv} download="Yassine-Aqejjaj-CV.pdf" className="pill pill-line">{t.journey.download}</a>
            <span style={{ fontSize: 14, color: "var(--muted)" }}>{t.journey.downloadNote}</span>
          </div>
        </div>
      </section>

      <Interlude i={1} />

      <section id="client-work" style={{ background: "var(--cloud)", borderBlock: "1px solid var(--line)" }}>
        <div className="wrap sec">
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2 className="h2">{t.work.title}</h2>
          <p className="lead">{t.work.lead}</p>
          <SectionAsk q={[3, 0]} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {c.clients.slice(0, 3).map((cl) => <ClientCard key={cl.slug} cl={cl} locale={locale} />)}
          </div>
          <p style={{ margin: "28px 0 0" }}><Link href={href("/work")} className="pill pill-line">{t.pages.allWork} {t.arrow}</Link></p>
        </div>
      </section>

      <Interlude i={2} />

      <section id="ai-lab" className="on-dark" style={{ background: "radial-gradient(800px 400px at 15% 0%, rgba(76,111,240,.10), transparent 60%), var(--bg)", color: "#fff" }}>
        <div className="wrap sec">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 40 }}>
            <div>
              <p className="eyebrow">{t.lab.eyebrow}</p>
              <h2 className="h2">{t.lab.title}</h2>
              <p style={{ margin: "14px 0 0", maxWidth: 600, fontSize: 17, lineHeight: 1.6, color: "var(--text2)" }}>{t.lab.lead}</p>
            </div>
            <a href={profile.github} className="pill pill-dark-line" style={{ color: "#fff" }} dir="ltr">github.com/{profile.githubUser}</a>
          </div>
          <SectionAsk q={[1, 4]} />
          <FeaturedProducts locale={locale} />
          <p style={{ margin: "32px 0 0" }}><Link href={href("/lab")} className="pill pill-dark-line" style={{ color: "#fff" }}>{t.pages.allLab} {t.arrow}</Link></p>
        </div>
      </section>

      <Interlude i={3} />

      <section id="expertise">
        <div className="wrap sec">
          <p className="eyebrow">{t.expertise.eyebrow}</p>
          <h2 className="h2">{t.expertise.title}</h2>
          <p className="lead">{t.expertise.lead}</p>
          <SectionAsk q={[2, 4]} />
          <p style={{ margin: "0" }}><Link href={href("/expertise")} className="pill pill-line">{t.nav.expertise} {t.arrow}</Link></p>
        </div>
      </section>

      <section id="insights" style={{ background: "var(--cloud)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap sec">
          <p className="eyebrow">{t.insights.eyebrow}</p>
          <h2 className="h2">{t.insights.title}</h2>
          <p className="lead">{t.insights.lead}</p>
          <SectionAsk q={[5]} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16, marginBottom: 40 }}>
            {[
              { slug: "agentic-transformation", cover: "/whitepapers/agentic-transformation-cover.webp", d: t.wp2 },
              { slug: "ai-factory-guide", cover: "/whitepapers/ai-factory-cover.webp", d: t.wp },
            ].map((w) => (
              <Link key={w.slug} href={href(`/resources/${w.slug}`)} className="card" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 18, padding: 22, textDecoration: "none", color: "var(--text)", borderColor: "rgba(76,111,240,.4)" }}>
                <span style={{ flex: "none", width: 60, aspectRatio: "794 / 1123", borderRadius: 6, overflow: "hidden", border: "1px solid var(--line)", background: `#05060a url(${w.cover}) center / cover` }} aria-hidden />
                <span style={{ flex: "1 1 200px", minWidth: 0 }}>
                  <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".2em", color: "var(--signal)" }}>{w.d.teaser}</span>
                  <span className="display" style={{ display: "block", marginTop: 6, fontSize: 21, lineHeight: 1.15 }}>{w.d.title}</span>
                  <span style={{ display: "block", marginTop: 6, fontSize: 14, color: "var(--text2)" }}>{w.d.teaserText}</span>
                </span>
              </Link>
            ))}
          </div>
          <h3 style={sectionTitle}>{t.blog.latest}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 48 }}>
            {latestPosts(4).map((p) => (
              <Link key={p.slug} href={href(`/blog/${p.slug}`)} className="card" style={{ padding: 22, textDecoration: "none", color: "var(--text)", display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", color: "var(--signal)" }}>{p.tags[0].toUpperCase()} · {p.minutes} {t.blog.read}</span>
                <span className="display" style={{ fontSize: 20, lineHeight: 1.25 }} dir="auto">{p[locale].title}</span>
              </Link>
            ))}
          </div>
          <p style={{ margin: "-32px 0 32px" }}><Link href={href("/blog")} style={{ fontWeight: 600, fontSize: 15 }}>{t.blog.all} {t.arrow}</Link></p>
          <p style={{ margin: "0" }}><Link href={href("/insights")} className="pill pill-line">{t.nav.insights} {t.arrow}</Link></p>
        </div>
      </section>

      <section id="ask" className="on-dark" style={{ background: "radial-gradient(700px 400px at 85% 20%, rgba(123,150,255,.08), transparent 60%), var(--cloud)", color: "#fff" }}>
        <div className="wrap sec" style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 340px", minWidth: 0 }}>
            <p className="eyebrow">{t.ask.eyebrow}</p>
            <h2 className="h2">{t.ask.title}</h2>
            <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.6, color: "var(--text2)" }}>{t.ask.text}</p>
            <ul className="ask-bullets" style={{ margin: "24px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 15, color: "var(--text2)" }}>
              {t.ask.bullets.map((b) => (
                <li key={b} style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--signal)" }}>—</span>{b}</li>
              ))}
            </ul>
          </div>
          <MobileFold label={t.ask.title}><AskSection /></MobileFold>
        </div>
      </section>

      <Faq locale={locale} />

      <footer id="contact" style={{ background: "var(--cloud)", borderTop: "1px solid var(--line)", color: "#fff" }}>
        <div className="wrap" style={{ paddingBlock: "96px 40px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 40, alignItems: "flex-end" }}>
            <div style={{ flex: "1 1 420px", minWidth: 0 }}>
              <h2 className="display" style={{ margin: 0, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05 }}>{t.contact.title}</h2>
              <p style={{ margin: "16px 0 0", maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "var(--text2)" }}>{t.contact.text}</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <a href={`mailto:${profile.email}`} className="pill pill-accent" style={{ minHeight: 52, padding: "0 24px", color: "#05060a" }}>{t.contact.contactMe}</a>
              <a href={profile.cv} download="Yassine-Aqejjaj-CV.pdf" className="pill pill-dark-line" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>{t.contact.cv}</a>
              <a href={profile.linkedin} className="pill pill-dark-line" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>{t.contact.linkedin}</a>
              <a href={profile.github} className="pill pill-dark-line" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>{t.contact.github}</a>
            </div>
          </div>
          <div style={{ marginTop: 72, paddingTop: 24, borderTop: "1px solid var(--line)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, fontSize: 14, color: "var(--muted)" }}>
            <span>© {new Date().getFullYear()} {t.rights}</span>
            <span style={{ display: "inline-flex", gap: 20 }}><Link href={href("/speaking")} style={{ color: "inherit" }}>{t.speaking.nav}</Link><Link href={href("/privacy")} style={{ color: "inherit" }}>{t.wp.privacyLink}</Link><span dir="ltr">iaseen.com</span></span>
          </div>
        </div>
      </footer>
      </main>
    </>
  );
}
