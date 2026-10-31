"use client";
import { useState } from "react";
import Link from "next/link";
import { ask, suggested, type Answer } from "@/lib/ask";

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [log, setLog] = useState<{ q: string; a: Answer }[]>([]);
  const submit = (text: string) => {
    if (!text.trim()) return;
    setLog((l) => [...l, { q: text, a: ask(text) }]);
    setQ("");
  };
  return (
    <>
      <button onClick={() => setOpen(!open)} className="btn btn-primary fixed bottom-5 right-5 z-50 shadow-xl">
        ✦ Ask My AI
      </button>
      {open && (
        <div className="card fixed bottom-20 right-5 z-50 flex max-h-[70vh] w-[min(24rem,calc(100vw-2.5rem))] flex-col shadow-2xl" role="dialog" aria-label="Ask My AI">
          <div className="border-b border-line p-4">
            <p className="display font-bold">Ask My AI</p>
            <p className="text-xs text-muted">Answers come only from validated content on this site, with links to the proof.</p>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
            {log.length === 0 && (
              <div className="flex flex-col gap-2">
                {suggested.map((s) => (
                  <button key={s} onClick={() => submit(s)} className="card p-3 text-left hover:border-electric">{s}</button>
                ))}
              </div>
            )}
            {log.map((m, i) => (
              <div key={i} className="space-y-2">
                <p className="ml-auto w-fit max-w-[85%] rounded-2xl bg-electric px-3 py-2 text-white">{m.q}</p>
                <div className="rounded-2xl bg-soft p-3">
                  <p className="whitespace-pre-line">{m.a.text}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.a.links.map((l) => (
                      <Link key={l.href + l.label} href={l.href} onClick={() => setOpen(false)} className="chip text-electric">{l.label} →</Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); submit(q); }} className="flex gap-2 border-t border-line p-3">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask anything about my experience..." className="min-w-0 flex-1 rounded-full border border-line bg-bg px-4 py-2 text-sm outline-none focus:border-electric" />
            <button className="btn btn-primary !px-4 !py-2">Ask</button>
          </form>
        </div>
      )}
    </>
  );
}
