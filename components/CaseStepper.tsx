"use client";
import { useState } from "react";
import { real, type Step } from "@/lib/content";

export default function CaseStepper({ steps }: { steps: Step[] }) {
  const [i, setI] = useState(0);
  const cur = steps[i];
  const n = (k: number) => String(k + 1).padStart(2, "0");
  return (
    <div className="wrap" style={{ paddingBlock: "64px 96px", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
      <nav aria-label="Case study steps" style={{ flex: "1 1 220px", minWidth: 0 }}>
        <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>THE PATH</p>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
          {steps.map((s, k) => (
            <li key={s.label}>
              <button type="button" aria-pressed={i === k} onClick={() => setI(k)}
                style={{ width: "100%", minHeight: 44, display: "flex", alignItems: "center", gap: 12, padding: "0 14px", borderRadius: 12, border: "none", cursor: "pointer", textAlign: "left", fontSize: 15, fontWeight: 600, background: i === k ? "var(--midnight)" : "transparent", color: i === k ? "#fff" : "var(--slate)" }}>
                <span className="display" style={{ fontSize: 13, letterSpacing: 0, color: i === k ? "#8fa6ff" : "var(--muted)" }}>{n(k)}</span>{s.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <article aria-live="polite" style={{ flex: "999 1 640px", minWidth: 0 }}>
        <p className="display" style={{ margin: 0, fontSize: 15, letterSpacing: 0, color: "var(--link)" }}>{n(i)} / {n(steps.length - 1)}</p>
        <h2 className="display" style={{ margin: "8px 0 0", fontSize: 40, lineHeight: 1.1 }}>{cur.label}</h2>
        {real(cur.body) ? (
          <p style={{ margin: "20px 0 0", fontSize: 18, lineHeight: 1.7, color: "var(--slate)" }}>{cur.body}</p>
        ) : (
          <p style={{ margin: "20px 0 0", fontSize: 17, lineHeight: 1.7, color: "var(--muted)", fontStyle: "italic" }}>Quantified, client-approved details are shared on request.</p>
        )}
        {cur.points.filter(real).length > 0 && (
          <ul style={{ margin: "28px 0 0", padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {cur.points.filter(real).map((p) => <li key={p} style={{ background: "var(--cloud)", border: "1px solid var(--line)", borderRadius: 16, padding: 18, fontSize: 15, lineHeight: 1.55, color: "var(--slate)" }}>{p}</li>)}
          </ul>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
          <button type="button" className="pill pill-line" onClick={() => setI(Math.max(0, i - 1))} style={{ minHeight: 48 }}>Previous</button>
          <button type="button" className="pill pill-accent" onClick={() => setI(Math.min(steps.length - 1, i + 1))} style={{ minHeight: 48 }}>Next step</button>
        </div>
      </article>
    </div>
  );
}
