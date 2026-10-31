"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { experiences, type Lens } from "@/lib/content";

const lenses: Lens[] = ["Leadership", "AI Product", "Technical"];

export default function Journey() {
  const [lens, setLens] = useState<Lens>("Leadership");
  const [open, setOpen] = useState<string>(experiences[0].id);
  return (
    <div className="container-x pb-24">
      <div role="tablist" className="flex flex-wrap gap-2">
        {lenses.map((l) => (
          <button key={l} role="tab" aria-selected={lens === l} onClick={() => setLens(l)}
            className={`btn ${lens === l ? "btn-primary" : "btn-ghost"}`}>{l}</button>
        ))}
      </div>
      <ol className="relative mt-10 space-y-4 border-l-2 border-line pl-6">
        {experiences.map((e) => {
          const isOpen = open === e.id;
          return (
            <li key={e.id} className="relative">
              <span className={`absolute -left-[33px] top-6 h-3 w-3 rounded-full ${isOpen ? "bg-electric" : "bg-line"}`} />
              <button onClick={() => setOpen(isOpen ? "" : e.id)} aria-expanded={isOpen} className="card w-full p-5 text-left transition hover:border-electric">
                <p className="eyebrow">{e.period}</p>
                <p className="display mt-1 text-xl font-bold">{e.title}</p>
                <p className="text-muted">{e.org}{e.sensitive ? " · public information only" : ""}</p>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="mt-4">{e.summary}</p>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted">{lens}</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {e.lenses[lens].map((x) => <li key={x}>{x}</li>)}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">{e.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
