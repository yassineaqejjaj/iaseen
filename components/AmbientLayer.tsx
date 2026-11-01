"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ask } from "@/lib/ask";
import { SECTION_QA } from "@/lib/ambient";
import { useI18n } from "./LocaleProvider";

/**
 * The AI as an ambient layer rather than a chat window:
 *  - a thin line that comments on the section in view (facts taken from the validated content) with two follow-ups;
 *  - a "ask about this" button that appears next to any text you select.
 * No input field, no avatar, nothing parked in a corner.
 */
export default function AmbientLayer() {
  const { t, c, locale } = useI18n();
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [sel, setSel] = useState<{ x: number; y: number; q: string } | null>(null);

  useEffect(() => {
    const ids = ["top", "numbers", ...Object.keys(SECTION_QA)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) { setActive(e.target.id); setOpen(null); } }, { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onSel = () => {
      const s = document.getSelection();
      const text = s?.toString().trim() ?? "";
      if (!s || s.isCollapsed || s.rangeCount === 0 || text.length < 8 || text.length > 240) return setSel(null);
      const range = s.getRangeAt(0);
      const n = range.commonAncestorContainer;
      const el = (n.nodeType === 1 ? n : n.parentElement) as HTMLElement | null;
      if (!el?.closest("main") || el.closest("input,textarea,[role=dialog],.ambient,.ask-pop")) return setSel(null);
      const r = range.getBoundingClientRect();
      setSel({ x: r.left + r.width / 2, y: r.top, q: text });
    };
    document.addEventListener("selectionchange", onSel);
    return () => document.removeEventListener("selectionchange", onSel);
  }, []);

  const line = active ? t.ambient.lines[active] : undefined;
  const qs = active ? SECTION_QA[active] ?? [] : [];
  const a = open === null ? null : ask(c.qa[open].q, locale);

  return (
    <>
      {line && (
        <div className="ambient glass fx" role="region" aria-label={t.ambient.aria}>
          {a && (
            <div aria-live="polite" style={{ padding: "4px 4px 12px", borderBottom: "1px solid var(--line)", marginBottom: 10 }}>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "var(--text2)", whiteSpace: "pre-line" }}>{a.a}</p>
              <p style={{ margin: "10px 0 0", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", color: "var(--muted)" }}>{t.ambient.sources}</span>
                {a.sources.map((s) => <Link key={s.href + s.label} href={s.href} className="chip" style={{ textDecoration: "none" }}>{s.label}</Link>)}
              </p>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span className="amb-dot" aria-hidden />
            <p key={active} className="amb-line" style={{ margin: 0, flex: "1 1 260px", fontSize: 14, lineHeight: 1.5, color: "var(--text)" }}><strong style={{ color: "var(--signal)", marginInlineEnd: 8, fontSize: 11, letterSpacing: ".12em" }}>{t.ambient.label}</strong>{line}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {qs.map((i) => (
                <button key={i} type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}
                  style={{ minHeight: 32, maxWidth: 260, padding: "4px 12px", borderRadius: 999, cursor: "pointer", fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", border: `1px solid ${open === i ? "var(--accent)" : "var(--line)"}`, background: open === i ? "rgba(106,145,255,.2)" : "transparent", color: "var(--text2)" }}>{c.qa[i].q}</button>
              ))}
            </div>
          </div>
        </div>
      )}
      {sel && (
        <button type="button" className="ask-pop" onMouseDown={(e) => e.preventDefault()}
          onClick={() => { window.dispatchEvent(new CustomEvent("iaseen-palette", { detail: { q: sel.q } })); document.getSelection()?.removeAllRanges(); setSel(null); }}
          style={{ position: "fixed", zIndex: 60, left: Math.min(Math.max(sel.x, 90), innerWidth - 90), top: Math.max(sel.y - 46, 70), transform: "translateX(-50%)" }}>✦ {t.ambient.ask}</button>
      )}
    </>
  );
}
