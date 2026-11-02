import Link from "next/link";
import { KpiRow } from "@/components/Kpi";
import ClientLogo from "@/components/ClientLogo";
import { getI18n, type Locale } from "@/lib/i18n";
import { real } from "@/lib/content";

const Arrow = ({ s = 18 }: { s?: number }) => (
  <svg className="flip" aria-hidden width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/** One mission card, shared by the home page and /work. */
export default function ClientCard({ cl, locale }: { cl: ReturnType<typeof getI18n>["c"]["clients"][number]; locale: Locale }) {
  const { t, href } = getI18n(locale);
  return (
              <article key={cl.slug} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 168, background: "linear-gradient(135deg, #0b0e17, #11141f)", position: "relative", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".14em", color: "var(--muted)" }}>{cl.sector}</span>
                  <span dir="ltr"><ClientLogo name={cl.logo} scale={1.5} /></span>
                  <span aria-hidden style={{ position: "absolute", insetInlineEnd: 24, top: 24, width: 56, height: 56, borderRadius: 16, border: "1px solid var(--line)" }} />
                  <span aria-hidden style={{ position: "absolute", insetInlineEnd: 44, top: 44, width: 56, height: 56, borderRadius: 16, border: "1px solid var(--accent)" }} />
                </div>
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, lineHeight: 1.3 }}>{cl.client} | {cl.title}</h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--muted)" }}>{cl.summary}</p>
                  {real(cl.impact) && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}><strong>{t.work.impact}</strong> {cl.impact}</p>}
                  <KpiRow id={cl.slug} />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto", paddingTop: 6 }}>
                    {cl.tags.map((tag) => <span key={tag} style={{ fontSize: 12, fontWeight: 500, padding: "5px 10px", borderRadius: 999, background: "rgba(255,255,255,.06)", color: "var(--text2)" }}>{tag}</span>)}
                  </div>
                  <Link href={href(`/work/${cl.slug}`)} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>{t.work.read} <Arrow s={16} /></Link>
                </div>
              </article>
  );
}
