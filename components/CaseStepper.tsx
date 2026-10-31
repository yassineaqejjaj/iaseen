"use client";
import { useState } from "react";
import { real, type Step } from "@/lib/content";
import { useI18n } from "./LocaleProvider";

export default function CaseStepper({ steps: all }: { steps: Step[] }) {
  const { t } = useI18n();
  const steps = all.filter((x) => real(x.body) || x.points.filter(real).length > 0);
  const hidden = all.length - steps.length;
  const [i, setI] = useState(0);
  const cur = steps[i];
  const n = (k: number) => String(k + 1).padStart(2, "0");
  return (
    <div className="wrap" style={{ paddingBlock: "64px 96px", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start" }}>
      <nav aria-label={t.case.pathAria} style={{ flex: "1 1 220px", minWidth: 0 }}>
        <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>{t.case.path}</p>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
          {steps.map((s, k) => (
            <li key={s.label}>
              <button type="button" aria-pressed={i === k} onClick={() => setI(k)}
                style={{ width: "100%", minHeight: 44, display: "flex", alignItems: "center", gap: 12, padding: "0 14px", borderRadius: 12, border: "none", cursor: "pointer", textAlign: "start", fontSize: 15, fontWeight: 600, background: i === k ? "var(--accent)" : "transparent", color: i === k ? "#07101f" : "var(--text2)" }}>
                <span className="display" style={{ fontSize: 13, letterSpacing: 0, color: i === k ? "#07101f" : "var(--muted)" }}>{n(k)}</span>{s.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>
      <article aria-live="polite" style={{ flex: "999 1 640px", minWidth: 0 }}>
        <p className="display" style={{ margin: 0, fontSize: 15, letterSpacing: 0, color: "var(--link)" }} dir="ltr">{n(i)} / {n(steps.length - 1)}</p>
        <h2 className="display" style={{ margin: "8px 0 0", fontSize: 40, lineHeight: 1.1 }}>{cur.label}</h2>
        {real(cur.body) ? (
          <p style={{ margin: "20px 0 0", fontSize: 18, lineHeight: 1.7, color: "var(--text2)", whiteSpace: "pre-line" }}>{cur.body}</p>
        ) : null}
        {cur.stats && cur.stats.filter((x) => real(x.value)).length > 0 && (
          <div style={{ margin: "28px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {cur.stats.filter((x) => real(x.value)).map((x) => (
              <div key={x.label} className="glass" style={{ borderRadius: 20, padding: 24 }}>
                <p className="display" dir="ltr" style={{ margin: 0, fontSize: 40, lineHeight: 1.05, textAlign: "start", background: "linear-gradient(90deg, var(--accent), var(--signal))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{x.value}</p>
                <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.5, color: "var(--text2)" }}>{x.label}</p>
              </div>
            ))}
          </div>
        )}
        {cur.targets && (
          <section aria-label={t.case.targets} style={{ marginTop: 32, border: "1px dashed rgba(148,163,184,.4)", borderRadius: 24, padding: 24 }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: ".14em", color: "var(--signal)" }}>{t.case.targets}</p>
            <p style={{ margin: "6px 0 18px", fontSize: 14, lineHeight: 1.5, color: "var(--muted)" }}>{t.case.targetsNote}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {cur.targets.stats.map((x) => (
                <div key={x.label} className="card" style={{ borderRadius: 18, padding: 20 }}>
                  <p className="display" dir="ltr" style={{ margin: 0, fontSize: 34, lineHeight: 1.05, textAlign: "start", color: "var(--text)" }}>{x.value}</p>
                  <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.5, color: "var(--text2)" }}>{x.label}</p>
                </div>
              ))}
            </div>
            <ul style={{ margin: "16px 0 0", padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cur.targets.more.map((m) => <li key={m} className="chip">{m}</li>)}
            </ul>
          </section>
        )}
        {cur.points.filter(real).length > 0 && (
          <ul style={{ margin: "28px 0 0", padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {cur.points.filter(real).map((p) => {
              const k = p.search(/[:：]\s/);
              return (
                <li key={p} className="card" style={{ borderRadius: 16, padding: 20, fontSize: 15, lineHeight: 1.55, color: "var(--text2)" }}>
                  {k > 0 && k < 60 ? <><strong style={{ display: "block", marginBottom: 6, fontSize: 16, color: "var(--text)" }}>{p.slice(0, k)}</strong>{p.slice(k + 2)}</> : p}
                </li>
              );
            })}
          </ul>
        )}
        {hidden > 0 && i === steps.length - 1 && (
          <p style={{ margin: "28px 0 0", fontSize: 15, lineHeight: 1.6, color: "var(--muted)" }}>{t.case.onRequest}</p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
          <button type="button" className="pill pill-line" onClick={() => setI(Math.max(0, i - 1))} style={{ minHeight: 48 }}>{t.case.prev}</button>
          <button type="button" className="pill pill-accent" onClick={() => setI(Math.min(steps.length - 1, i + 1))} style={{ minHeight: 48, color: "#07101f" }}>{t.case.next}</button>
        </div>
      </article>
    </div>
  );
}
