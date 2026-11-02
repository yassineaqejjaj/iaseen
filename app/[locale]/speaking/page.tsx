import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";
import { speakingGraph } from "@/lib/schema";
import { ld } from "@/lib/schema";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const x = getI18n(locale).t.speaking;
  const p = (l: string) => (l === "en" ? "/speaking" : `/${l}/speaking`);
  return {
    title: x.metaTitle, description: x.metaDescription,
    alternates: { canonical: p(locale), languages: { en: p("en"), fr: p("fr"), ar: p("ar") } },
    openGraph: { title: x.metaTitle, description: x.metaDescription, images: [{ url: x.items[0].img, width: 1536, height: 1024, alt: x.items[0].alt }] },
  };
}

export default async function Speaking({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const x = getI18n(locale).t.speaking;
  return (
    <>
      <Header locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(speakingGraph(locale)) }} />
      <main>
        <div className="wrap" style={{ paddingBlock: "56px 96px" }}>
          <p className="eyebrow">{x.eyebrow}</p>
          <h1 className="display" style={{ margin: "8px 0 12px", fontSize: "clamp(34px, 5vw, 56px)" }}>{x.title}</h1>
          <p className="lead" style={{ maxWidth: 680 }}>{x.lead}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 24, marginTop: 36 }}>
            {x.items.map((it, i) => (
              <figure key={it.img} className="card" style={{ margin: 0, padding: 0, overflow: "hidden", borderRadius: 24 }}>
                <img src={it.img} alt={it.alt} width={it.img.includes("meetup") ? 595 : i === 0 ? 1536 : 1152} height={it.img.includes("meetup") ? 335 : i === 0 ? 1024 : 1536} loading={i === 0 ? "eager" : "lazy"} decoding="async" style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: it.img.includes("meetup") ? "contain" : "cover", background: "#111", objectPosition: i === 0 ? "center" : "50% 62%" }} />
                <figcaption style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", color: "var(--signal)" }}>{it.tag.toUpperCase()}</span>
                  <h2 className="display" style={{ margin: 0, fontSize: 26 }} dir="auto">{it.event}</h2>
                  <span style={{ fontSize: 14, color: "var(--muted)" }}>{it.date} · {it.place}</span>
                  <p dir="auto" style={{ margin: "6px 0 0", lineHeight: 1.6 }}>{it.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
