"use client";
import { useEffect } from "react";

/** Elements with .magnetic lean a few pixels toward the cursor when it is close. Fine pointers only, never with reduced motion. */
export default function MagneticCursor() {
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let active: HTMLElement[] = [];
    const move = (e: PointerEvent) => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
      for (const el of els) {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const reach = Math.max(r.width, r.height) / 2 + 70;
        if (Math.hypot(dx, dy) < reach) { el.style.transform = `translate(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.22).toFixed(1)}px)`; if (!active.includes(el)) active.push(el); }
        else if (active.includes(el)) { el.style.transform = ""; active = active.filter((x) => x !== el); }
      }
    };
    addEventListener("pointermove", move, { passive: true });
    return () => { removeEventListener("pointermove", move); active.forEach((el) => (el.style.transform = "")); };
  }, []);
  return null;
}
