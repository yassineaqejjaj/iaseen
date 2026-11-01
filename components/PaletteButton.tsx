"use client";
import { useI18n } from "./LocaleProvider";

export default function PaletteButton({ wide = false }: { wide?: boolean }) {
  const { t } = useI18n();
  return (
    <button type="button" aria-label={t.cmd.open} title={t.cmd.open} onClick={() => window.dispatchEvent(new Event("iaseen-palette"))} className={wide ? "palette-wide" : "icon-btn palette-btn"}>
      <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
      {wide && <span style={{ flex: 1, textAlign: "start" }}>{t.cmd.open}</span>}
      <kbd dir="ltr" className={wide ? "" : "palette-kbd"} style={{ fontFamily: "inherit", fontSize: 11, color: "var(--muted)", border: "1px solid var(--line)", borderRadius: 6, padding: "1px 5px" }}>⌘K</kbd>
    </button>
  );
}
