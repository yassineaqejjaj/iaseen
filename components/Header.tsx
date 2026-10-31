"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/lib/content";

const links = [
  ["Experience", "/experience"],
  ["Client Work", "/work"],
  ["AI Lab", "/lab"],
  ["Expertise", "/expertise"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
] as const;

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = () => {
    const el = document.documentElement;
    const dark = el.dataset.theme !== "dark";
    if (dark) el.dataset.theme = "dark"; else delete el.dataset.theme;
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
  };
  return (
    <header className="sticky top-0 z-40 border-b border-line backdrop-blur" style={{ background: "color-mix(in srgb, var(--bg) 85%, transparent)" }}>
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="display text-xl font-bold">
          YA<span className="text-electric">.</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {links.map(([l, h]) => (
            <Link key={h} href={h} className={path.startsWith(h) ? "font-semibold text-electric" : "text-muted hover:text-fg"}>
              {l}
            </Link>
          ))}
          <button onClick={toggle} aria-label="Toggle theme" className="chip hover:text-fg">◐ Theme</button>
        </nav>
        <button className="md:hidden chip" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="container-x flex flex-col gap-4 pb-5 text-sm md:hidden">
          {links.map(([l, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)}>{l}</Link>
          ))}
          <button onClick={toggle} className="chip w-fit">◐ Theme</button>
        </div>
      )}
    </header>
  );
}
