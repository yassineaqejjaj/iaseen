"use client";
import { useState } from "react";
import { profile } from "@/lib/content";

const mods = [
  { id: "agents", tag: "ACT", name: "Nova Agents", fn: "Agentic application orchestration: specialised agents working together inside one platform.", url: `${profile.github}/NOVA`, cta: "NOVA on GitHub" },
  { id: "context", tag: "CONTEXT", name: "Nova Context", fn: "Targeted context retrieval: the right knowledge and memory, governed, at the right time.", url: `${profile.github}/ORBIT`, cta: "Context engine on GitHub" },
  { id: "evals", tag: "EVALUATE", name: "Nova Evals · FORGE", fn: "Evaluation and regression testing: every release is benchmarked so the system keeps improving.", url: `${profile.github}/FORGE`, cta: "FORGE on GitHub" },
];

export default function NovaSystem() {
  const [s, setS] = useState("agents");
  const m = mods.find((x) => x.id === s)!;
  return (
    <article className="card" style={{ borderRadius: 28, padding: 40, display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center" }}>
      <div style={{ flex: "1 1 380px", minWidth: 0 }}>
        <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", padding: "6px 12px", borderRadius: 999, background: "var(--accent)", color: "#07101f" }}>FLAGSHIP</span>
        <h3 className="display" style={{ margin: "18px 0 0", fontSize: 44, lineHeight: 1.05 }}>NOVA Suite</h3>
        <p style={{ margin: "8px 0 0", fontSize: 18, fontWeight: 500, color: "#8fa6ff" }}>The AI Factory&apos;s agentic platform</p>
        <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.65, color: "#c3cce3" }}>Built by a 15-person cross-functional team. Used by 3,000+ people across a group of 10,000+ consultants in 25 countries.</p>
        <div aria-live="polite" className="glass" style={{ marginTop: 24, borderRadius: 18, padding: 20 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "#8fa6ff" }}>{m.tag}</p>
          <p className="display" style={{ margin: "6px 0 0", fontSize: 22, letterSpacing: 0 }}>{m.name}</p>
          <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.6, color: "#c3cce3" }}>{m.fn}</p>
          <a href={m.url} className="pill" style={{ marginTop: 14, minHeight: 44, padding: "0 18px", background: "var(--accent)", color: "#07101f", fontSize: 14 }}>{m.cta}</a>
        </div>
      </div>
      <div role="group" aria-label="NOVA Suite modules" style={{ flex: "1 1 420px", minWidth: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        {mods.map((x) => (
          <button key={x.id} type="button" aria-pressed={s === x.id} onClick={() => setS(x.id)}
            style={{ textAlign: "left", cursor: "pointer", background: "rgba(8,11,18,.6)", border: `1px solid ${s === x.id ? "var(--accent)" : "var(--line)"}`, borderRadius: 20, padding: 20, display: "flex", flexDirection: "column", gap: 8, color: "#fff", transition: "border-color .2s, transform .2s", transform: s === x.id ? "translateY(-2px)" : "none" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "#8fa6ff" }}>{x.tag}</span>
            <span className="display" style={{ fontSize: 20, letterSpacing: 0 }}>{x.name}</span>
          </button>
        ))}
        <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#9aabd6" }}>
          <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8FA6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" /></svg>
          Each evaluation feeds back into context and behaviour: a closed improvement loop.
        </div>
      </div>
    </article>
  );
}
