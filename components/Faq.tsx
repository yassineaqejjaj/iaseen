import Link from "next/link";
import { getI18n, type Locale } from "@/lib/i18n";

/** Visible Q&A: answer-first text that search and AI engines can quote. Mirrors the FAQPage structured data. */
export default function Faq({ locale }: { locale: Locale }) {
  const { t, c, href } = getI18n(locale);
  return (
    <section id="faq" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="wrap sec">
        <p className="eyebrow">{t.faq.eyebrow}</p>
        <h2 className="h2" style={{ marginBottom: 32 }}>{t.faq.title}</h2>
        <div style={{ display: "grid", gap: 10, maxWidth: 860 }}>
          {c.qa.map((x) => (
            <details key={x.q} className="card" style={{ borderRadius: 16, padding: "4px 22px" }}>
              <summary style={{ cursor: "pointer", minHeight: 52, display: "flex", alignItems: "center", fontSize: 17, fontWeight: 600, listStyle: "none" }}>{x.q}</summary>
              <p style={{ margin: "0 0 12px", fontSize: 16, lineHeight: 1.7, color: "var(--text2)" }}>{x.a}</p>
              <p style={{ margin: "0 0 18px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                {x.sources.map((s) => (
                  <Link key={s.href + s.label} href={href(s.href)} className="chip" style={{ textDecoration: "none" }}>{s.label}</Link>
                ))}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
