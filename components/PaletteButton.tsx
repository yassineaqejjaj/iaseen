"use client";
import { useI18n } from "./LocaleProvider";

export default function PaletteButton() {
  const { t } = useI18n();
  return (
    <button type="button" aria-label={t.cmd.open} onClick={() => window.dispatchEvent(new Event("iaseen-palette"))} className="palette-btn"
      style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 36, padding: "0 12px", borderRadius: 999, border: "1px solid var(--line)", background: "transparent", color: "var(--text2)", cursor: "pointer", fontSize: 13 }}>
      <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
      <span className="palette-label">{t.cmd.open}</span>
      <kbd dir="ltr" style={{ fontFamily: "inherit", fontSize: 11, color: "var(--muted)", border: "1px solid var(--line)", borderRadius: 6, padding: "1px 5px" }}>⌘K</kbd>
    </button>
  );
}
