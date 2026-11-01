"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import LangMenu from "./LangMenu";
import ModeToggle from "./ModeToggle";
import PaletteButton from "./PaletteButton";
import { useI18n } from "./LocaleProvider";

const SECTIONS = ["about", "experience", "client-work", "ai-lab", "expertise", "insights", "contact"];

/**
 * One calm bar: logo, six section links with a scroll-spy underline, then a few tools and the contact button.
 * Transparent over the hero, glass once you scroll. Below 1080 px everything moves into a full-screen menu (the longest French and Arabic labels need that room).
 */
export default function Header(_props: { locale?: string }) {
  const { t, href } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const links: [string, string][] = [
    ["about", t.nav.about], ["experience", t.nav.experience], ["client-work", t.nav.work], ["ai-lab", t.nav.lab], ["expertise", t.nav.expertise], ["insights", t.nav.insights], ["blog", t.blog.nav],
  ];

  useEffect(() => {
    const on = () => setScrolled(scrollY > 16);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) setActive(e.target.id); }, { rootMargin: "-40% 0px -55% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const wide = () => { if (innerWidth > 1080) setOpen(false); };
    addEventListener("keydown", key); addEventListener("resize", wide);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", key); removeEventListener("resize", wide); };
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled || open ? "" : undefined} data-open={open ? "" : undefined}>
      <nav className="wrap site-nav" aria-label={t.nav.mainAria}>
        <Link href={href("#top")} aria-label={t.nav.homeAria} className="nav-brand" onClick={() => setOpen(false)}>
          <Logo size={32} />
          <span className="name-tag">Yassine Aqejjaj</span>
        </Link>

        <ul className="nav-links">
          {links.map(([id, label]) => (
            <li key={id}><Link href={href(id === "blog" ? "/blog" : `#${id}`)} className="nav-link" aria-current={active === id ? "location" : undefined}>{label}</Link></li>
          ))}
        </ul>

        <div className="nav-tools">
          <span className="hide-sm"><PaletteButton /></span>
          <span className="hide-sm"><ModeToggle compact /></span>
          <span className="hide-sm"><LangMenu /></span>
          <Link href={href("#contact")} className="pill pill-accent nav-cta hide-sm" style={{ color: "#07101f" }}>{t.nav.contact}</Link>
          <button type="button" className="icon-btn nav-burger" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? t.nav.closeMenu : t.nav.menu} onClick={() => setOpen(!open)}>
            <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}</svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="mobile-menu">
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid" }}>
            {[...links, ["contact", t.nav.contact] as [string, string]].map(([id, label]) => (
              <li key={id}>
                <Link href={href(id === "blog" ? "/blog" : `#${id}`)} onClick={() => setOpen(false)} aria-current={active === id ? "location" : undefined} className="mm-link">{label}</Link>
              </li>
            ))}
          </ul>
          <PaletteButton wide />
          <ModeToggle />
          <LangMenu inline />
        </div>
      )}
    </header>
  );
}
