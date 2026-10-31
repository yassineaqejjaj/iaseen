"use client";
import { useState } from "react";
import { pillars, proof } from "@/lib/content";

export default function SkillProof() {
  const [s, setS] = useState("AI Agents");
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {pillars.map((p) => (
          <div key={p.name} style={{ border: "1px solid var(--line)", borderRadius: 20, padding: 26, background: "var(--surface)" }}>
            <p className="display" style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em" }}>{p.name}</p>
            <p style={{ margin: "6px 0 18px", fontSize: 14, color: "var(--muted)" }}>{p.line}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.skills.map((k) => (
                <button key={k} type="button" className="togglebtn" aria-pressed={s === k} onClick={() => setS(k)}
                  style={{ padding: "0 16px", border: `1px solid ${s === k ? "var(--accent)" : "var(--line)"}`, background: s === k ? "var(--accent)" : "transparent", color: s === k ? "#07101f" : "var(--text2)" }}>{k}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div aria-live="polite" style={{ marginTop: 20, borderRadius: 20, background: "linear-gradient(135deg, rgba(106,145,255,.16), rgba(152,228,224,.06))", border: "1px solid rgba(106,145,255,.3)", color: "#fff", padding: 28, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 220px", minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "#9aabd6" }}>PROOF FOR</p>
          <p className="display" style={{ margin: "6px 0 0", fontSize: 28, letterSpacing: 0 }}>{s}</p>
        </div>
        <ul style={{ flex: "999 1 520px", minWidth: 0, listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {(proof[s] ?? []).map((x) => (
            <li key={x.label} style={{ background: "rgba(8,11,18,.6)", borderRadius: 14, padding: "14px 16px" }}>
              <span style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: ".08em", color: "#8fa6ff" }}>{x.kind}</span>
              <span style={{ display: "block", marginTop: 4, fontSize: 15, fontWeight: 500, lineHeight: 1.4 }}>{x.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
