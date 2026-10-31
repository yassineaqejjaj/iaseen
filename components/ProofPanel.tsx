"use client";
import { useState } from "react";
import Link from "next/link";
import { clients, products, profile } from "@/lib/content";

const tabs = [
  { id: "Lead", d: "Strategy, operating model, governance, transformation", items: [
    { k: "ROLE", t: "Head of AI Factory, Devoteam", h: "/#experience" },
    { k: "MISSION", t: "AI operating model design at Thales", h: "/work/thales-data-ai-operating-model" },
    { k: "TEACHING", t: "LEAP: 1,500+ professionals trained", h: "/#insights" },
  ] },
  { id: "Deliver", d: "Client programmes, teams and AI in production", items: clients.map((c) => ({ k: "MISSION", t: `${c.client}: ${c.title}`, h: `/work/${c.slug}` })) },
  { id: "Build", d: "Agentic platforms, products and open code on GitHub", items: [
    ...products.filter((p) => ["NOVA Suite", "TrustRail", "MedGuard AI"].includes(p.name)).map((p) => ({ k: "PRODUCT", t: p.name, h: "/#ai-lab" })),
    { k: "CODE", t: "GitHub portfolio", h: profile.github },
  ] },
];

export default function ProofPanel() {
  const [i, setI] = useState(0);
  const t = tabs[i];
  return (
    <aside aria-label="Lead, Deliver, Build" className="glass" style={{ width: "100%", color: "#fff", borderRadius: 28, padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 600, letterSpacing: ".14em", color: "var(--muted)" }}>EVERY CLAIM, LINKED TO A PROOF</p>
      <div role="tablist" style={{ display: "flex", gap: 6, padding: 5, background: "rgba(8,11,18,.6)", borderRadius: 999, width: "fit-content" }}>
        {tabs.map((x, k) => (
          <button key={x.id} role="tab" aria-selected={i === k} onClick={() => setI(k)} className="togglebtn"
            style={{ padding: "0 26px", border: "none", background: i === k ? "var(--accent)" : "transparent", color: i === k ? "#07101f" : "#fff" }}>{x.id}</button>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#c3cce3" }}>{t.d}</p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
        {t.items.map((x) => (
          <li key={x.t}>
            <Link href={x.h} className="card" style={{ display: "block", padding: "14px 18px", borderRadius: 14, textDecoration: "none", color: "#fff" }}>
              <span style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: ".08em", color: "var(--signal)" }}>{x.k}</span>
              <span style={{ display: "block", marginTop: 2, fontSize: 15, fontWeight: 500 }}>{x.t}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
