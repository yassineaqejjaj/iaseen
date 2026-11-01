"use client";
import { useState } from "react";
import { useI18n } from "./LocaleProvider";

const SHOTS = ["nova-today", "nova-architecture", "nova-skills", "nova-engineering", "nova-routines", "nova-voice"];

/** Real screens of NOVA from its public repository (docs/screenshots). Client names in the "Today" screen are masked. */
export default function NovaGallery() {
  const { t } = useI18n();
  const g = t.gallery;
  const [i, setI] = useState(0);
  return (
    <div style={{ marginTop: 20 }} className="card">
      <div style={{ padding: "28px 32px 0", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <h3 className="display" style={{ margin: 0, fontSize: 28 }}>{g.title}</h3>
        <p style={{ margin: 0, fontSize: 13, color: "#9ba3b5" }}>{g.note}</p>
      </div>
      <div role="group" aria-label={g.title} style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "18px 32px 0" }}>
        {g.items.map((label, k) => (
          <button key={SHOTS[k]} type="button" className="togglebtn" aria-pressed={i === k} onClick={() => setI(k)}
            style={{ padding: "0 16px", border: `1px solid ${i === k ? "var(--accent)" : "var(--line)"}`, background: i === k ? "var(--accent)" : "transparent", color: i === k ? "#05060a" : "var(--text2)" }}>{label}</button>
        ))}
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#f7f5f4" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/products/${SHOTS[i]}.webp`} alt={`NOVA: ${g.items[i]}`} width={1700} height={i === 1 || i === 2 ? 850 : 1067} loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "auto" }} />
        </div>
      </div>
    </div>
  );
}
