import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { posts } from "@/lib/blog";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";
import { blogGraph, ld } from "@/lib/schema";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const b = getI18n(locale).t.blog;
  const p = (l: string) => (l === "en" ? "/blog" : `/${l}/blog`);
  return {
    title: b.metaTitle, description: b.metaDescription,
    openGraph: { title: b.metaTitle, description: b.metaDescription, type: "website" as const, locale, images: [{ url: `${locale === "en" ? "" : `/${locale}`}/opengraph-image`, width: 1200, height: 630, alt: "Yassine Aqejjaj" }] },
    alternates: { canonical: p(locale), languages: { en: p("en"), fr: p("fr"), ar: p("ar") } },
  };
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const { t, href } = getI18n(locale);
  const b = t.blog;
  const fmt = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(blogGraph(locale)) }} />
      <Header locale={locale} />
      <main>
        <section style={{ background: "radial-gradient(800px 400px at 80% 0%, rgba(76,111,240,.14), transparent 60%), var(--bg)", color: "#fff", borderBottom: "1px solid var(--line)" }}>
          <div className="wrap" style={{ paddingBlock: "56px 72px" }}>
            <p className="eyebrow">{b.eyebrow}</p>
            <h1 className="display" style={{ margin: 0, maxWidth: 820, fontSize: "clamp(38px, 5.4vw, 68px)", lineHeight: 1.05 }}>{b.title}</h1>
            <p style={{ margin: "20px 0 0", maxWidth: 640, fontSize: 19, lineHeight: 1.6, color: "var(--text2)" }}>{b.lead}</p>
          </div>
        </section>
        <section>
          <div className="wrap sec" style={{ display: "grid", gap: 16 }}>
            {posts.map((p) => (
              <Link key={p.slug} href={href(`/blog/${p.slug}`)} className="card" style={{ padding: 28, textDecoration: "none", color: "var(--text)", display: "grid", gap: 10 }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "var(--signal)" }}>
                  {fmt.format(new Date(p.date))} · {p.minutes} {b.read} · {p.tags.join(" · ")}
                </p>
                <h2 className="display" style={{ margin: 0, fontSize: 28, lineHeight: 1.15 }} dir="auto">{p[locale].title}</h2>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--text2)", maxWidth: 760 }}>{p[locale].dek}</p>
              </Link>
            ))}
            <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--muted)" }}>{b.note}</p>
          </div>
        </section>
      </main>
    </>
  );
}
