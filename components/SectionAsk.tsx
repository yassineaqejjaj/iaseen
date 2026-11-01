"use client";
import { useState } from "react";
import Link from "next/link";
import { ask } from "@/lib/ask";
import { useI18n } from "./LocaleProvider";

/** Follow-up questions placed right under a section title; the grounded answer opens in place, no chat window. */
export default function SectionAsk({ q }: { q: number[] }) {
  const { t, c, locale } = useI18n();
  const [open, setOpen] = useState<number | null>(null);
  const a = open === null ? null : ask(c.qa[open].q, locale);
  return (
    <div className="fx" style={{ margin: "-20px 0 36px" }}>
      <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: "var(--signal)" }}>✦ {t.ambient.sectionAsk}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {q.map((i) => (
          <button key={i} type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}
            style={{ minHeight: 40, padding: "6px 14px", borderRadius: 999, cursor: "pointer", fontSize: 13, fontWeight: 500, textAlign: "start", border: `1px solid ${open === i ? "var(--accent)" : "var(--line)"}`, background: open === i ? "rgba(76,111,240,.16)" : "transparent", color: "var(--text2)" }}>
            {c.qa[i].q}
          </button>
        ))}
      </div>
      {a && (
        <div aria-live="polite" className="card" style={{ marginTop: 12, padding: "16px 18px", borderRadius: 16, maxWidth: 820 }}>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--text2)", whiteSpace: "pre-line" }}>{a.a}</p>
          <p style={{ margin: "12px 0 0", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", color: "var(--muted)" }}>{t.ambient.sources}</span>
            {a.sources.map((s) => <Link key={s.href + s.label} href={s.href} className="chip" style={{ textDecoration: "none" }}>{s.label}</Link>)}
          </p>
        </div>
      )}
    </div>
  );
}
