import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { latestPosts } from "@/lib/blog";
import { getI18n, type Locale } from "@/lib/i18n";

/** A real cover image dropped in public/books/<ASIN>.jpg (or .webp / .png) replaces the generated cover. */
const coverFile = (url: string) => {
  const asin = url.split("/dp/")[1]?.split(/[/?]/)[0];
  if (!asin) return null;
  for (const ext of ["webp", "jpg", "png"]) if (existsSync(path.join(process.cwd(), "public", "books", `${asin}.${ext}`))) return `/books/${asin}.${ext}`;
  return null;
};

const PlayIcon = () => (<svg aria-hidden width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M10 8.5l5 3.5-5 3.5z" /></svg>);
const DocIcon = () => (<svg aria-hidden width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></svg>);

/** Everything published, grouped into labelled sections with a jump bar: white papers, blog, books, talks, press, teaching. Used by /insights. */
export default function InsightsFull({ locale }: { locale: Locale }) {
  const { t, c, href } = getI18n(locale);
  const secs = [["wp", t.insights.wpLabel], ["blog", t.blog.latest], ["books", t.insights.books], ["stage", t.insights.onStage], ["print", t.insights.inPrint], ["teaching", t.insights.teaching]] as const;
  const head = (id: string, label: string, count?: number, link?: { to: string; text: string }) => (
    <div className="ins-head">
      <h2 id={id} className="ins-h">{label}{count != null && <span className="ins-count">{count}</span>}</h2>
      {link && <Link href={href(link.to)} className="ins-more">{link.text} {t.arrow}</Link>}
    </div>
  );
  const media = (v: { url: string; kind: string; title: string; source: string }, icon: React.ReactNode) => (
    <a key={v.url} href={v.url} target="_blank" rel="noopener noreferrer" className="card ins-media">
      <span className="ins-thumb">{icon}</span>
      <span className="ins-media-body">
        <span className="ins-kind">{t.insights.kind[v.kind] ?? v.kind}</span>
        <span dir="auto" className="ins-title">{v.title}</span>
        <span className="ins-src">{v.source}</span>
      </span>
    </a>
  );
  return (
    <>
      <nav className="ins-jump" aria-label="Sections">
        {secs.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section className="ins-sec" aria-labelledby="wp">
        {head("wp", t.insights.wpLabel)}
        <div className="ins-grid ins-grid-2">
          {[
            { slug: "agentic-transformation", cover: "/whitepapers/agentic-transformation-cover.webp", d: t.wp2 },
            { slug: "ai-factory-guide", cover: "/whitepapers/ai-factory-cover.webp", d: t.wp },
          ].map((w) => (
            <Link key={w.slug} href={href(`/resources/${w.slug}`)} className="card ins-wp">
              <span className="ins-wp-cover" style={{ background: `#05060a url(${w.cover}) center / cover` }} aria-hidden />
              <span style={{ minWidth: 0 }}>
                <span className="ins-kind" style={{ fontFamily: "var(--font-mono)", letterSpacing: ".2em" }}>{w.d.teaser}</span>
                <span className="display ins-wp-title">{w.d.title}</span>
                <span className="ins-src" style={{ display: "block", marginTop: 8, color: "var(--text2)" }}>{w.d.teaserText}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="ins-sec" aria-labelledby="blog">
        {head("blog", t.blog.latest, undefined, { to: "/blog", text: t.blog.all })}
        <div className="ins-grid ins-grid-3">
          {latestPosts(12).map((p) => (
            <Link key={p.slug} href={href(`/blog/${p.slug}`)} className="card ins-post">
              <span className="ins-kind">{p.tags[0].toUpperCase()} · {p.minutes} {t.blog.read}</span>
              <span className="display ins-post-title" dir="auto">{p[locale].title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="ins-sec" aria-labelledby="books">
        {head("books", t.insights.books, c.books.length)}
        <div className="ins-grid ins-grid-4">
          {c.books.map((b) => (
            <a key={b.url} href={b.url} target="_blank" rel="noopener noreferrer" className="card ins-book">
              {(() => {
                const img = coverFile(b.url);
                return img
                  ? <img src={img} alt={b.title} width={400} height={600} loading="lazy" decoding="async" className="ins-book-img" />
                  : (
                    <span className="ins-book-cover" style={{ background: b.cover }}>
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", color: b.coverSub }}>{t.insights.author}</span>
                      <span className="display" style={{ fontSize: 24, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }} dir="ltr">{b.short}</span>
                    </span>
                  );
              })()}
              <span className="ins-book-body">
                <span dir="ltr" className="ins-title" style={{ fontSize: 15 }}>{b.title}</span>
                <span className="ins-src">{b.theme}</span>
                <span style={{ marginTop: "auto", paddingTop: 6, fontSize: 14, fontWeight: 600, color: "var(--link)" }}>{t.insights.onAmazon} {t.arrow}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="ins-sec" aria-labelledby="stage">
        {head("stage", t.insights.onStage, undefined, { to: "/speaking", text: t.speaking.all })}
        <div className="ins-photos">
          {t.speaking.items.map((it) => (
            <Link key={it.img} href={href("/speaking")} className="ins-photo">
              <img src={it.img} alt={it.alt} width={600} height={400} loading="lazy" decoding="async" />
              <span className="ins-photo-cap"><strong>{it.event}</strong><span>{it.date} · {it.place}</span></span>
            </Link>
          ))}
        </div>
        <div className="ins-grid ins-grid-2" style={{ marginTop: 16 }}>{c.stage.map((v) => media(v, <PlayIcon />))}</div>
      </section>

      <section className="ins-sec" aria-labelledby="print">
        {head("print", t.insights.inPrint)}
        <div className="ins-grid ins-grid-2">{c.articles.map((v) => media(v, <DocIcon />))}</div>
      </section>

      <section className="ins-sec" aria-labelledby="teaching">
        {head("teaching", t.insights.teaching)}
        <div className="card ins-teach">
          <div className="ins-teach-n">
            <span className="display" dir="ltr">1,500+</span>
            <span>{t.insights.trainedLine}</span>
          </div>
          <p><strong>TRAIL Academy</strong> — {t.insights.trailText}</p>
          <a href="https://trailacademy.fr" target="_blank" rel="noopener noreferrer" className="pill pill-line">{t.insights.trailCta} {t.arrow}</a>
        </div>
      </section>
    </>
  );
}
