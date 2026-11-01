"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "./LocaleProvider";

// Elements that fade and rise as they enter the viewport. Nested matches are skipped, the hero and the interludes have their own motion.
const TARGETS = [
  "main .eyebrow", "main .h2", "main .lead", "main .card", "main .results > div", "main .kpis", "main .kpi-table", "main .dg", "main .take",
  "main .prose > section", "main .prose-table", "main details.more", "main .constellation-svg", "main .fx", "main .answer",
].join(",");

/** Scroll progress bar, reveal-on-scroll motion and a back-to-top button. All of it is skipped with reduced motion. */
export default function ScrollFx() {
  const { t } = useI18n();
  const path = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      bar.current?.style.setProperty("--sp", p.toFixed(4));
      setShow(scrollY > 700);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | null = null;
    const arm = () => {
      io?.disconnect();
      io = new IntersectionObserver((es) => {
        for (const e of es) if (e.isIntersecting) { (e.target as HTMLElement).setAttribute("data-in", ""); io?.unobserve(e.target); }
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      const seen = new Map<Element, number>();
      document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (el.closest("[data-rv], .hero-story, .interlude, .marquee, [data-inactive]") || el.hasAttribute("data-in")) return;
        if (el.getBoundingClientRect().top < innerHeight * 0.92) return; // already on screen: leave it alone
        const parent = el.parentElement!;
        const i = Math.min(5, seen.get(parent) ?? 0);
        seen.set(parent, i + 1);
        el.style.setProperty("--d", String(i));
        el.setAttribute("data-rv", "");
        io!.observe(el);
      });
    };
    const h = window.setTimeout(arm, 60);
    return () => { clearTimeout(h); io?.disconnect(); };
  }, [path]);

  return (
    <>
      <div ref={bar} className="scroll-progress" aria-hidden />
      <button type="button" className="to-top" data-show={show || undefined} aria-label={t.ui.toTop} title={t.ui.toTop} tabIndex={show ? 0 : -1}
        onClick={() => scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>
        <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </button>
    </>
  );
}
