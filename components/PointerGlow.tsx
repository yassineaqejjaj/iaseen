"use client";
import { useEffect } from "react";

/** Feeds the pointer position to .card / .glass so their reflection follows the cursor. */
export default function PointerGlow() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const on = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(".card, .glass") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", on, { passive: true });
    return () => document.removeEventListener("pointermove", on);
  }, []);
  return null;
}
