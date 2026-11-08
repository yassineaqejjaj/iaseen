import { KpiRow } from "./Kpi";
import { real } from "@/lib/content";
import { getI18n, type Locale } from "@/lib/i18n";
import { FEATURED_PRODUCTS } from "@/lib/featured-products";

/** Selected products shared by the homepage and the AI Lab. */
export function FeaturedProducts({ locale }: { locale: Locale }) {
  const { t, c } = getI18n(locale);
  const list = FEATURED_PRODUCTS.map((spec) => ({ ...spec, product: c.products.find((p) => p.name === spec.name)! }));
  return (
    <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 20 }}>
      {list.map(({ id, image, product: p }) => (
        <article id={id} key={p.name} className="card" style={{ scrollMarginTop: 110, padding: 32, borderRadius: 28, display: "flex", flexDirection: "column", gap: 14 }}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" style={{ display: "block", margin: "-8px -8px 4px", borderRadius: 18, overflow: "hidden", background: "#05060a", border: "1px solid var(--line, rgba(255,255,255,.1))" }}>
              <img src={image} alt="" width={1600} height={1000} loading="lazy" decoding="async" style={{ display: "block", width: "100%", aspectRatio: "16 / 10", objectFit: p.name === "ARIS" ? "contain" : "cover", objectPosition: "center" }} />
            </a>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "var(--signal)" }}>{t.lab.featuredCat[p.category] ?? p.category}</span>
            {real(p.status) && <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,.07)", color: "var(--text2)" }}>{p.status}</span>}
          </div>
          <h3 className="display" style={{ margin: 0, fontSize: 32, lineHeight: 1.1 }} dir="ltr">{p.name}</h3>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "var(--text2)", flex: 1 }}>{p.desc}</p>
          <KpiRow id={p.name} />
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="pill pill-accent" style={{ alignSelf: "flex-start", color: "#05060a" }}>
            {p.cta === "Live" ? t.lab.live : t.lab.visit}
          </a>
        </article>
      ))}
    </div>
  );
}
