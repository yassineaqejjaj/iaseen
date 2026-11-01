"use client";
import { useEffect, useState } from "react";
import { getMode, setMode, type Mode } from "@/lib/mode";
import { useI18n } from "./LocaleProvider";

/** Experience / Executive. `compact` is a single icon button for the top bar; the default is the labelled two-way switch. */
export default function ModeToggle({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const [mode, set] = useState<Mode>("experience");
  useEffect(() => {
    const sync = () => set(getMode());
    sync();
    window.addEventListener("iaseen-mode", sync);
    return () => window.removeEventListener("iaseen-mode", sync);
  }, []);

  if (compact)
    return (
      <button type="button" className="icon-btn" aria-pressed={mode === "executive"} title={`${t.mode.executive}: ${t.mode.hint}`} aria-label={`${t.mode.executive}. ${t.mode.hint}`}
        onClick={() => setMode(mode === "executive" ? "experience" : "executive")}
        style={mode === "executive" ? { background: "var(--accent)", color: "#05060a", borderColor: "var(--accent)" } : undefined}>
        <svg aria-hidden width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></svg>
      </button>
    );

  const opts: [Mode, string][] = [["experience", t.mode.experience], ["executive", t.mode.executive]];
  return (
    <div role="group" aria-label={t.mode.aria} title={t.mode.hint} style={{ display: "inline-flex", gap: 2, padding: 3, borderRadius: 999, border: "1px solid var(--line)" }}>
      {opts.map(([m, label]) => (
        <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}
          style={{ minHeight: 40, padding: "0 16px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, background: mode === m ? "var(--accent)" : "transparent", color: mode === m ? "#05060a" : "var(--text2)" }}>{label}</button>
      ))}
    </div>
  );
}
