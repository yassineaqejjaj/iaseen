import { real } from "@/lib/content";
import { getI18n, type Locale } from "@/lib/i18n";

const FEATURED = ["M3aya Santé", "TRAIL Academy"];

/** Second tier of the AI Lab: two large cards under the NOVA Suite flagship. */
export function FeaturedProducts({ locale }: { locale: Locale }) {
  const { t, c } = getI18n(locale);
  const list = FEATURED.map((n) => c.products.find((p) => p.name === n)!);
  return (
    <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
      {list.map((p) => (
        <article key={p.name} className="card" style={{ padding: 32, borderRadius: 28, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "var(--signal)" }}>{t.lab.featuredCat[p.category] ?? p.category}</span>
            {real(p.status) && <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,.07)", color: "var(--text2)" }}>{p.status}</span>}
          </div>
          <h3 className="display" style={{ margin: 0, fontSize: 32, lineHeight: 1.1 }} dir="ltr">{p.name}</h3>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "var(--text2)", flex: 1 }}>{p.desc}</p>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="pill pill-accent" style={{ alignSelf: "flex-start", color: "#07101f" }}>
            {p.cta === "Live" ? t.lab.live : t.lab.visit}
          </a>
        </article>
      ))}
    </div>
  );
}
