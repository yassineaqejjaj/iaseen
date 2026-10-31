"use client";
import { useState } from "react";
import { real, type Lens } from "@/lib/content";
import ClientLogo from "./ClientLogo";
import { useI18n } from "./LocaleProvider";

export default function Journey() {
  const { t, c } = useI18n();
  const j = t.journey;
  const [lens, setLens] = useState<"all" | Lens>("all");
  const [i, setI] = useState(0);
  const roles = c.roles;
  const lensIds = ["all", "lead", "product", "tech"] as const;
  return (
    <>
      <div role="group" aria-label={j.lensAria} style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 6, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 999, width: "fit-content", marginBottom: 32 }}>
        {lensIds.map((id) => (
          <button key={id} type="button" className="togglebtn" aria-pressed={lens === id} onClick={() => setLens(id)}
            style={{ padding: "0 18px", border: "none", background: lens === id ? "var(--accent)" : "transparent", color: lens === id ? "#07101f" : "var(--text2)" }}>{j.lenses[id]}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
        <ol aria-label={j.rolesAria} style={{ listStyle: "none", margin: 0, padding: 0, flex: "1 1 340px", minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {roles.map((r, k) => (
            <li key={r.org + r.period}>
              <button type="button" aria-pressed={i === k} onClick={() => setI(k)}
                style={{ width: "100%", textAlign: "start", cursor: "pointer", display: "flex", gap: 16, alignItems: "flex-start", padding: "18px 20px", borderRadius: 16, border: `1px solid ${i === k ? "var(--accent)" : "var(--line)"}`, background: i === k ? "rgba(106,145,255,.1)" : "var(--surface)", color: "var(--text)" }}>
                <span aria-hidden style={{ marginTop: 6, width: 10, height: 10, borderRadius: "50%", flex: "none", background: i === k ? "var(--accent)" : "#c9d1e3" }} />
                <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>{r.period}</span>
                  <span style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.35 }}>{r.title}</span>
                  <span style={{ fontSize: 14, color: "var(--muted)" }}>{r.org}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div aria-live="polite" style={{ flex: "999 1 560px", minWidth: 0 }}>
          {roles.map((role, ri) => {
            const bullets = role.bullets.filter((b) => real(b.text) && (lens === "all" || b.lens === lens));
            return (
        <article key={role.org + role.period} hidden={ri !== i} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 24, padding: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--link)" }}>{role.period} · {role.org}, {role.place}</p>
            <span dir="ltr" style={{ display: "inline-flex", maxWidth: 200 }}><ClientLogo name={role.logo} scale={1} /></span>
          </div>
          <h3 className="display" style={{ margin: "10px 0 0", fontSize: 32, lineHeight: 1.15, letterSpacing: "-0.02em" }}>{role.title}</h3>
          <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.6, color: "var(--body)" }}>{role.summary}</p>
          <h4 style={{ margin: "28px 0 12px", fontSize: 13, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>{lens === "all" ? j.highlights : `${j.tag[lens]} ${j.lensSuffix}`}</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {bullets.map((b) => (
              <li key={b.text} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 16, lineHeight: 1.55, color: "var(--text2)" }}>
                <svg aria-hidden style={{ flex: "none", marginTop: 3 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#98E4E0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                <span><span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", color: "var(--muted)", marginInlineEnd: 8 }}>{j.tag[b.lens]}</span>{b.text}</span>
              </li>
            ))}
          </ul>
          {real(role.impact) && (
            <div style={{ marginTop: 28, padding: 20, borderRadius: 16, background: "var(--bg)", border: "1px solid var(--line)" }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>{j.impact}</p>
              <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: 1.55 }}>{role.impact}</p>
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
            {role.tags.filter(real).map((tag) => <span key={tag} className="chip">{tag}</span>)}
          </div>
        </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
