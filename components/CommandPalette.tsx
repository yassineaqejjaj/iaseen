"use client";
import { posts } from "@/lib/blog";
import { runAct } from "@/lib/actions";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ask, searchContent } from "@/lib/ask";
import { profile } from "@/lib/content";
import { getMode, setMode } from "@/lib/mode";
import { useI18n } from "./LocaleProvider";

type Item = { id: string; group: string; label: string; hint?: string; run: () => void };
const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ًͯ-ٟ]/g, "");

export default function CommandPalette({ onClose, initialQuery = "" }: { onClose: () => void; initialQuery?: string }) {
  const { t, c, href, locale } = useI18n();
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const go = (h: string) => { onClose(); router.push(h); };

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    input.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.paletteOpen = "";
    return () => { document.body.style.overflow = overflow; delete document.documentElement.dataset.paletteOpen; prev?.focus?.(); };
  }, []);

  const base = useMemo<Item[]>(() => {
    const sec: [string, string][] = [[t.nav.about, "#about"], [t.nav.experience, "#experience"], [t.nav.work, "#client-work"], [t.nav.lab, "#ai-lab"], [t.nav.expertise, "#expertise"], [t.nav.insights, "#insights"], [t.ask.eyebrow, "#ask"], [t.nav.contact, "#contact"]];
    return [
      ...sec.map(([label, h]) => ({ id: h, group: t.cmd.goTo, label, run: () => go(href(h)) })),
      ...c.clients.map((cl) => ({ id: cl.slug, group: t.cmd.cases, label: `${cl.client.split(" · ")[0]}: ${cl.title}`, run: () => go(href(`/work/${cl.slug}`)) })),
      { id: "nova", group: t.cmd.cases, label: "NOVA Suite", run: () => go(href("/nova")) },
      { id: "blog", group: t.cmd.goTo, label: t.blog.nav, run: () => go(href("/blog")) },
      ...posts.map((p) => ({ id: p.slug, group: t.blog.nav, label: p[locale].title, run: () => go(href(`/blog/${p.slug}`)) })),
      { id: "cv", group: t.cmd.actions, label: t.cmd.downloadCv, run: () => { onClose(); window.open(profile.cv, "_blank"); } },
      { id: "mode", group: t.cmd.actions, label: getMode() === "executive" ? t.cmd.toExperience : t.cmd.toExecutive, run: () => { setMode(getMode() === "executive" ? "experience" : "executive"); onClose(); } },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, c, locale]);

  const query = q.trim();
  const answer = useMemo(() => (query.length > 2 ? ask(query, locale) : null), [query, locale]);
  const items = useMemo<Item[]>(() => {
    if (!query) return base;
    const nq = norm(query);
    const cmds = base.filter((b) => norm(b.label).includes(nq));
    const found = searchContent(query, locale, 5).map((r, k) => ({ id: `r${k}`, group: t.cmd.related, label: r.label, hint: r.text, run: () => go(r.href) }));
    return [...cmds, ...found];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, base, locale]);
  useEffect(() => setI(0), [query]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); onClose(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setI((x) => Math.min(items.length - 1, x + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setI((x) => Math.max(0, x - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); items[i]?.run(); }
  };
  useEffect(() => { document.getElementById(`cmd-opt-${i}`)?.scrollIntoView({ block: "nearest" }); }, [i]);

  let lastGroup = "";
  return (
    <div onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(4,6,12,.72)", backdropFilter: "blur(6px)", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "12vh 16px 16px" }}>
      <div role="dialog" aria-modal="true" aria-label={t.cmd.open} onKeyDown={onKey} className="glass" style={{ width: "min(680px, 100%)", maxHeight: "72vh", display: "flex", flexDirection: "column", borderRadius: 24, overflow: "hidden", background: "rgba(13,19,32,.92)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: "1px solid var(--line)" }}>
          <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.cmd.placeholder} aria-label={t.cmd.placeholder} role="combobox" aria-expanded="true" aria-controls="cmd-list" aria-activedescendant={items[i] ? `cmd-opt-${i}` : undefined}
            style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 16, fontFamily: "inherit", minHeight: 36 }} />
          <button type="button" onClick={onClose} aria-label={t.cmd.close} style={{ border: "1px solid var(--line)", background: "transparent", color: "var(--muted)", borderRadius: 8, fontSize: 11, padding: "4px 8px", cursor: "pointer" }}>esc</button>
        </div>
        <div style={{ overflowY: "auto", padding: 8 }}>
          {answer && (
            <div style={{ margin: "4px 4px 8px", padding: 14, borderRadius: 14, background: "rgba(106,145,255,.1)", border: "1px solid rgba(106,145,255,.3)" }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: ".12em", color: "var(--signal)" }}>{t.cmd.answer}</p>
              <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--text2)", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden", whiteSpace: "pre-line" }}>{answer.a.split("\n\n")[0]}</p>
              {answer.tour && (
                <button type="button" className="pill pill-accent" onClick={() => { onClose(); setTimeout(() => window.dispatchEvent(new CustomEvent("iaseen-tour", { detail: { id: answer.tour!.id } })), 50); }}
                  style={{ marginTop: 10, minHeight: 38, padding: "0 16px", fontSize: 13, color: "#07101f" }}>{t.tours.start}: {answer.tour.title} {t.arrow}</button>
              )}
              {!!answer.acts?.length && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                  {answer.acts.map((x) => (
                    <button key={x.act.k + x.act.v} type="button" onClick={() => { if (x.act.k === "case" || x.act.k === "page") go(href(x.act.k === "case" ? `/work/${x.act.v}` : x.act.v)); else { onClose(); runAct(x.act, () => {}); } }}
                      style={{ minHeight: 36, fontSize: 12, fontWeight: 600, padding: "0 12px", borderRadius: 999, cursor: "pointer", border: "1px solid var(--accent)", background: "transparent", color: "#fff" }}>
                      {t.act[x.act.k]}: {x.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <ul id="cmd-list" role="listbox" aria-label={t.cmd.open} style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {items.length === 0 && <li style={{ padding: 18, color: "var(--muted)", fontSize: 14 }}>{t.cmd.noResults}</li>}
            {items.map((it, k) => {
              const head = it.group !== lastGroup; lastGroup = it.group;
              return (
                <li key={it.id + k} role="presentation">
                  {head && <p style={{ margin: "10px 10px 4px", fontSize: 11, fontWeight: 700, letterSpacing: ".12em", color: "var(--muted)" }}>{it.group}</p>}
                  <div id={`cmd-opt-${k}`} role="option" aria-selected={k === i} onMouseMove={() => setI(k)} onClick={it.run}
                    style={{ cursor: "pointer", padding: "10px 12px", borderRadius: 12, background: k === i ? "rgba(106,145,255,.18)" : "transparent", display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{it.label}</span>
                    {it.hint && <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.45 }}>{it.hint}</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <p style={{ margin: 0, padding: "10px 18px", borderTop: "1px solid var(--line)", fontSize: 12, color: "var(--muted)" }}>{t.cmd.hint}</p>
      </div>
    </div>
  );
}
