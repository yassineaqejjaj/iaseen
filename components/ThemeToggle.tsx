"use client";
import { useEffect, useState } from "react";
import { getTheme, setTheme, type Theme } from "@/lib/theme";
import { useI18n } from "./LocaleProvider";

/** Dark / light switch. `wide` is the labelled version for the mobile menu. */
export default function ThemeToggle({ wide = false }: { wide?: boolean }) {
  const { t } = useI18n();
  const [theme, set] = useState<Theme>("dark");
  useEffect(() => {
    const sync = () => set(getTheme());
    sync();
    window.addEventListener("iaseen-theme", sync);
    return () => window.removeEventListener("iaseen-theme", sync);
  }, []);
  const label = theme === "dark" ? t.landing.theme.toLight : t.landing.theme.toDark;
  const icon = theme === "dark"
    ? <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
    : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>;
  return (
    <button type="button" className={wide ? "pill pill-line" : "icon-btn"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={label} title={label}
      style={wide ? { minHeight: 48, justifyContent: "center", width: "100%" } : undefined}>
      <svg aria-hidden width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      {wide && <span>{label}</span>}
    </button>
  );
}
