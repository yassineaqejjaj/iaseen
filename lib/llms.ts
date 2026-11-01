import { posts } from "./blog";
import { contentEn as c, profile, real } from "./content";
import { SITE } from "./schema";

const clean = (xs: string[]) => xs.filter(real);

/** Concise machine-readable summary for AI assistants (llmstxt.org format). English source; /fr and /ar mirror it. */
export function llmsTxt() {
  return `# Yassine Aqejjaj

> Head of AI, AI strategist and product builder based in Paris. 13 years of experience leading enterprise AI programmes (strategy, operating models, delivery) and building agentic AI and RAG platforms. Head of AI Factory at Devoteam since 2026 (joined in 2023 as Principal Product Manager, Lead of AI in 2024).

Key facts, each backed by a page on this site:
- Role: Head of AI Factory, Devoteam (Paris), since 2026. Career at Devoteam: Principal Product Manager (2023), Lead of AI (2024), Head of AI Factory (2026).
- Built NOVA Suite (Nova Agents, Nova Context, Nova Evals / FORGE), an agentic platform deployed to 800 employees, with a 15-person team.
- Trained 1,500+ professionals in generative AI, agentic AI and RAG (LEAP programme).
- Founded TRAIL Academy, an AI e-learning platform (https://trailacademy.fr).
- Author of four books on AI, leadership and the future of work.
- Languages: French, Arabic, English. Site available at ${SITE}, ${SITE}/fr and ${SITE}/ar.

## Pages
- [Home, profile and FAQ](${SITE}/): positioning, experience, AI Lab, expertise, insights
- [NOVA Suite, the agentic AI platform](${SITE}/nova): architecture (Agents, Context, Evals), real screens, public code
- [Blog](${SITE}/blog): articles on agentic platforms, AI operating models, evaluation and context engineering
${posts.map((p) => `- [${p.en.title}](${SITE}/blog/${p.slug}): ${p.en.dek}`).join("\n")}
- [French version](${SITE}/fr) · [Arabic version](${SITE}/ar)
${c.clients.map((x) => `- [${x.client}: ${x.title}](${SITE}/work/${x.slug}): ${x.summary}`).join("\n")}

## Experience
${c.roles.map((r) => `- ${r.title}, ${r.org} (${r.period}): ${r.summary}`).join("\n")}

## Products and projects
${c.products.map((p) => `- ${p.name}: ${p.desc}`).join("\n")}

## Publications
${c.books.map((b) => `- [${b.title}](${b.url}): ${b.theme}`).join("\n")}
${c.articles.map((a) => `- [${a.title}](${a.url}): article on Devoteam.com, ${a.date}`).join("\n")}

## Links
- LinkedIn: ${profile.linkedin}
- GitHub: ${profile.github}
- CV (PDF, English): ${SITE}${profile.cv}
- Full text for LLMs: ${SITE}/llms-full.txt
`;
}

/** Full text of the published case studies. Unvalidated placeholders are left out on purpose. */
export function llmsFull() {
  const cases = c.clients.map((x) => {
    const steps = x.steps
      .map((s) => {
        const body = real(s.body) ? s.body : "";
        const pts = clean(s.points).map((p) => `- ${p}`).join("\n");
        const stats = (s.stats ?? []).filter((k) => real(k.value)).map((k) => `- ${k.value}: ${k.label}`).join("\n");
        const more = clean(s.more ?? []).map((m) => `- ${m}`).join("\n");
        return body || pts || stats ? `### ${s.label}\n${[body, pts, stats, more].filter(Boolean).join("\n\n")}` : "";
      })
      .filter(Boolean)
      .join("\n\n");
    return `## ${x.client}: ${x.title}\nRole: ${x.role}. Year: ${x.year || "n/a"}. Sector: ${x.sector}.\nURL: ${SITE}/work/${x.slug}\n\n${steps}`;
  });
  return `${llmsTxt()}\n---\n\n# About\n${c.bio.paragraphs.join("\n\n")}\n\n# Case studies\n\n${cases.join("\n\n")}\n`;
}
