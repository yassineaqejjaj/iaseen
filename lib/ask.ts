import { real } from "./content";
import { getI18n, type Locale } from "./i18n";

export type Answer = { q: string; a: string; sources: { label: string; href: string }[] };
type Chunk = { text: string; keys: string; src: { label: string; href: string } };

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ًͯ-ٟ]/g, "");
const tok = (s: string, stop: Set<string>) =>
  norm(s).replace(/[^\p{L}\p{N} ]/gu, " ").split(/\s+/).map((w) => (/^ال.{3,}/.test(w) ? w.slice(2) : w)).filter((w) => w.length > 2 && !stop.has(w));

function chunksFor(locale: Locale): Chunk[] {
  const { c, t, href } = getI18n(locale);
  const lab = (k: "experience" | "work" | "lab" | "expertise" | "insights" | "about") => t.nav[k];
  return [
    ...c.bio.paragraphs.map((p) => ({ text: p, keys: `${p} ${t.ask.kw.about}`, src: { label: lab("about"), href: href("#about") } })),
    ...c.roles.map((r) => ({ text: `${r.title}, ${r.org} (${r.period}). ${r.summary}`, keys: `${r.title} ${r.org} ${r.tags.join(" ")} ${r.summary} ${t.ask.kw.exp}`, src: { label: lab("experience"), href: href("#experience") } })),
    ...c.clients.map((cl) => ({ text: `${cl.client} — ${cl.title}: ${cl.summary}`, keys: `${cl.client} ${cl.title} ${cl.tags.join(" ")} ${cl.summary} ${t.ask.kw.client}`, src: { label: cl.client, href: href(`/work/${cl.slug}`) } })),
    ...c.products.map((p) => ({ text: `${p.name}: ${p.desc}`, keys: `${p.name} ${p.category} ${p.desc} ${t.ask.kw.product}`, src: { label: lab("lab"), href: href("#ai-lab") } })),
    ...c.books.map((b) => ({ text: `${b.title}. ${b.theme}`, keys: `${b.title} ${b.theme} ${t.ask.kw.book}`, src: { label: lab("insights"), href: href("#insights") } })),
    ...c.stage.map((v) => ({ text: `${v.title} (${v.source.split(" · ")[0]}).`, keys: `${v.title} ${v.source} ${t.ask.kw.talk}`, src: { label: lab("insights"), href: href("#insights") } })),
    ...Object.entries(c.proof).map(([k, v]) => ({ text: `${t.expertise.skills[k] ?? k}: ${v.map((x) => x.label).join("; ")}.`, keys: `${t.expertise.skills[k] ?? k} ${v.map((x) => x.label).join(" ")} ${t.ask.kw.skill}`, src: { label: lab("expertise"), href: href("#expertise") } })),
  ].filter((x) => real(x.text));
}

function rank(q: string, locale: Locale, n: number) {
  const { t } = getI18n(locale);
  const stop = new Set(norm(t.ask.stop).split(" "));
  const qt = tok(q, stop);
  return chunksFor(locale)
    .map((ch) => { const k = tok(ch.keys, new Set()); return { ch, s: qt.filter((w) => k.some((x) => x === w || (w.length > 3 && x.startsWith(w)))).length }; })
    .filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, n);
}

/** Top matches for the command palette: a label, a short snippet and a link. */
export function searchContent(q: string, locale: Locale, n = 6) {
  const seen = new Set<string>();
  return rank(q, locale, n * 3)
    .map(({ ch }) => ({ label: ch.src.label, text: ch.text.length > 120 ? ch.text.slice(0, 117) + "…" : ch.text, href: ch.src.href }))
    .filter((r) => !seen.has(r.href + r.text) && !!seen.add(r.href + r.text))
    .slice(0, n);
}

export function ask(q: string, locale: Locale): Answer {
  const { c, t, href } = getI18n(locale);
  const stop = new Set(norm(t.ask.stop).split(" "));
  const withHrefs = (a: { q: string; a: string; sources: { label: string; href: string }[] }): Answer => ({ q: a.q, a: a.a, sources: a.sources.map((s) => ({ label: s.label, href: href(s.href) })) });
  const hit = c.qa.find((x) => norm(x.q) === norm(q.trim()));
  if (hit) return withHrefs(hit);
  if (/(\bvp\b|head of|\bcto\b|suitable|why hire|recruit|recrut|postuler|توظيف)/i.test(q)) return withHrefs(c.qa[2]);
  const qt = tok(q, stop);
  const top = chunksFor(locale)
    .map((ch) => { const k = tok(ch.keys, new Set()); return { ch, s: qt.filter((w) => k.some((x) => x === w || (w.length > 3 && x.startsWith(w)))).length }; })
    .filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 3);
  if (!top.length) return { q, a: t.ask.fallback, sources: [{ label: t.nav.lab, href: href("#ai-lab") }] };
  const seen = new Set<string>();
  return { q, a: top.map((x) => x.ch.text).join("\n\n"), sources: top.map((x) => x.ch.src).filter((s) => !seen.has(s.href) && !!seen.add(s.href)) };
}
