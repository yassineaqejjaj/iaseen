"use client";
import { useState } from "react";
import { useI18n } from "./LocaleProvider";

export default function PathLayout({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const [p, setP] = useState("recruiter");
  const paths = [
    { id: "recruiter", label: t.path.recruiter, hint: t.path.hintRecruiter },
    { id: "client", label: t.path.client, hint: t.path.hintClient },
    { id: "builder", label: t.path.builder, hint: t.path.hintBuilder },
  ];
  return (
    <main className="paths" data-path={p}>
      <div id="path-bar" className="glass" style={{ borderRadius: 0, borderInline: "none", borderTop: "none" }}>
        <div className="wrap" style={{ paddingBlock: 10, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 16px" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "var(--muted)" }}>{t.path.label}</span>
          <div role="group" aria-label={t.path.aria} style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {paths.map((x) => (
              <button key={x.id} type="button" className="togglebtn" aria-pressed={p === x.id} onClick={() => setP(x.id)} title={x.hint}
                style={{ padding: "0 16px", border: `1px solid ${p === x.id ? "var(--accent)" : "var(--line)"}`, background: p === x.id ? "var(--accent)" : "transparent", color: p === x.id ? "#07101f" : "var(--text2)" }}>{x.label}</button>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>{paths.find((x) => x.id === p)?.hint}</span>
        </div>
      </div>
      {children}
    </main>
  );
}
