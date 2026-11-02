import Link from "next/link";
import { latestPosts } from "@/lib/blog";
import { getI18n, type Locale } from "@/lib/i18n";

/** Everything published: white papers, blog, books, talks, press and teaching. Used by /insights. */
export default function InsightsFull({ locale }: { locale: Locale }) {
  const { t, c, href } = getI18n(locale);
  const sectionTitle = { margin: "0 0 16px", fontSize: 13, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" } as const;
  return (
    <>
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
            {latestPosts(12).map((p) => (
              <Link key={p.slug} href={href(`/blog/${p.slug}`)} className="card" style={{ padding: 22, textDecoration: "none", color: "var(--text)", display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", color: "var(--signal)" }}>{p.tags[0].toUpperCase()} · {p.minutes} {t.blog.read}</span>
                <span className="display" style={{ fontSize: 20, lineHeight: 1.25 }} dir="auto">{p[locale].title}</span>
              </Link>
            ))}
          </div>
          <p style={{ margin: "-32px 0 48px" }}><Link href={href("/blog")} style={{ fontWeight: 600, fontSize: 15 }}>{t.blog.all} {t.arrow}</Link></p>
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
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginTop: 8 }}>
            <div>
              <h3 style={sectionTitle}>{t.insights.onStage}</h3>
              <Link href={href("/speaking")} aria-label={t.speaking.all} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12, textDecoration: "none" }}>
                {t.speaking.items.map((it) => (
                  <img key={it.img} src={it.img} alt={it.alt} width={600} height={400} loading="lazy" decoding="async" style={{ display: "block", width: "100%", aspectRatio: "3 / 2", objectFit: "cover", objectPosition: "50% 60%", borderRadius: 14, border: "1px solid var(--line)" }} />
                ))}
              </Link>
              <p style={{ margin: "0 0 14px", fontSize: 14 }}><Link href={href("/speaking")} style={{ fontWeight: 600, color: "var(--link)" }}>{t.speaking.all} {t.arrow}</Link></p>
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
              <h3 style={sectionTitle}>{t.insights.inPrint}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {c.articles.map((v) => (
                  <a key={v.url} href={v.url} target="_blank" rel="noopener noreferrer" className="card" style={{ display: "flex", gap: 18, alignItems: "center", textDecoration: "none", color: "var(--text)", padding: 18 }}>
                    <span style={{ flex: "none", width: 120, height: 80, borderRadius: 12, background: "var(--bg)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg aria-hidden width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></svg>
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
    </>
  );
}
