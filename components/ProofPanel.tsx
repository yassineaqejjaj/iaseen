"use client";
import { useState } from "react";
import Link from "next/link";
import { profile } from "@/lib/content";
import { useI18n } from "./LocaleProvider";

export default function ProofPanel() {
  const { t, c, href } = useI18n();
  const [i, setI] = useState(0);
  const p = t.proof;
  const tabs = [
    { id: "Lead", items: p.leadItems.map((x) => ({ k: x.k, t: x.t, h: href(x.h) })) },
    { id: "Deliver", items: c.clients.map((cl) => ({ k: "MISSION", t: `${cl.client}: ${cl.title}`, h: href(`/work/${cl.slug}`) })) },
    {
      id: "Build",
      items: [
        ...c.products.filter((x) => ["NOVA Suite", "TrustRail", "MedGuard AI"].includes(x.name)).map((x) => ({ k: "PRODUCT", t: x.name, h: href("#ai-lab") })),
        { k: "CODE", t: p.github, h: profile.github },
      ],
    },
  ] as { id: "Lead" | "Deliver" | "Build"; items: { k: string; t: string; h: string }[] }[];
  const tab = tabs[i];
  return (
    <aside aria-label={p.aria} className="glass" style={{ width: "100%", color: "#fff", borderRadius: 28, padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 600, letterSpacing: ".14em", color: "var(--muted)" }}>{p.panel}</p>
      <div role="tablist" style={{ display: "flex", gap: 6, padding: 5, background: "rgba(8,11,18,.6)", borderRadius: 999, width: "fit-content" }}>
        {tabs.map((x, k) => (
          <button key={x.id} role="tab" aria-selected={i === k} onClick={() => setI(k)} className="togglebtn"
            style={{ padding: "0 26px", border: "none", background: i === k ? "var(--accent)" : "transparent", color: i === k ? "#07101f" : "#fff" }}>{p.tabs[x.id]}</button>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#c3cce3" }}>{p.desc[tab.id]}</p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
        {tab.items.map((x) => (
          <li key={x.t}>
            <Link href={x.h} className="card" style={{ display: "block", padding: "14px 18px", borderRadius: 14, textDecoration: "none", color: "#fff" }}>
              <span style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: ".08em", color: "var(--signal)" }}>{p.kinds[x.k] ?? x.k}</span>
              <span style={{ display: "block", marginTop: 2, fontSize: 15, fontWeight: 500 }}>{x.t}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
