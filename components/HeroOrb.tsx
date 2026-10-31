"use client";
import { useEffect, useRef } from "react";

/** Abstract "intelligence network": a rotating node graph on a sphere. Pointer = depth parallax, scroll = drift + scale. */
export default function HeroOrb() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current!, box = wrap.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 640px)").matches;
    const N = small ? 56 : 96;
    const pts = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
      return { x: Math.cos(th) * r, y, z: Math.sin(th) * r, hot: i % 11 === 0 };
    });
    const edges: [number, number][] = [];
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y, pts[i].z - pts[j].z);
      if (d < (small ? 0.62 : 0.5)) edges.push([i, j]);
    }
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, t0 = performance.now();
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.clientWidth; h = box.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      cx += (tx - cx) * 0.05; cy += (ty - cy) * 0.05;
      const ay = (reduce || small ? 0.6 : t * 0.18) + cx * 0.6, ax = 0.35 + cy * 0.4;
      const R = Math.min(w, h) * 0.36, f = 3.2;
      const sa = Math.sin(ay), ca = Math.cos(ay), sx = Math.sin(ax), cxx = Math.cos(ax);
      const P = pts.map((p) => {
        const x1 = p.x * ca + p.z * sa, z1 = -p.x * sa + p.z * ca;
        const y2 = p.y * cxx - z1 * sx, z2 = p.y * sx + z1 * cxx;
        const k = f / (f - z2);
        return { sx: w / 2 + x1 * R * k, sy: h / 2 + y2 * R * k, z: z2, k, hot: p.hot };
      });
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, R * 1.5);
      g.addColorStop(0, "rgba(106,145,255,.22)"); g.addColorStop(1, "rgba(106,145,255,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      for (const [i, j] of edges) {
        const a = P[i], b = P[j], d = (a.z + b.z) / 2;
        ctx.strokeStyle = `rgba(143,176,255,${0.08 + 0.32 * ((d + 1) / 2)})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
      }
      for (const p of P) {
        const depth = (p.z + 1) / 2;
        ctx.fillStyle = p.hot ? `rgba(152,228,224,${0.5 + 0.5 * depth})` : `rgba(190,208,255,${0.25 + 0.65 * depth})`;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, (p.hot ? 3.2 : 1.8) * p.k, 0, 6.2832); ctx.fill();
      }
    };
    const loop = (now: number) => { if (visible) draw(now); raf = requestAnimationFrame(loop); };
    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduce || small) draw(performance.now()); });
    ro.observe(box);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(box);
    const move = (e: PointerEvent) => { const r = box.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = ((e.clientY - r.top) / r.height - 0.5) * 2; };
    const scroll = () => {
      const y = window.scrollY, s = Math.max(0.7, 1 - y / 1800);
      box.style.transform = `translateY(${y * 0.12}px) scale(${s})`;
      box.style.opacity = String(Math.max(0.15, 1 - y / 900));
    };
    if (reduce || small) draw(performance.now()); else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("scroll", scroll, { passive: true });
    }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener("pointermove", move); window.removeEventListener("scroll", scroll); };
  }, []);

  return (
    <div ref={wrap} aria-hidden style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", maxWidth: 560, margin: "0 auto", willChange: "transform, opacity" }}>
      <canvas ref={cv} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
