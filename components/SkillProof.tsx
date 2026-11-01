"use client";
import { useEffect, useState } from "react";
import type { PageAct } from "@/lib/actions";
import { useI18n } from "./LocaleProvider";

export default function SkillProof() {
  const { t, c } = useI18n();
  const [s, setS] = useState("AI Agents");
  useEffect(() => {
    const on = (e: Event) => { const a = (e as CustomEvent<PageAct>).detail; if (a.k === "skill" && c.proof[a.v]) setS(a.v); };
    window.addEventListener("iaseen-act", on);
    return () => window.removeEventListener("iaseen-act", on);
  }, [c]);
  const label = (k: string) => t.expertise.skills[k] ?? k;
  return (
    <div id="skill-proof" style={{ scrollMarginTop: 96 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {c.pillars.map((p) => (
          <div key={p.skills[0]} style={{ border: "1px solid var(--line)", borderRadius: 20, padding: 26, background: "var(--surface)" }}>
            <p className="display" style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em" }}>{p.name}</p>
            <p style={{ margin: "6px 0 18px", fontSize: 14, color: "var(--muted)" }}>{p.line}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.skills.map((k) => (
                <button key={k} type="button" className="togglebtn" aria-pressed={s === k} onClick={() => setS(k)}
                  style={{ padding: "0 16px", border: `1px solid ${s === k ? "var(--accent)" : "var(--line)"}`, background: s === k ? "var(--accent)" : "transparent", color: s === k ? "#05060a" : "var(--text2)" }}>{label(k)}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div aria-live="polite">
        {Object.keys(c.proof).map((k) => (
      <div key={k} data-inactive={s !== k ? "" : undefined} style={{ marginTop: 20, borderRadius: 20, background: "linear-gradient(135deg, rgba(76,111,240,.16), rgba(123,150,255,.06))", border: "1px solid rgba(76,111,240,.3)", color: "#fff", padding: 28, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 220px", minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "#9ba3b5" }}>{t.expertise.proofFor}</p>
          <p className="display" style={{ margin: "6px 0 0", fontSize: 28, letterSpacing: 0 }}>{label(k)}</p>
        </div>
        <ul style={{ flex: "999 1 520px", minWidth: 0, listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {c.proof[k].map((x) => (
            <li key={x.label} style={{ background: "rgba(8,11,18,.6)", borderRadius: 14, padding: "14px 16px" }}>
              <span style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: ".08em", color: "#7b96ff" }}>{t.proof.kinds[x.kind] ?? x.kind}</span>
              <span style={{ display: "block", marginTop: 4, fontSize: 15, fontWeight: 500, lineHeight: 1.4 }}>{x.label}</span>
            </li>
          ))}
        </ul>
      </div>
        ))}
      </div>
    </div>
  );
}
