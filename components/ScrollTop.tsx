"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Opens every page at its top. The sticky header is always in view, so the router judges the new page "already visible"
 * and keeps the previous scroll offset (a click far down the home page opened /work at the bottom).
 * Back/forward keep the browser's own restored position, and a link with a #hash goes to its target.
 */
export default function ScrollTop() {
  const path = usePathname();
  const popped = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const onPop = () => { popped.current = true; };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (popped.current) { popped.current = false; return; }
    const go = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    };
    go();
    requestAnimationFrame(go); // once more after the new page has painted
  }, [path]);

  return null;
}
