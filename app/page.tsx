import Link from "next/link";
import Header from "@/components/Header";
import Journey from "@/components/Journey";
import LabGrid from "@/components/LabGrid";
import SkillProof from "@/components/SkillProof";
import AskSection from "@/components/AskSection";
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
      <section id="top" style={{ background: "var(--cloud)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingBlock: "88px 72px", display: "flex", flexWrap: "wrap", gap: 56, alignItems: "center" }}>
          <div style={{ flex: "999 1 560px", minWidth: 0 }}>
            <p className="eyebrow" style={{ marginBottom: 24 }}>HEAD OF AI · PRODUCT BUILDER · AI STRATEGIST</p>
            <h1 className="display" style={{ margin: 0, fontSize: "clamp(44px, 6.4vw, 84px)", lineHeight: 1.02, letterSpacing: "-0.035em" }}>
              I don&apos;t just lead AI.<br /><span style={{ color: "var(--accent)" }}>I build it.</span>
            </h1>
            <p style={{ margin: "28px 0 0", maxWidth: 600, fontSize: 19, lineHeight: 1.6, color: "var(--body)" }}>
              From enterprise AI strategy to production-ready agentic systems. Turning ideas into products, teams into builders, and AI into measurable outcomes.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
              <Link href="/#ai-lab" className="pill pill-accent" style={{ minHeight: 52, padding: "0 26px", fontSize: 16, color: "#fff" }}>View my work <Arrow /></Link>
              <Link href="/#experience" className="pill pill-line" style={{ minHeight: 52, padding: "0 26px", fontSize: 16 }}>Interactive CV</Link>
            </div>
          </div>
          <aside aria-label="Three proofs" style={{ flex: "1 1 340px", minWidth: 0, background: "var(--midnight)", color: "#fff", borderRadius: 24, padding: 28, display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 60px -24px rgba(11,16,32,.45)" }}>
            <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 600, letterSpacing: ".14em", color: "#9aabd6" }}>EVERY CLAIM, LINKED TO A PROOF</p>
            {proofs.map(([n, t, d, h]) => (
              <Link key={n} href={h} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: 16, borderRadius: 16, background: "var(--slate)", textDecoration: "none", color: "#fff" }}>
                <span className="display" style={{ fontSize: 14, color: "#8fa6ff", minWidth: 28, letterSpacing: 0 }}>{n}</span>
                <span style={{ display: "flex", flexDirection: "column", gap: 4 }}><strong style={{ fontSize: 17, fontWeight: 600 }}>{t}</strong><span style={{ fontSize: 14, lineHeight: 1.5, color: "#c3cce3" }}>{d}</span></span>
              </Link>
            ))}
          </aside>
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
            {["thales", "decathlon", "carrefour", "fujitsu", "devoteam", "axa", "banquepopulaire"].map((c) => (
              <span key={c} style={{ display: "inline-flex", alignItems: "center", background: "var(--midnight)", borderRadius: 12, padding: "10px 16px", minHeight: 24 }}><ClientLogo name={c} height={22} /></span>
            ))}
          </div>
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
                <div style={{ height: 168, background: "var(--midnight)", position: "relative", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".14em", color: "#9aabd6" }}>{c.sector}</span>
                  <ClientLogo name={c.logo} height={40} />
                  <span aria-hidden style={{ position: "absolute", right: 24, top: 24, width: 56, height: 56, borderRadius: 16, border: "1px solid #2e3b5a" }} />
                  <span aria-hidden style={{ position: "absolute", right: 44, top: 44, width: 56, height: 56, borderRadius: 16, border: "1px solid var(--accent)" }} />
                </div>
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, lineHeight: 1.3 }}>{c.client} | {c.title}</h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--muted)" }}>{c.summary}</p>
                  {real(c.impact) && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}><strong>Impact:</strong> {c.impact}</p>}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto", paddingTop: 6 }}>
                    {c.tags.map((t) => <span key={t} style={{ fontSize: 12, fontWeight: 500, padding: "5px 10px", borderRadius: 999, background: "#f0f3fa", color: "var(--body)" }}>{t}</span>)}
                  </div>
                  <Link href={`/work/${c.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Read the case study <Arrow s={16} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-lab" className="on-dark" style={{ background: "var(--midnight)", color: "#fff" }}>
        <div className="wrap sec">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 40 }}>
            <div>
              <p className="eyebrow">AI LAB · BUILT BY ME</p>
              <h2 className="h2">Products, not just repos</h2>
              <p style={{ margin: "14px 0 0", maxWidth: 600, fontSize: 17, lineHeight: 1.6, color: "#c3cce3" }}>Agentic platforms, health and learning tools I design, code and ship myself. Featured projects are curated; the full list lives on GitHub.</p>
            </div>
            <a href={profile.github} className="pill pill-dark-line" style={{ color: "#fff" }}>github.com/{profile.githubUser}</a>
          </div>
          <article style={{ background: "var(--slate)", border: "1px solid #2e3b5a", borderRadius: 28, padding: 40, display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center" }}>
            <div style={{ flex: "1 1 380px", minWidth: 0 }}>
              <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", padding: "6px 12px", borderRadius: 999, background: "var(--accent)" }}>FLAGSHIP</span>
              <h3 className="display" style={{ margin: "18px 0 0", fontSize: 44, lineHeight: 1.05 }}>ORION</h3>
              <p style={{ margin: "8px 0 0", fontSize: 18, fontWeight: 500, color: "#8fa6ff" }}>The Intelligence Loop</p>
              <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.65, color: "#c3cce3" }}>An agentic AI platform in three parts. NOVA acts: one intelligence, several specialised agents. ORBIT gives NOVA the right context: knowledge, documents and memory. FORGE evaluates every result so the system keeps improving.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
                <a href={`${profile.github}/NOVA`} className="pill" style={{ minHeight: 44, padding: "0 18px", background: "#fff", color: "var(--midnight)", fontSize: 14 }}>NOVA on GitHub</a>
                <a href={`${profile.github}/FORGE`} className="pill pill-dark-line" style={{ minHeight: 44, padding: "0 18px", fontSize: 14, color: "#fff" }}>FORGE</a>
              </div>
            </div>
            <div role="img" aria-label="ORION loop: NOVA acts, ORBIT provides context, FORGE evaluates" style={{ flex: "1 1 420px", minWidth: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, alignItems: "stretch" }}>
              {[["ACT", "NOVA", "Orchestrates specialised agents", true], ["CONTEXT", "ORBIT", "Governed context and memory", false], ["EVALUATE", "FORGE", "Benchmarks and improves agents", false]].map(([k, n, d, hl]) => (
                <div key={String(n)} style={{ background: "var(--midnight)", border: `1px solid ${hl ? "var(--accent)" : "#2e3b5a"}`, borderRadius: 20, padding: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "#8fa6ff" }}>{k}</span>
                  <span className="display" style={{ fontSize: 22, letterSpacing: 0 }}>{n}</span>
                  <span style={{ fontSize: 13, lineHeight: 1.5, color: "#c3cce3" }}>{d}</span>
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#9aabd6" }}>
                <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8FA6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" /></svg>
                Each evaluation feeds back into context and behaviour: a closed improvement loop.
              </div>
            </div>
          </article>
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
              <a key={b.url} href={b.url} target="_blank" rel="noopener noreferrer" className="card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", color: "var(--midnight)", overflow: "hidden" }}>
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
              <a href="https://youtu.be/6Ip6mfupjso" className="card" style={{ display: "flex", gap: 18, alignItems: "center", textDecoration: "none", color: "var(--midnight)", padding: 18 }}>
                <span style={{ flex: "none", width: 120, height: 80, borderRadius: 12, background: "var(--midnight)", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--body)" }}><strong style={{ color: "var(--midnight)" }}>TRAIL Academy</strong> — my professional AI learning platform, built to turn teams into builders.</p>
                <a href={`${profile.github}/TRAIL-Academy`} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Explore TRAIL Academy →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ask" className="on-dark" style={{ background: "var(--slate)", color: "#fff" }}>
        <div className="wrap sec" style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 340px", minWidth: 0 }}>
            <p className="eyebrow">ASK MY AI</p>
            <h2 className="h2">An interactive guide to my work</h2>
            <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.6, color: "#c3cce3" }}>It only answers from validated portfolio content and always links its sources.</p>
            <ul style={{ margin: "24px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 15, color: "#c3cce3" }}>
              {["Answers recruiter and client questions", "Explains product architecture", "Recommends the most relevant projects for your need"].map((t) => (
                <li key={t} style={{ display: "flex", gap: 10 }}><span style={{ color: "#8fa6ff" }}>—</span>{t}</li>
              ))}
            </ul>
          </div>
          <AskSection />
        </div>
      </section>

      <section>
        <div className="wrap" style={{ paddingBlock: 112, textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>PERSONAL POSITIONING</p>
          <p className="display" style={{ margin: 0, fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 1.05, letterSpacing: "-0.035em" }}>AI Leader.<br />Product Builder.<br /><span style={{ color: "var(--accent)" }}>Entrepreneur.</span></p>
          <p style={{ margin: "28px auto 0", maxWidth: 620, fontSize: 19, lineHeight: 1.6, color: "var(--muted)" }}>Leading AI at scale. Building products from scratch. Turning technology into business impact.</p>
        </div>
      </section>

      <footer id="contact" style={{ background: "var(--midnight)", color: "#fff" }}>
        <div className="wrap" style={{ paddingBlock: "96px 40px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 40, alignItems: "flex-end" }}>
            <div style={{ flex: "1 1 420px", minWidth: 0 }}>
              <h2 className="display" style={{ margin: 0, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05 }}>Let&apos;s build what&apos;s next.</h2>
              <p style={{ margin: "16px 0 0", maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "#c3cce3" }}>Leadership roles, AI programmes, product partnerships or a talk: I reply to every serious message.</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <a href={`mailto:${profile.email}`} className="pill pill-accent" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>Contact me</a>
              <Link href={profile.cv} className="pill pill-dark-line" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>CV (PDF)</Link>
              <a href={profile.linkedin} className="pill pill-dark-line" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>LinkedIn</a>
              <a href={profile.github} className="pill pill-dark-line" style={{ minHeight: 52, padding: "0 24px", color: "#fff" }}>GitHub</a>
            </div>
          </div>
          <div style={{ marginTop: 72, paddingTop: 24, borderTop: "1px solid #243150", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, fontSize: 14, color: "#9aabd6" }}>
            <span>© {new Date().getFullYear()} Yassine Aqejjaj</span>
            <span>iaseen.com</span>
          </div>
        </div>
      </footer>
    </>
  );
}
