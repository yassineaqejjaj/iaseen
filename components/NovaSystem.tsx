"use client";
import { useState } from "react";
import Link from "next/link";
import { profile } from "@/lib/content";
import { useI18n } from "./LocaleProvider";

const urls = [`${profile.github}/NOVA`, `${profile.github}/ORBIT`, `${profile.github}/FORGE`];

export default function NovaSystem() {
  const { t, href } = useI18n();
  const n = t.lab.nova;
  const [s, setS] = useState(0);
  const m = n.modules[s];
  return (
    <article className="card" style={{ borderRadius: 28, padding: 40, display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center" }}>
      <div style={{ flex: "1 1 380px", minWidth: 0 }}>
        <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", padding: "6px 12px", borderRadius: 999, background: "var(--accent)", color: "#07101f" }}>{t.lab.flagship}</span>
        <h3 className="display" style={{ margin: "18px 0 0", fontSize: 44, lineHeight: 1.05 }} dir="ltr">NOVA Suite</h3>
        <p style={{ margin: "8px 0 0", fontSize: 18, fontWeight: 500, color: "#8fa6ff" }}>{n.subtitle}</p>
        <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.65, color: "#c3cce3" }}>{n.desc}</p>
        <Link href={href("/nova")} className="pill pill-accent" style={{ marginTop: 22, minHeight: 48, padding: "0 22px", color: "#07101f" }}>{t.novaPage.open} {t.arrow}</Link>
        <div aria-live="polite" className="glass" style={{ marginTop: 24, borderRadius: 18, padding: 20 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "#8fa6ff" }}>{m.tag}</p>
          <p className="display" style={{ margin: "6px 0 0", fontSize: 22, letterSpacing: 0 }} dir="ltr">{m.name}</p>
          <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.6, color: "#c3cce3" }}>{m.fn}</p>
          <a href={urls[s]} className="pill" style={{ marginTop: 14, minHeight: 44, padding: "0 18px", background: "var(--accent)", color: "#07101f", fontSize: 14 }}>{m.cta}</a>
        </div>
      </div>
      <div role="group" aria-label={n.modulesAria} style={{ flex: "1 1 420px", minWidth: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        {n.modules.map((x, i) => (
          <button key={x.name} type="button" aria-pressed={s === i} onClick={() => setS(i)}
            style={{ textAlign: "start", cursor: "pointer", background: "rgba(8,11,18,.6)", border: `1px solid ${s === i ? "var(--accent)" : "var(--line)"}`, borderRadius: 20, padding: 20, display: "flex", flexDirection: "column", gap: 8, color: "#fff", transition: "border-color .2s, transform .2s", transform: s === i ? "translateY(-2px)" : "none" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "#8fa6ff" }}>{x.tag}</span>
            <span className="display" style={{ fontSize: 20, letterSpacing: 0 }} dir="ltr">{x.name}</span>
          </button>
        ))}
        <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#9aabd6" }}>
          <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8FA6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" /></svg>
          {n.loop}
        </div>
      </div>
    </article>
  );
}
