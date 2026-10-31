"use client";
import { useState } from "react";
import Link from "next/link";
import { skills, flagshipProjects, type Pillar } from "@/lib/content";

const pillars: { p: Pillar; d: string }[] = [
  { p: "Lead", d: "AI Strategy, Operating Model, Governance, Transformation" },
  { p: "Deliver", d: "AI Products, Teams, MLOps, Enterprise Delivery" },
  { p: "Build", d: "AI Agents, RAG, Context Engineering, Evaluation" },
];

export default function SkillMap() {
  const [sel, setSel] = useState("agentic-ai");
  const s = skills.find((x) => x.id === sel)!;
  const projects = flagshipProjects.filter((p) => p.skills.includes(sel));
  return (
    <div className="container-x pb-24">
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map(({ p, d }) => (
          <div key={p} className="card p-5">
            <p className="display text-2xl font-bold">{p}</p>
            <p className="mb-4 mt-1 text-sm text-muted">{d}</p>
            <div className="flex flex-wrap gap-2">
              {skills.filter((x) => x.pillar === p).map((x) => (
                <button key={x.id} id={x.id} onClick={() => setSel(x.id)} className={`chip ${sel === x.id ? "!border-electric !bg-electric !text-white" : "hover:border-electric"}`}>{x.name}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="dark-section mt-6 rounded-2xl p-6 md:p-8">
        <p className="eyebrow">Proof for</p>
        <h2 className="display mt-1 text-3xl font-bold">{s.name}</h2>
        <ul className="mt-4 list-disc pl-5">{s.proof.map((x) => <li key={x}>{x}</li>)}</ul>
        {projects.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {projects.map((p) => <Link key={p.slug} href={`/lab#${p.slug}`} className="chip text-electric">{p.name} →</Link>)}
          </div>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {s.links.filter((l) => l !== "/lab").map((l) => <Link key={l} href={l} className="chip text-electric">{l} →</Link>)}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted">No skill bars: every skill is tied to a concrete project or role.</p>
    </div>
  );
}
