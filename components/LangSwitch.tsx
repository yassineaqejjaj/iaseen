"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, stripLocale, type Locale } from "@/lib/i18n";

const label: Record<Locale, string> = { en: "EN", fr: "FR", ar: "AR" };
const name: Record<Locale, string> = { en: "English", fr: "Français", ar: "العربية" };

export default function LangSwitch({ locale, aria }: { locale: Locale; aria: string }) {
  const rest = stripLocale(usePathname() || "/");
  return (
    <div role="group" aria-label={aria} className="lang-switch" style={{ display: "inline-flex", gap: 2, padding: 3, borderRadius: 999, border: "1px solid var(--line)" }}>
      {locales.map((l) => {
        const href = l === "en" ? rest : `/${l}${rest === "/" ? "" : rest}`;
        const on = l === locale;
        return (
          <Link key={l} href={href} hrefLang={l} lang={l} title={name[l]} aria-label={name[l]} aria-current={on ? "true" : undefined}
            style={{ minWidth: 36, minHeight: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 8px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: ".04em", textDecoration: "none", background: on ? "var(--accent)" : "transparent", color: on ? "#07101f" : "var(--text2)" }}>
            {label[l]}
          </Link>
        );
      })}
    </div>
  );
}
