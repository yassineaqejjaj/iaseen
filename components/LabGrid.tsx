"use client";
import { useEffect, useState } from "react";
import type { PageAct } from "@/lib/actions";
import { real } from "@/lib/content";
import { useI18n } from "./LocaleProvider";

const SHOWN_ABOVE = ["NOVA Suite", "Nova Context", "Nova Evals · FORGE", "M3aya Santé", "TRAIL Academy"];

export default function LabGrid() {
  const { t, c } = useI18n();
  const [f, setF] = useState("All");
  useEffect(() => {
    const on = (e: Event) => { const a = (e as CustomEvent<PageAct>).detail; if (a.k === "filter") setF(a.v); };
    window.addEventListener("iaseen-act", on);
    return () => window.removeEventListener("iaseen-act", on);
  }, []);
  const rest = c.products.filter((p) => !SHOWN_ABOVE.includes(p.name));
  const list = rest.filter((p) => f === "All" || p.category === f);
  const ids = ["All", ...["AGENTIC", "HEALTH", "EDUCATION", "SPORT"].filter((id) => rest.some((p) => p.category === id))];
  return (
    <>
      <div id="lab-grid" style={{ marginTop: 48, scrollMarginTop: 96 }}>
      <div role="group" aria-label={t.lab.filtersAria} style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "0 0 20px" }}>
        {ids.map((id) => (
          <button key={id} type="button" className="togglebtn" aria-pressed={f === id} onClick={() => setF(id)}
            style={{ padding: "0 18px", border: `1px solid ${f === id ? "var(--accent)" : "var(--line)"}`, background: f === id ? "var(--accent)" : "transparent", color: f === id ? "#07101f" : "var(--text2)" }}>{t.lab.filters[id]}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {list.map((p) => (
          <article key={p.name} className="card" style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", color: "#9aabd6" }}>{t.lab.cat[p.category] ?? p.category}</span>
              {real(p.status) && <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999, background: "#1f2b48", color: "#c3cce3" }}>{p.status}</span>}
            </div>
            <h3 className="display" style={{ margin: 0, fontSize: 22, letterSpacing: "-0.01em" }} dir="ltr">{p.name}</h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#c3cce3", flex: 1 }}>{p.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
              <span style={{ fontSize: 13, color: "#9aabd6" }}>{real(p.stack) ? p.stack : ""}</span>
              <a href={p.url} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, gap: 6, color: "var(--signal)", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
                {t.lab.cta[p.cta] ?? p.cta}
                <svg className="flip" aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
              </a>
            </div>
          </article>
        ))}
      </div>
      </div>
    </>
  );
}
