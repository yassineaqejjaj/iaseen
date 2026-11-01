"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { runAct } from "@/lib/actions";
import { ask, type Answer } from "@/lib/ask";
import { useI18n } from "./LocaleProvider";

export default function AskSection() {
  const { t, c, href, locale } = useI18n();
  const first: Answer = { q: c.qa[0].q, a: c.qa[0].a, sources: c.qa[0].sources.map((s) => ({ label: s.label, href: href(s.href) })) };
  const [ans, setAns] = useState<Answer>(first);
  const [text, setText] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const pick = (i: number) => { setActive(i); setAns(ask(c.qa[i].q, locale)); };
  return (
    <div className="glass" style={{ flex: "999 1 560px", minWidth: 0, borderRadius: 28, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontWeight: 600 }}>
          <span aria-hidden style={{ width: 32, height: 32, borderRadius: 10, background: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#07101f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /></svg>
          </span>
          {t.ask.name}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999, background: "#1f2b48", color: "#c3cce3" }}>{t.ask.badge}</span>
      </div>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, letterSpacing: ".1em", color: "#9aabd6" }}>{t.ask.suggested}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {c.qa.map((x, i) => (
          <button key={x.q} type="button" aria-pressed={active === i} onClick={() => pick(i)}
            style={{ minHeight: 44, padding: "8px 16px", borderRadius: 14, cursor: "pointer", textAlign: "start", fontSize: 14, fontWeight: 500, lineHeight: 1.4, border: `1px solid ${active === i ? "var(--accent)" : "#2e3b5a"}`, background: active === i ? "#1f2b48" : "transparent", color: "#fff" }}>
            <span style={{ display: "block", fontSize: 10, fontWeight: 600, letterSpacing: ".12em", color: "var(--signal)", marginBottom: 2 }}>{x.aud ? (t.ask.aud[x.aud] ?? x.aud).toUpperCase() : ""}</span>{x.q}
          </button>
        ))}
      </div>
      <div aria-live="polite" style={{ background: "rgba(8,11,18,.55)", border: "1px solid var(--line)", borderRadius: 18, padding: 20 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#8fa6ff" }}>{ans.q}</p>
        <p style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.65, color: "#e3e8f5", whiteSpace: "pre-line" }}>{ans.a}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14, alignItems: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", color: "#9aabd6" }}>{t.ask.sources}</span>
          {ans.sources.map((s) => (
            <Link key={s.href + s.label} href={s.href} style={{ fontSize: 13, fontWeight: 600, padding: "6px 12px", borderRadius: 999, background: "#1f2b48", color: "#c3cce3", textDecoration: "none" }}>{s.label}</Link>
          ))}
        </div>
        {ans.tour && (
          <button type="button" className="pill pill-accent" onClick={() => window.dispatchEvent(new CustomEvent("iaseen-tour", { detail: { id: ans.tour!.id } }))}
            style={{ marginTop: 14, minHeight: 44, padding: "0 18px", color: "#07101f" }}>{t.tours.start}: {ans.tour.title} {t.arrow}</button>
        )}
        {!!ans.acts?.length && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12, alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".08em", color: "var(--signal)" }}>{t.act.hint}</span>
            {ans.acts.map((x) => (
              <button key={x.act.k + x.act.v} type="button" onClick={() => runAct(x.act, (path) => router.push(href(path)))}
                style={{ minHeight: 40, fontSize: 13, fontWeight: 600, padding: "0 14px", borderRadius: 999, cursor: "pointer", border: "1px solid var(--accent)", background: "transparent", color: "#fff" }}>
                {t.act[x.act.k]}: {x.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; setActive(-1); setAns(ask(text, locale)); setText(""); }} style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <label htmlFor="ask-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{t.ask.placeholder}</label>
        <input id="ask-input" value={text} onChange={(e) => setText(e.target.value)} placeholder={t.ask.placeholder}
          style={{ flex: 1, minWidth: 0, minHeight: 52, padding: "0 18px", borderRadius: 999, border: "1px solid var(--line)", background: "rgba(8,11,18,.55)", color: "#fff", fontSize: 15, fontFamily: "inherit" }} />
        <button type="submit" aria-label={t.ask.send} style={{ flex: "none", width: 52, height: 52, borderRadius: "50%", border: "none", cursor: "pointer", background: "var(--accent)", color: "#07101f", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <svg className="flip" aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </form>
    </div>
  );
}
