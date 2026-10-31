"use client";
import { useState } from "react";
import { products, FILTERS, real } from "@/lib/content";

export default function LabGrid() {
  const [f, setF] = useState("All");
  const list = products.filter((p) => f === "All" || p.category === f);
  return (
    <>
      <div role="group" aria-label="Filter products" style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "40px 0 20px" }}>
        {FILTERS.map((x) => (
          <button key={x.id} type="button" className="togglebtn" aria-pressed={f === x.id} onClick={() => setF(x.id)}
            style={{ padding: "0 18px", border: `1px solid ${f === x.id ? "#fff" : "#2e3b5a"}`, background: f === x.id ? "#fff" : "transparent", color: f === x.id ? "var(--midnight)" : "#e3e8f5" }}>{x.label}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {list.map((p) => (
          <article key={p.name} style={{ background: "#121a2e", border: "1px solid #243150", borderRadius: 20, padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", color: "#9aabd6" }}>{p.category}</span>
              {real(p.status) && <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999, background: "#1f2b48", color: "#c3cce3" }}>{p.status}</span>}
            </div>
            <h3 className="display" style={{ margin: 0, fontSize: 22, letterSpacing: "-0.01em" }}>{p.name}</h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#c3cce3", flex: 1 }}>{p.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, paddingTop: 12, borderTop: "1px solid #243150" }}>
              <span style={{ fontSize: 13, color: "#9aabd6" }}>{real(p.stack) ? p.stack : ""}</span>
              <a href={p.url} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, gap: 6, color: "#8fa6ff", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
                {p.cta}
                <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
