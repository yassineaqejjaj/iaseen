import { profile, experiences, caseStudies, flagshipProjects, skills, books, insights } from "./content";

export type Answer = { text: string; links: { label: string; href: string }[]; grounded: boolean };
type Chunk = { text: string; keys: string; link: { label: string; href: string } };

const chunks: Chunk[] = [
  ...experiences.map((e) => ({
    text: `${e.title} at ${e.org} (${e.period}). ${e.summary}`,
    keys: `${e.title} ${e.org} ${e.tags.join(" ")} ${e.summary} experience career program programs led enterprise`,
    link: { label: `${e.title} · ${e.org}`, href: "/experience" },
  })),
  ...caseStudies.map((c) => ({
    text: `${c.client} — ${c.title}: ${c.summary}`,
    keys: `${c.client} ${c.title} ${c.tags.join(" ")} ${c.summary} client mission case study enterprise program programs led`,
    link: { label: `${c.client} case study`, href: `/work/${c.slug}` },
  })),
  ...flagshipProjects.map((p) => ({
    text: `${p.name} (${p.kind}): ${p.pitch}`,
    keys: `${p.name} ${p.kind} ${p.tags.join(" ")} ${p.pitch} product products build built agentic agents platform project projects`,
    link: { label: p.name, href: `/lab#${p.slug}` },
  })),
  ...skills.map((s) => ({
    text: `${s.name} (${s.pillar}). Proof: ${s.proof.join("; ")}.`,
    keys: `${s.name} ${s.pillar} ${s.proof.join(" ")} skill expertise`,
    link: { label: s.name, href: `/expertise#${s.id}` },
  })),
  ...books.map((b) => ({
    text: `Book: ${b.title}. ${b.note}.`,
    keys: `${b.title} ${b.note} book books author publication symbiose writing`,
    link: { label: b.title, href: "/insights" },
  })),
  ...insights["On Stage"].map((i) => ({
    text: `${i.kind}: ${i.title} — ${i.desc}.`,
    keys: `${i.title} podcast stage speaker conference talk`,
    link: { label: i.title, href: "/insights" },
  })),
  {
    text: `${profile.stats.map((s) => `${s.value} ${s.label.toLowerCase()}`).join(", ")}.`,
    keys: "years experience trained people training numbers who about summary",
    link: { label: "Home", href: "/" },
  },
];

const stop = new Set("the a an of and or to in for on with is are what which who how does do his he has he's show me about from at by".split(" "));
const tok = (s: string) => s.toLowerCase().replace(/[^a-z0-9à-ÿ ]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !stop.has(w));

export function ask(q: string): Answer {
  const lower = q.toLowerCase();
  if (/(vp|head of|cto|fit|suitable|why hire|recruit)/.test(lower)) {
    return {
      grounded: true,
      text:
        "The profile covers the three dimensions of an AI executive role. Lead: AI strategy, operating model and governance (Thales Data & AI mission, Head of AI Factory). Deliver: AI products and enterprise delivery across retail and industry clients (Decathlon, Carrefour, Fujitsu AI CoE). Build: hands-on agentic products — NOVA Suite, Nova Evals, M3aya Santé.",
      links: [
        { label: "Interactive CV", href: "/experience" },
        { label: "Client work", href: "/work" },
        { label: "AI Lab", href: "/lab" },
      ],
    };
  }
  const qt = tok(q);
  const scored = chunks
    .map((c) => {
      const k = new Set(tok(c.keys));
      return { c, s: qt.filter((t) => k.has(t) || [...k].some((w) => w.startsWith(t) && t.length > 3)).length };
    })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3);
  if (!scored.length)
    return {
      grounded: false,
      text: "I can only answer from validated information on this site (experience, client work, AI Lab, expertise, insights). Try asking about a program, a product or a skill.",
      links: [{ label: "Browse the AI Lab", href: "/lab" }],
    };
  return {
    grounded: true,
    text: scored.map((x) => x.c.text).join("\n\n"),
    links: scored.map((x) => x.c.link),
  };
}

export const suggested = [
  "What enterprise AI programs has he led?",
  "Show his agentic AI products",
  "What makes his profile suitable for a VP AI role?",
];
