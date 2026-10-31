import Link from "next/link";
import Header from "@/components/Header";
import Journey from "@/components/Journey";
import LabGrid from "@/components/LabGrid";
import SkillProof from "@/components/SkillProof";
import AskSection from "@/components/AskSection";
import ProofPanel from "@/components/ProofPanel";
import HeroOrb from "@/components/HeroOrb";
import HeroTitle from "@/components/HeroTitle";
import NovaSystem from "@/components/NovaSystem";
import PathLayout from "@/components/PathLayout";
import ClientLogo from "@/components/ClientLogo";
import { profile, clients, books, real } from "@/lib/content";

export const revalidate = 3600;

async function repoCount(): Promise<number | null> {
  try {
    const r = await fetch(`https://api.github.com/users/${profile.githubUser}`, { next: { revalidate: 3600 } });
    if (!r.ok) return null;
    return ((await r.json()) as { public_repos?: number }).public_repos ?? null;
  } catch { return null; }
}

const Arrow = ({ s = 18 }: { s?: number }) => (
  <svg aria-hidden width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default async function Home() {
  const repos = await repoCount();
  const stats = [
    ["13", "Years of experience"], ["€12M+", "Commercial pipeline"], ["3,000+", "NOVA users"], ["1,500+", "Professionals trained"], [String(books.length), "Books published"],
    ...(repos ? [[String(repos), "Public repos on GitHub"]] : []),
  ];
  const proofs = [
    ["01", "Lead", "Strategy, operating model, governance, transformation", "/#experience"],
    ["02", "Deliver", "Client programmes, teams and AI in production", "/#client-work"],
    ["03", "Build", "Agentic platforms, products and open code on GitHub", "/#ai-lab"],
  ];
  return (
    <>
      <Header />
      <PathLayout>
      <section id="top" style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--line)", background: "radial-gradient(900px 500px at 78% 10%, rgba(106,145,255,.16), transparent 60%), radial-gradient(600px 400px at 10% 90%, rgba(152,228,224,.07), transparent 60%), var(--bg)" }}>
        <div className="wrap" style={{ paddingBlock: "88px 72px", display: "flex", flexWrap: "wrap", gap: 56, alignItems: "center" }}>
          <div style={{ flex: "999 1 560px", minWidth: 0 }}>
            <p className="eyebrow" style={{ marginBottom: 24 }}>HEAD OF AI · PRODUCT BUILDER · AI STRATEGIST</p>
            <HeroTitle />
            <p style={{ margin: "28px 0 0", maxWidth: 600, fontSize: 19, lineHeight: 1.6, color: "var(--body)" }}>
              From enterprise AI strategy to production-ready agentic systems. Turning ideas into products, teams into builders, and AI into measurable outcomes.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
              <Link href="/#ai-lab" className="pill pill-accent" style={{ minHeight: 52, padding: "0 26px", fontSize: 16, color: "#07101f" }}>Explore my work <Arrow /></Link>
              <Link href="/#ask" className="pill pill-line" style={{ minHeight: 52, padding: "0 26px", fontSize: 16 }}>Ask my AI</Link>
              <Link href="/#experience" style={{ display: "inline-flex", alignItems: "center", minHeight: 52, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Interactive CV →</Link>
            </div>
          </div>
          <div style={{ flex: "1 1 340px", minWidth: 0 }}><HeroOrb /></div>
        </div>
        <div className="wrap" style={{ paddingBottom: 72 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {stats.map(([v, l]) => (
              <div key={l} className="card" style={{ borderRadius: 16, padding: 24 }}>
                <p className="display" style={{ margin: 0, fontSize: 44 }}>{v}</p>
                <p style={{ margin: "6px 0 0", fontSize: 15, color: "var(--muted)" }}>{l}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 40px" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".14em", color: "var(--muted)" }}>TRUSTED BY</span>
            {["thales", "decathlon", "carrefour", "fujitsu", "devoteam", "axa", "banquepopulaire", "pmoffice"].map((c) => (
              <span key={c} style={{ display: "inline-flex", alignItems: "center", opacity: .85 }}><ClientLogo name={c} height={c === "pmoffice" ? 72 : c === "devoteam" ? 48 : c === "axa" ? 48 : 28} /></span>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingBlock: "96px" }}>
          <p className="eyebrow">LEAD · DELIVER · BUILD</p>
          <h2 className="h2" style={{ marginBottom: 32 }}>Every claim, linked to a proof</h2>
          <ProofPanel />
        </div>
      </section>

      <section id="experience">
        <div className="wrap sec">
          <p className="eyebrow">EXPERIENCE · INTERACTIVE CV</p>
          <h2 className="h2">Professional journey</h2>
          <p className="lead" style={{ marginBottom: 32 }}>Pick a lens to read the same career the way a CEO, a product leader or a CTO would.</p>
          <Journey />
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <Link href={profile.cv} className="pill pill-line">Download CV (PDF)</Link>
            <span style={{ fontSize: 14, color: "var(--muted)" }}>Same content as this page, ready to save as PDF.</span>
          </div>
        </div>
      </section>

      <section id="client-work" style={{ background: "var(--cloud)", borderBlock: "1px solid var(--line)" }}>
        <div className="wrap sec">
          <p className="eyebrow">CLIENT WORK</p>
          <h2 className="h2">AI in complex, real environments</h2>
          <p className="lead">Every case study follows the same path: context, problem, my role, approach, solution, impact, lessons learned. Only public or client-approved information is shared.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {clients.map((c) => (
              <article key={c.slug} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 168, background: "linear-gradient(135deg, #0d1320, #131c33)", position: "relative", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".14em", color: "var(--muted)" }}>{c.sector}</span>
                  <ClientLogo name={c.logo} height={c.logo === "pmoffice" ? 76 : c.logo === "thales" ? 34 : 44} />
                  <span aria-hidden style={{ position: "absolute", right: 24, top: 24, width: 56, height: 56, borderRadius: 16, border: "1px solid var(--line)" }} />
                  <span aria-hidden style={{ position: "absolute", right: 44, top: 44, width: 56, height: 56, borderRadius: 16, border: "1px solid var(--accent)" }} />
                </div>
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, lineHeight: 1.3 }}>{c.client} | {c.title}</h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--muted)" }}>{c.summary}</p>
                  {real(c.impact) && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}><strong>Impact:</strong> {c.impact}</p>}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto", paddingTop: 6 }}>
                    {c.tags.map((t) => <span key={t} style={{ fontSize: 12, fontWeight: 500, padding: "5px 10px", borderRadius: 999, background: "rgba(255,255,255,.06)", color: "var(--text2)" }}>{t}</span>)}
                  </div>
                  <Link href={`/work/${c.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Read the case study <Arrow s={16} /></Link>
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
              <p className="eyebrow">AI LAB · BUILT BY ME</p>
              <h2 className="h2">Products, not just repos</h2>
              <p style={{ margin: "14px 0 0", maxWidth: 600, fontSize: 17, lineHeight: 1.6, color: "var(--text2)" }}>Agentic platforms, health and learning tools I design, code and ship myself. Featured projects are curated; the full list lives on GitHub.</p>
            </div>
            <a href={profile.github} className="pill pill-dark-line" style={{ color: "#fff" }}>github.com/{profile.githubUser}</a>
          </div>
          <NovaSystem />
          <LabGrid />
        </div>
      </section>

      <section id="expertise">
        <div className="wrap sec">
          <p className="eyebrow">EXPERTISE</p>
          <h2 className="h2">No skill bars. Proof.</h2>
          <p className="lead">Select a skill to see the roles, missions and products that back it up.</p>
          <SkillProof />
        </div>
      </section>

      <section id="insights" style={{ background: "var(--cloud)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap sec">
          <p className="eyebrow">INSIGHTS</p>
          <h2 className="h2">Ideas, on stage, teaching</h2>
          <p className="lead">Four books, talks and training programmes on AI, leadership and the future of work.</p>
          <h3 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>IDEAS · BOOKS</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {books.map((b) => (
              <a key={b.url} href={b.url} target="_blank" rel="noopener noreferrer" className="card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", color: "var(--text)", overflow: "hidden" }}>
                <span style={{ height: 200, background: b.cover, padding: 22, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", color: b.coverSub }}>YASSINE AQEJJAJ</span>
                  <span className="display" style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }}>{b.short}</span>
                </span>
                <span style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.35 }}>{b.title}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.5, color: "var(--muted)" }}>{b.theme}</span>
                  <span style={{ marginTop: 6, fontSize: 14, fontWeight: 600, color: "var(--link)" }}>On Amazon →</span>
                </span>
              </a>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginTop: 40 }}>
            <div>
              <h3 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>ON STAGE</h3>
              <a href="https://youtu.be/6Ip6mfupjso" className="card" style={{ display: "flex", gap: 18, alignItems: "center", textDecoration: "none", color: "var(--text)", padding: 18 }}>
                <span style={{ flex: "none", width: 120, height: 80, borderRadius: 12, background: "var(--bg)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg aria-hidden width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M10 8.5l5 3.5-5 3.5z" /></svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", color: "var(--link)" }}>PODCAST</span>
                  <span style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.35 }}>Podcast appearance</span>
                  <span style={{ fontSize: 14, color: "var(--muted)" }}>Watch on YouTube</span>
                </span>
              </a>
            </div>
            <div>
              <h3 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>TEACHING</h3>
              <div className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span className="display" style={{ fontSize: 40 }}>1,500+</span>
                  <span style={{ fontSize: 15, color: "var(--muted)" }}>people trained in AI</span>
                </div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}><strong style={{ color: "var(--text)" }}>TRAIL Academy</strong> — my professional AI learning platform, built to turn teams into builders.</p>
                <a href={`${profile.github}/TRAIL-Academy`} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Explore TRAIL Academy →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ask" className="on-dark" style={{ background: "radial-gradient(700px 400px at 85% 20%, rgba(152,228,224,.08), transparent 60%), var(--cloud)", color: "#fff" }}>
        <div className="wrap sec" style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 340px", minWidth: 0 }}>
            <p className="eyebrow">ASK MY AI</p>
            <h2 className="h2">An interactive guide to my work</h2>
            <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.6, color: "var(--text2)" }}>It only answers from validated portfolio content and always links its sources.</p>
            <ul style={{ margin: "24px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 15, color: "var(--text2)" }}>
              {["Answers recruiter and client questions", "Explains product architecture", "Recommends the most relevant projects for your need"].map((t) => (
                <li key={t} style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--signal)" }}>—</span>{t}</li>
              ))}
            </ul>
          </div>
          <AskSection />
        </div>
      </section>

      <section id="positioning">
        <div className="wrap" style={{ paddingBlock: 112, textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>PERSONAL POSITIONING</p>
          <p className="display" style={{ margin: 0, fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 1.05, letterSpacing: "-0.035em" }}>AI Leader.<br />Product Builder.<br /><span style={{ color: "var(--accent)" }}>Entrepreneur.</span></p>
          <p style={{ margin: "28px auto 0", maxWidth: 620, fontSize: 19, lineHeight: 1.6, color: "var(--muted)" }}>Leading AI at scale. Building products from scratch. Turning technology into business impact.</p>
        </div>
      </section>

      <footer id="contact" style={{ background: "var(--cloud)", borderTop: "1px solid var(--line)", color: "#fff" }}>
        <div className="wrap" style={{ paddingBlock: "96px 40px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 40, alignItems: "flex-end" }}>
            <div style={{ flex: "1 1 420px", minWidth: 0 }}>
              <h2 className="display" style={{ margin: 0, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05 }}>Let&apos;s build what&apos;s next.</h2>
              <p style={{ margin: "16px 0 0", maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "var(--text2)" }}>Leadership roles, AI programmes, product partnerships or a talk: I reply to every serious message.</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <a href={`mailto:${profile.email}`} className="pill pill-accent" style={{ minHeight: 52, padding: "0 24px", color: "#07101f" }}>Contact me</a>
              <Link href={profile.cv} className="pill pill-dark-line" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>CV (PDF)</Link>
              <a href={profile.linkedin} className="pill pill-dark-line" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>LinkedIn</a>
              <a href={profile.github} className="pill pill-dark-line" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>GitHub</a>
            </div>
          </div>
          <div style={{ marginTop: 72, paddingTop: 24, borderTop: "1px solid var(--line)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, fontSize: 14, color: "var(--muted)" }}>
            <span>© {new Date().getFullYear()} Yassine Aqejjaj</span>
            <span>iaseen.com</span>
          </div>
        </div>
      </footer>
      </PathLayout>
    </>
  );
}
