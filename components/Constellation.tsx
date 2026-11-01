"use client";
import { useEffect, useMemo, useState } from "react";
import type { PageAct } from "@/lib/actions";
import { PRODUCTS, productFor } from "@/lib/graph";
import { useI18n } from "./LocaleProvider";

type Kind = "role" | "skill" | "product";
type Node = { id: string; kind: Kind; label: string; sub?: string; x: number; y: number };

// Which role a proof label points to.
const ROLE_MATCH: Record<string, RegExp> = { Devoteam: /Devoteam|AI Factory/, Fujitsu: /Fujitsu/, Carrefour: /Carrefour/ };
// Roles with no named proof, linked from the CV role titles (AI product work, regulated governance).
// Products built or led in the role (a direct line from the role to its products).
const ROLE_PRODUCTS: Record<string, string[]> = { Devoteam: ["nova", "context", "forge"] };
const ROLE_EXTRA: Record<string, string[]> = { AXA: ["Governance", "AI Products"], "Banque Populaire": ["AI Products"], Carrefour: ["AI Products"] };

export default function Constellation() {
  const { t, c } = useI18n();
  const k = t.constellation;
  const [sel, setSel] = useState<string | null>(null);

  const { nodes, edges } = useMemo(() => {
    const roles = [...c.roles].reverse(); // oldest on the left
    const skills = Object.keys(c.proof);
    const nodes: Node[] = [
      ...PRODUCTS.map((p, i) => ({ id: `p:${p.id}`, kind: "product" as Kind, label: p.name, x: 90 + i * 164, y: 60 })),
      ...skills.map((s, i) => ({ id: `s:${s}`, kind: "skill" as Kind, label: t.expertise.skills[s] ?? s, x: 60 + i * 80, y: i % 2 ? 300 : 230 })),
      ...roles.map((r, i) => ({ id: `r:${r.org}`, kind: "role" as Kind, label: r.org, sub: r.period.replace(/^.* – /, ""), x: 100 + i * 200, y: 470 })),
    ];
    const edges = new Set<string>();
    const add = (a: string, b: string) => edges.add(`${a}|${b}`);
    for (const s of skills) {
      for (const pf of c.proof[s]) {
        const prod = productFor(pf.label);
        if (prod) add(`s:${s}`, `p:${prod.id}`);
        for (const r of roles) if (ROLE_MATCH[r.org]?.test(pf.label) || (r.org === "Devoteam" && /AI Factory/.test(pf.label))) add(`r:${r.org}`, `s:${s}`);
      }
    }
    for (const r of roles) for (const s of ROLE_EXTRA[r.org] ?? []) add(`r:${r.org}`, `s:${s}`);
    for (const r of roles) for (const p of ROLE_PRODUCTS[r.org] ?? []) add(`r:${r.org}`, `p:${p}`);
    return { nodes, edges: [...edges].map((e) => e.split("|") as [string, string]) };
  }, [c, t]);

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const neighbours = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const [a, b] of edges) { (m.get(a) ?? m.set(a, new Set()).get(a)!).add(b); (m.get(b) ?? m.set(b, new Set()).get(b)!).add(a); }
    return m;
  }, [edges]);
  // A selection lights the whole chain: role to skills to products, or the reverse. Skills only reach their direct neighbours.
  const chain = useMemo(() => {
    if (!sel) return null;
    const out = new Set<string>([sel]);
    const start = byId.get(sel);
    for (const m of neighbours.get(sel) ?? []) {
      out.add(m);
      if (start && start.kind !== "skill" && byId.get(m)?.kind === "skill") for (const y of neighbours.get(m) ?? []) if (byId.get(y)?.kind !== start.kind) out.add(y);
    }
    return out;
  }, [sel, byId, neighbours]);
  const on = (id: string) => !chain || chain.has(id);
  const edgeOn = (a: string, b: string) => !chain || (chain.has(a) && chain.has(b));
  useEffect(() => {
    const h = (e: Event) => { const a = (e as CustomEvent<PageAct>).detail; if (a.k === "node" && byId.has(a.v)) setSel(a.v); };
    window.addEventListener("iaseen-act", h);
    return () => window.removeEventListener("iaseen-act", h);
  }, [byId]);
  const selected = sel ? byId.get(sel) : null;

  const chainChips = () => {
    if (!selected || !chain) return null;
    const groups: [Kind, string][] = [["role", k.roles], ["skill", k.skills], ["product", k.products]];
    return (
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        {groups.map(([kind, label]) => {
          const list = nodes.filter((n) => n.kind === kind && chain.has(n.id) && n.id !== selected.id);
          if (!list.length) return null;
          return (
            <div key={kind} style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", color: "var(--muted)", minWidth: 74 }}>{label}</span>
              {list.map((n) => <button key={n.id} type="button" className="chip" onClick={() => setSel(n.id)} style={{ cursor: "pointer", font: "inherit", fontSize: 13 }}>{n.label}</button>)}
            </div>
          );
        })}
      </div>
    );
  };
  const detail = () => {
    if (!selected) return <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>{k.none}</p>;
    if (selected.kind === "role") {
      const r = c.roles.find((x) => `r:${x.org}` === selected.id)!;
      return <><p style={{ margin: 0, fontSize: 13, color: "var(--link)", fontWeight: 600 }}>{r.period} · {r.org}</p><p className="display" style={{ margin: "6px 0 0", fontSize: 22 }}>{r.title}</p><p style={{ margin: "8px 0 0", color: "var(--text2)", lineHeight: 1.6 }}>{r.summary}</p></>;
    }
    if (selected.kind === "skill") {
      const key = selected.id.slice(2);
      return <><p className="display" style={{ margin: 0, fontSize: 22 }}>{selected.label}</p><ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 8 }}>{c.proof[key].map((x) => <li key={x.label} className="chip">{t.proof.kinds[x.kind] ?? x.kind} · {x.label}</li>)}</ul></>;
    }
    const prod = c.products.find((x) => x.name === selected.label);
    return <><p className="display" style={{ margin: 0, fontSize: 22 }} dir="ltr">{selected.label}</p><p style={{ margin: "8px 0 0", color: "var(--text2)", lineHeight: 1.6 }}>{prod?.desc}</p>{prod && /^https?:/.test(prod.url) && <a href={prod.url} target="_blank" rel="noopener noreferrer" className="pill pill-line" style={{ marginTop: 12, display: "inline-flex" }} dir="ltr">{t.lab.cta[prod.cta] ?? prod.cta} ↗</a>}</>;
  };

  const color = (kind: Kind) => (kind === "role" ? "#6a91ff" : kind === "skill" ? "#98e4e0" : "#f1f5f9");
  return (
    <div id="constellation" style={{ marginBottom: 40, scrollMarginTop: 96 }}>
      <p className="eyebrow">{k.eyebrow}</p>
      <h3 className="display" style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em" }}>{k.title}</h3>
      <p style={{ margin: "8px 0 20px", color: "var(--muted)", maxWidth: 620 }}>{k.hint}</p>
      <div className="constellation-svg glass" dir="ltr" style={{ borderRadius: 24, padding: 12 }}>
        <svg viewBox="0 0 1000 520" role="group" aria-label={k.title} style={{ width: "100%", height: "auto", display: "block" }}>
          {[[k.products, 30], [k.skills, 205], [k.roles, 440]].map(([label, y]) => (
            <text key={String(label)} x="8" y={y as number} fontSize="10" letterSpacing="1.4" fill="#94a3b8">{label as string}</text>
          ))}
          {edges.map(([a, b]) => {
            const A = byId.get(a)!, B = byId.get(b)!;
            const my = (A.y + B.y) / 2;
            return <path key={a + b} d={`M${A.x},${A.y} C${A.x},${my} ${B.x},${my} ${B.x},${B.y}`} fill="none" stroke={edgeOn(a, b) ? "#6a91ff" : "#94a3b8"} strokeWidth={sel && edgeOn(a, b) ? 1.6 : 1} opacity={sel ? (edgeOn(a, b) ? 0.9 : 0.08) : 0.22} />;
          })}
          {nodes.map((n) => {
            const active = on(n.id);
            const r = n.kind === "role" ? 10 : 7;
            return (
              <g key={n.id} role="button" tabIndex={0} aria-pressed={sel === n.id} aria-label={n.label} opacity={active ? 1 : 0.25} style={{ cursor: "pointer", outline: "none" }}
                onClick={() => setSel(sel === n.id ? null : n.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(sel === n.id ? null : n.id); } }}>
                <circle cx={n.x} cy={n.y} r={r + 8} fill="transparent" />
                <circle cx={n.x} cy={n.y} r={r} fill={color(n.kind)} stroke={sel === n.id ? "#fff" : "none"} strokeWidth="2" />
                <text x={n.x} y={n.y + (n.kind === "role" ? 30 : n.kind === "product" ? -16 : 22)} textAnchor="middle" fontSize={n.kind === "skill" ? 11 : 13} fontWeight={n.kind === "skill" ? 500 : 600} fill="#e2e8f0">{n.label}</text>
                {n.sub && <text x={n.x} y={n.y + 46} textAnchor="middle" fontSize="11" fill="#94a3b8">{n.sub}</text>}
              </g>
            );
          })}
        </svg>
      </div>
      <p className="constellation-mobile" style={{ display: "none", color: "var(--muted)", fontSize: 14 }}>{k.mobile}</p>
      <div aria-live="polite" className="card" style={{ marginTop: 14, padding: 20, borderRadius: 18 }}>{detail()}{chainChips()}</div>
    </div>
  );
}
