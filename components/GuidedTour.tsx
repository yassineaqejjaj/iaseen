"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { runAct } from "@/lib/actions";
import { TOURS } from "@/lib/tours";
import { useI18n } from "./LocaleProvider";

/** Step-by-step tour started from an answer of the assistant. Each step moves the page (filter, skill, map node) and says why. */
export default function GuidedTour() {
  const { t, href } = useI18n();
  const router = useRouter();
  const [tour, setTour] = useState<string | null>(null);
  const [i, setI] = useState(0);
  const x = tour ? t.tours.list[tour as keyof typeof t.tours.list] : null;
  const acts = tour ? TOURS[tour] : [];

  useEffect(() => {
    const on = (e: Event) => { setTour((e as CustomEvent<{ id: string }>).detail.id); setI(0); };
    window.addEventListener("iaseen-tour", on);
    return () => window.removeEventListener("iaseen-tour", on);
  }, []);

  useEffect(() => {
    if (!tour) { delete document.documentElement.dataset.tour; return; }
    document.documentElement.dataset.tour = "";
    const a = acts[i];
    if (a && a.k !== "case" && a.k !== "page") runAct(a, () => {});
    return () => { delete document.documentElement.dataset.tour; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour, i]);

  useEffect(() => {
    if (!tour) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setTour(null); };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [tour]);

  if (!tour || !x) return null;
  const n = acts.length, a = acts[i], last = i === n - 1, nav = a.k === "case" || a.k === "page";
  const go = () => { setTour(null); runAct(a, (p) => router.push(href(p))); };
  return (
    <div className="tour glass" role="dialog" aria-label={x.title} aria-live="polite">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: ".12em", color: "var(--signal)" }}>{t.tours.start.toUpperCase()} · {x.title} · {t.tours.step} {i + 1}/{n}</p>
        <button type="button" onClick={() => setTour(null)} aria-label={t.tours.close} className="tour-x">✕</button>
      </div>
      <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.55, color: "#f2f4f8" }}>{x.steps[i]}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12, alignItems: "center" }}>
        <button type="button" className="pill pill-line" disabled={i === 0} onClick={() => setI(i - 1)} style={{ minHeight: 40, padding: "0 16px", opacity: i === 0 ? 0.4 : 1 }}>{t.tours.prev}</button>
        {nav ? (
          <button type="button" className="pill pill-accent" onClick={go} style={{ minHeight: 40, padding: "0 18px", color: "#05060a" }}>{t.tours.open} {t.arrow}</button>
        ) : (
          <button type="button" className="pill pill-accent" onClick={() => (last ? setTour(null) : setI(i + 1))} style={{ minHeight: 40, padding: "0 18px", color: "#05060a" }}>{last ? t.tours.close : t.tours.next}</button>
        )}
        {nav && !last && <button type="button" className="pill pill-line" onClick={() => setI(i + 1)} style={{ minHeight: 40, padding: "0 16px" }}>{t.tours.next}</button>}
      </div>
    </div>
  );
}
