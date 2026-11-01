import Link from "next/link";
import Logo from "./Logo";
import LangSwitch from "./LangSwitch";
import ModeToggle from "./ModeToggle";
import PaletteButton from "./PaletteButton";
import { getI18n, type Locale } from "@/lib/i18n";

export default function Header({ locale }: { locale: Locale }) {
  const { t, href } = getI18n(locale);
  const links: [string, string][] = [
    [t.nav.about, "#about"], [t.nav.experience, "#experience"], [t.nav.work, "#client-work"], [t.nav.lab, "#ai-lab"],
    [t.nav.expertise, "#expertise"], [t.nav.insights, "#insights"], [t.nav.contact, "#contact"],
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(8,11,18,.72)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--line)" }}>
      <nav aria-label="Main" className="wrap" style={{ paddingBlock: 14, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <Link href={href("#top")} aria-label={t.nav.homeAria} style={{ textDecoration: "none", display: "inline-flex" }}>
          <Logo size={34} />
        </Link>
        <span className="name-tag" style={{ marginInlineEnd: "auto", marginInlineStart: 4, paddingInlineStart: 14, borderInlineStart: "1px solid var(--line)", fontSize: 14, fontWeight: 500, color: "var(--text2)", whiteSpace: "nowrap" }}>Yassine Aqejjaj</span>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 12px", fontSize: 14, fontWeight: 500 }}>
          {links.map(([l, h]) => (
            <Link key={h} href={href(h)} style={{ color: "var(--text2)", textDecoration: "none", padding: "10px 0" }}>{l}</Link>
          ))}
          <PaletteButton />
          <ModeToggle />
          <LangSwitch locale={locale} aria={t.nav.lang} />
          <Link href={href("#ask")} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, padding: "0 18px", borderRadius: 999, background: "var(--accent)", color: "#07101f", textDecoration: "none", fontWeight: 600 }}>
            <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /></svg>
            {t.nav.ask}
          </Link>
        </div>
      </nav>
    </header>
  );
}
