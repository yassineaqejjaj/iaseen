import Link from "next/link";
import { notFound } from "next/navigation";
import BlogDiagram from "@/components/BlogDiagram";
import Header from "@/components/Header";
import { postBySlug, posts } from "@/lib/blog";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";
import { ld, postGraph } from "@/lib/schema";

export function generateStaticParams() { return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug }))); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = postBySlug(slug);
  if (!isLocale(locale) || !post) return {};
  const x = post[locale];
  const p = (l: string) => (l === "en" ? `/blog/${slug}` : `/${l}/blog/${slug}`);
  const description = x.dek.slice(0, 160);
  return {
    title: `${x.title} | Yassine Aqejjaj`.length > 70 ? x.title : `${x.title} | Yassine Aqejjaj`, description,
    openGraph: { title: x.title, description, type: "article" as const, locale, publishedTime: post.date, images: [{ url: `${locale === "en" ? "" : `/${locale}`}/opengraph-image`, width: 1200, height: 630, alt: x.title }] },
    alternates: { canonical: p(locale), languages: { en: p("en"), fr: p("fr"), ar: p("ar") } },
  };
}

type SectionData = { h: string; p?: string[]; list?: string[]; table?: { head: string[]; rows: string[][] } };
function Section({ s }: { s: SectionData }) {
  return (
    <section>
      <h2 dir="auto">{s.h}</h2>
      {s.p?.map((q) => <p key={q} dir="auto">{q}</p>)}
      {s.list && <ul className="prose-list" dir="auto">{s.list.map((i) => <li key={i}>{i}</li>)}</ul>}
      {s.table && (
        <div className="prose-table" dir="auto">
          <table>
            <thead><tr>{s.table.head.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
            <tbody>{s.table.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}</tr>)}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default async function PostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: l, slug } = await params;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const post = postBySlug(slug);
  if (!post) notFound();
  const { t, c, href } = getI18n(locale);
  const b = t.blog;
  const x = post[locale];
  const fmt = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" });
  const others = posts.filter((o) => o.slug !== slug);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(postGraph(locale, slug)) }} />
      <Header locale={locale} />
      <main>
        <article>
          <header style={{ background: "radial-gradient(800px 400px at 80% 0%, rgba(76,111,240,.14), transparent 60%), var(--bg)", color: "#fff", borderBottom: "1px solid var(--line)" }}>
            <div className="wrap" style={{ paddingBlock: "48px 56px" }}>
              <Link href={href("/blog")} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, marginBottom: 18, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                <span aria-hidden className="flip">←</span> {b.back}
              </Link>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "var(--signal)" }}>
                {fmt.format(new Date(post.date))} · {post.minutes} {b.read} · {post.tags.join(" · ")}
              </p>
              <h1 className="display" style={{ margin: "14px 0 0", maxWidth: 880, fontSize: "clamp(34px, 5vw, 60px)", lineHeight: 1.08 }} dir="auto">{x.title}</h1>
              <p style={{ margin: "20px 0 0", maxWidth: 700, fontSize: 20, lineHeight: 1.55, color: "var(--text2)" }}>{x.dek}</p>
              <p style={{ margin: "18px 0 0", fontSize: 14, color: "var(--muted)" }}>Yassine Aqejjaj · {t.hero.roles.split(" · ")[0]} · {b.updated} {fmt.format(new Date(post.updated ?? post.date))}</p>
            </div>
          </header>

          <div className="wrap" style={{ paddingBlock: "48px 24px" }}>
            <div className="prose">
              {x.answer && <p className="answer" dir="auto">{x.answer}</p>}
              {x.sections.slice(0, 1).map((s) => <Section key={s.h} s={s} />)}
              <BlogDiagram kind={post.kind} d={x.diagram} label={b.diagram} />
              {x.sections.slice(1).map((s) => <Section key={s.h} s={s} />)}
              <aside className="take">
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: ".14em", color: "var(--signal)" }}>{b.take}</p>
                <p>{x.take}</p>
              </aside>
            </div>

            {x.faq && (
              <section aria-label={b.faq} className="prose" style={{ marginTop: 8 }}>
                <h2 style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>{b.faq}</h2>
                {x.faq.map((f) => (
                  <details key={f.q} className="card" style={{ borderRadius: 14, padding: "4px 20px", marginBottom: 10 }}>
                    <summary style={{ cursor: "pointer", minHeight: 48, display: "flex", alignItems: "center", fontSize: 17, fontWeight: 600, listStyle: "none" }} dir="auto">{f.q}</summary>
                    <p style={{ margin: "0 0 14px", fontSize: 16 }} dir="auto">{f.a}</p>
                  </details>
                ))}
              </section>
            )}

            <section aria-label={b.results} style={{ maxWidth: "none" }}>
              <h2 style={{ margin: "40px 0 0", fontSize: 13, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>{b.results}</h2>
              <div className="results">
                {x.results.map((r) => (
                  <div key={r.l}>
                    <p className="display" style={{ margin: 0, fontSize: 38 }} dir="ltr">{r.v}</p>
                    <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.45, color: "var(--muted)" }}>{r.l}</p>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ maxWidth: "none", marginTop: 36 }}>
              <h2 style={{ margin: 0, fontSize: 13, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>{post.repos.length ? b.code : b.case}</h2>
              <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 10 }}>
                {post.repos.map((r) => (
                  <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="pill pill-line" dir="ltr" style={{ minHeight: 46, padding: "0 18px" }}>{r.label} ↗</a>
                ))}
                {post.cases?.map((s) => {
                  const cl = c.clients.find((k) => k.slug === s);
                  return cl && <Link key={s} href={href(`/work/${s}`)} className="pill pill-accent" style={{ minHeight: 46, padding: "0 18px", color: "#05060a" }}>{b.case}: {cl.client.split(" · ")[0]}</Link>;
                })}
              </div>
            </section>

            <section style={{ maxWidth: "none", marginTop: 56, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
              <h2 style={{ margin: 0, fontSize: 13, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>{b.more}</h2>
              <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
                {others.map((o) => (
                  <Link key={o.slug} href={href(`/blog/${o.slug}`)} className="card" style={{ padding: 20, textDecoration: "none", color: "var(--text)" }}>
                    <span className="display" style={{ fontSize: 18, lineHeight: 1.25 }} dir="auto">{o[locale].title}</span>
                  </Link>
                ))}
              </div>
              <p style={{ margin: "24px 0 0", fontSize: 13, color: "var(--muted)" }}>{b.note}</p>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}
