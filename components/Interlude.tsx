"use client";
import { useEffect, useRef } from "react";
import { useI18n } from "./LocaleProvider";

/** A short, wide pause between sections: one monumental sentence or figure. Content is plain HTML; the reveal is progressive. */
export default function Interlude({ i }: { i: number }) {
  const { t } = useI18n();
  const el = useRef<HTMLDivElement>(null);
  const x = t.interlude[i];
  useEffect(() => {
    const n = el.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    n.dataset.armed = "";
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { n.dataset.in = ""; io.disconnect(); } }, { threshold: 0.35 });
    io.observe(n);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={el} className="interlude" data-fig={x.fig ? "" : undefined}>
      <div className="wrap">
        <p className={`interlude-big display${x.fig ? " fig" : ""}`} data-r dir="auto">{x.big}</p>
        <p className="interlude-small" data-r>{x.small}</p>
      </div>
    </div>
  );
}
