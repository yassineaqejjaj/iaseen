"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, stripLocale, type Locale } from "@/lib/i18n";
import { useI18n } from "./LocaleProvider";

const name: Record<Locale, string> = { en: "English", fr: "Français", ar: "العربية" };

/** Language picker: a small dropdown on desktop, three chips inside the mobile menu. Links keep you on the same page. */
export default function LangMenu({ inline = false }: { inline?: boolean }) {
  const { locale, t } = useI18n();
  const rest = stripLocale(usePathname() || "/");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const to = (l: Locale) => (l === "en" ? rest : `/${l}${rest === "/" ? "" : rest}`);

  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", down); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
  }, [open]);

  if (inline)
    return (
      <div role="group" aria-label={t.nav.lang} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {locales.map((l) => (
          <Link key={l} href={to(l)} hrefLang={l} lang={l} aria-current={l === locale ? "true" : undefined}
            style={{ minHeight: 44, padding: "0 18px", display: "inline-flex", alignItems: "center", borderRadius: 999, textDecoration: "none", fontWeight: 600, border: `1px solid ${l === locale ? "var(--accent)" : "var(--line)"}`, background: l === locale ? "var(--accent)" : "transparent", color: l === locale ? "#05060a" : "var(--text2)" }}>{name[l]}</Link>
        ))}
      </div>
    );

  return (
    <div ref={box} style={{ position: "relative" }}>
      <button type="button" className="icon-btn lang-btn" aria-haspopup="menu" aria-expanded={open} aria-label={`${t.nav.lang}: ${name[locale]}`} onClick={() => setOpen(!open)}>
        <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /></svg>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".04em" }}>{locale.toUpperCase()}</span>
      </button>
      {open && (
        <ul role="menu" className="glass" style={{ position: "absolute", insetInlineEnd: 0, top: "calc(100% + 8px)", margin: 0, padding: 6, listStyle: "none", minWidth: 160, borderRadius: 16, background: "rgba(13,19,32,.96)" }}>
          {locales.map((l) => (
            <li key={l} role="none">
              <Link role="menuitem" href={to(l)} hrefLang={l} lang={l} aria-current={l === locale ? "true" : undefined} onClick={() => setOpen(false)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, minHeight: 40, padding: "0 12px", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: l === locale ? 700 : 500, color: l === locale ? "#fff" : "var(--text2)", background: l === locale ? "rgba(76,111,240,.2)" : "transparent" }}>
                {name[l]}<span style={{ fontSize: 11, color: "var(--muted)" }}>{l.toUpperCase()}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
