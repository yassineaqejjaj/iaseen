"use client";
import { useEffect, useRef } from "react";

/**
 * Folds long content on phones only. The content is always in the HTML (crawlable, and open without JS);
 * on desktop the wrapper disappears (display: contents), on a narrow screen it starts closed.
 */
export default function MobileFold({ label, count, children }: { label: string; count?: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(max-width: 720px)");
    el.open = !mq.matches;
    const onChange = () => { if (!mq.matches) el.open = true; };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return (
    <details ref={ref} className="more mfold" open>
      <summary>
        <span>{label}</span>
        {count != null && <span className="more-count">{count}</span>}
        <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </summary>
      <div className="more-body">{children}</div>
    </details>
  );
}
