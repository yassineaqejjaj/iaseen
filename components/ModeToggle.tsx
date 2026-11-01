"use client";
import { useEffect, useState } from "react";
import { getMode, setMode, type Mode } from "@/lib/mode";
import { useI18n } from "./LocaleProvider";

export default function ModeToggle() {
  const { t } = useI18n();
  const [mode, set] = useState<Mode>("experience");
  useEffect(() => {
    const sync = () => set(getMode());
    sync();
    window.addEventListener("iaseen-mode", sync);
    return () => window.removeEventListener("iaseen-mode", sync);
  }, []);
  const opts: [Mode, string][] = [["experience", t.mode.experience], ["executive", t.mode.executive]];
  return (
    <div role="group" aria-label={t.mode.aria} title={t.mode.hint} className="mode-toggle" style={{ display: "inline-flex", gap: 2, padding: 3, borderRadius: 999, border: "1px solid var(--line)" }}>
      {opts.map(([m, label]) => (
        <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}
          style={{ minHeight: 32, padding: "0 12px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: mode === m ? "var(--accent)" : "transparent", color: mode === m ? "#07101f" : "var(--text2)" }}>{label}</button>
      ))}
    </div>
  );
}
