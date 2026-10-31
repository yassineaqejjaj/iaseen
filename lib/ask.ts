import { roles, clients, products, books, qa, proof, bio, stage } from "./content";

export type Answer = { q: string; a: string; sources: { label: string; href: string }[] };
type Chunk = { text: string; keys: string; src: { label: string; href: string } };

const chunks: Chunk[] = [
  ...bio.paragraphs.map((t) => ({ text: t, keys: `${t} about biography bio who background story profile`, src: { label: "About", href: "#about" } })),
  ...roles.map((r) => ({ text: `${r.title}, ${r.org} (${r.period}). ${r.summary}`, keys: `${r.title} ${r.org} ${r.tags.join(" ")} ${r.summary} experience career role`, src: { label: "Experience", href: "#experience" } })),
  ...clients.map((c) => ({ text: `${c.client} — ${c.title}: ${c.summary}`, keys: `${c.client} ${c.title} ${c.tags.join(" ")} ${c.summary} client mission case study programme programmes enterprise led`, src: { label: `${c.client} case study`, href: `/work/${c.slug}` } })),
  ...products.map((p) => ({ text: `${p.name}: ${p.desc}`, keys: `${p.name} ${p.category} ${p.desc} product products built project agents`, src: { label: "AI Lab", href: "#ai-lab" } })),
  ...books.map((b) => ({ text: `Book: ${b.title}. ${b.theme}`, keys: `${b.title} ${b.theme} book books author written publication`, src: { label: "Insights", href: "#insights" } })),
  ...stage.map((v) => ({ text: `${v.kind}: ${v.title} (${v.source.split(" · ")[0]}).`, keys: `${v.title} ${v.source} ${v.kind} talk podcast video conference speaker stage interview`, src: { label: "On stage", href: "#insights" } })),
  ...Object.entries(proof).map(([k, v]) => ({ text: `${k}: ${v.map((x) => x.label).join("; ")}.`, keys: `${k} ${v.map((x) => x.label).join(" ")} skill expertise proof`, src: { label: "Expertise", href: "#expertise" } })),
];

const stop = new Set("the a an of and or to in for on with is are what which who how does do his he has show me about from at by".split(" "));
const tok = (s: string) => s.toLowerCase().replace(/[^a-z0-9à-ÿ ]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !stop.has(w));

export function ask(q: string): Answer {
  const hit = qa.find((x) => x.q.toLowerCase() === q.trim().toLowerCase());
  if (hit) return hit;
  if (/(vp|head of|cto|suitable|why hire|recruit)/i.test(q)) return qa[2];
  const qt = tok(q);
  const top = chunks
    .map((c) => { const k = tok(c.keys); return { c, s: qt.filter((t) => k.some((w) => w === t || (t.length > 3 && w.startsWith(t)))).length }; })
    .filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 3);
  if (!top.length)
    return { q, a: "I can only answer from validated information on this site: experience, client work, AI Lab, expertise and insights. Try one of the suggested questions.", sources: [{ label: "AI Lab", href: "#ai-lab" }] };
  const seen = new Set<string>();
  return { q, a: top.map((x) => x.c.text).join("\n\n"), sources: top.map((x) => x.c.src).filter((s) => !seen.has(s.href) && !!seen.add(s.href)) };
}
