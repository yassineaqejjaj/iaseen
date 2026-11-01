"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { heroProgress } from "@/lib/heroProgress";
import { setMode } from "@/lib/mode";
import { useI18n } from "./LocaleProvider";
import HeroTitle from "./HeroTitle";

// three.js + React Three Fiber are only downloaded on desktop, when the browser is idle and motion is allowed.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const hasWebGL = () => { try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; } };

export default function HeroStory() {
  const { t, href } = useI18n();
  const s = t.story;
  const root = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const partsEl = useRef<HTMLUListElement>(null);
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = root.current!;
    const hdr = () => document.documentElement.style.setProperty("--hdr", `${document.querySelector("header")?.getBoundingClientRect().height ?? 72}px`);
    const measure = () => { const top = el.querySelector<HTMLElement>(".hero-top"), bot = el.querySelector<HTMLElement>(".hero-bottom"); if (top) heroProgress.topEdge = top.offsetTop + top.offsetHeight; if (bot) heroProgress.bottomEdge = bot.offsetTop;
      el.style.setProperty("--band-top", `${heroProgress.topEdge}px`); el.style.setProperty("--band-h", `${Math.max(0, heroProgress.bottomEdge - heroProgress.topEdge)}px`); };
    hdr(); measure(); addEventListener("resize", hdr); addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    const wide = matchMedia("(min-width: 760px)").matches;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onPointer = (e: PointerEvent) => { heroProgress.x = (e.clientX / innerWidth) * 2 - 1; heroProgress.y = (e.clientY / innerHeight) * 2 - 1; };
    if (!wide || calm) { heroProgress.v = 0; return () => { removeEventListener("resize", hdr); removeEventListener("resize", measure); }; }   // static layout: no scroll story, no 3D

    let raf = 0, phase = 0;
    const apply = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      heroProgress.v = p;
      el.style.setProperty("--p", p.toFixed(4));
      const ph = p > 0.34 ? 2 : 1;
      if (ph !== phase) {
        phase = ph;
        el.dataset.phase = String(ph);
        copy.current?.toggleAttribute("inert", ph === 2);
        partsEl.current?.toggleAttribute("inert", ph === 1);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    addEventListener("pointermove", onPointer, { passive: true });
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    const start = () => { if (hasWebGL()) setWebgl(true); };
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const h = idle ? idle(start) : window.setTimeout(start, 600);
    return () => { removeEventListener("resize", hdr); removeEventListener("resize", measure); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); removeEventListener("pointermove", onPointer); io.disconnect(); if (raf) cancelAnimationFrame(raf); if (!idle) clearTimeout(h); };
  }, []);

  // Choosing an object: it flies toward the camera, the page fades, then the destination section arrives with its own reveal.
  const dive = (e: React.MouseEvent<HTMLAnchorElement>, i: number, h: string) => {
    const el = root.current;
    const target = document.getElementById(h.replace(/^.*#/, ""));
    const story = !!el && el.dataset.phase === "2" && getComputedStyle(el.querySelector(".hero-sticky")!).position === "sticky";
    if (!story || !target || e.metaKey || e.ctrlKey || e.shiftKey || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    heroProgress.focus = i;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / 650), d = k * k * (3 - 2 * k);
      heroProgress.dive = d;
      el!.style.setProperty("--dive", d.toFixed(3));
      if (k < 1) return requestAnimationFrame(step);
      target.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      history.replaceState(null, "", `#${target.id}`);
      target.setAttribute("data-arrive", "");
      setTimeout(() => target.removeAttribute("data-arrive"), 1400);
      setTimeout(() => { heroProgress.dive = 0; heroProgress.focus = -1; el!.style.setProperty("--dive", "0"); }, 120);
    };
    requestAnimationFrame(step);
  };

  const goCv = () => { setMode("executive"); setTimeout(() => document.getElementById("experience")?.scrollIntoView(), 50); };

  return (
    <section id="top" ref={root} className="hero-story" data-phase="1" data-webgl={webgl && ready ? "on" : "off"}>
      <div className="hero-sticky">
        <div className="hero-copy" ref={copy}>
          <div className="hero-top">
            <p className="hero-brand display" dir="ltr">{s.brand}</p>
            <p className="eyebrow" style={{ margin: "6px 0 0" }}>{s.sub}</p>
            <p style={{ margin: "14px 0 0", fontSize: 14, color: "var(--text2)" }}>Yassine Aqejjaj · <span style={{ color: "var(--muted)" }}>{t.hero.roles}</span></p>
          </div>
          <div className="hero-stage" aria-hidden>
            <div className="orb">
              <div className="orb-core" />
              <div className="orb-part orb-1" /><div className="orb-part orb-2" /><div className="orb-part orb-3" />
            </div>
            {webgl && <HeroScene active={visible} onReady={() => setReady(true)} />}
          </div>
          <div className="hero-bottom">
            <HeroTitle line1={s.h1a} line2={s.h1b} />
            <p className="hero-pitch">{s.pitch}</p>
            <div className="rise" style={{ animationDelay: ".7s", display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 26 }}>
              <Link href={href("#about")} className="pill pill-accent magnetic" style={{ minHeight: 52, padding: "0 26px", fontSize: 16, color: "#05060a" }}>{s.enter}</Link>
              <button type="button" onClick={goCv} className="pill pill-line magnetic" style={{ minHeight: 52, padding: "0 26px", fontSize: 16 }}>{s.cv}</button>
            </div>
          </div>
        </div>
        <ul className="hero-parts wrap" ref={partsEl} aria-label={s.partsAria}>
          {s.parts.map((x, i) => (
            <li key={x.k}>
              <Link href={href(x.h)} onClick={(e) => dive(e, i, x.h)} className="card magnetic" style={{ display: "block", padding: "18px 20px", borderRadius: 18, textDecoration: "none", color: "var(--text)", background: "rgba(13,19,32,.7)", backdropFilter: "blur(10px)" }}>
                <span className="display" style={{ display: "block", fontSize: 24, letterSpacing: "0.04em" }}>{x.k}</span>
                <span style={{ display: "block", marginTop: 4, fontSize: 14, color: "var(--text2)" }}>{x.d}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="hero-scroll" aria-hidden>{s.scroll} ↓</p>
      </div>
    </section>
  );
}
