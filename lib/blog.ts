import type { Locale } from "./i18n";
import type { Content, DiagramKind, Loc } from "./blog-types";
import { content as nova } from "./blog-content/building-enterprise-agentic-platforms-nova";
import { content as operating } from "./blog-content/ai-operating-model-experiments-to-enterprise-adoption";
import { content as evaluation } from "./blog-content/evaluating-multi-agent-systems-in-production";
import { content as context } from "./blog-content/context-engineering-beyond-traditional-rag";

/**
 * Blog articles: metadata here, long-form text per article in lib/blog-content/.
 * Figures come only from validated content: NOVA adoption and the DILA results already published on the case page.
 * Statements about the projects (NOVA, ORBIT, FORGE...) follow their public READMEs, including their beta status.
 */
export type { Block, Content, DiagramKind, Loc } from "./blog-types";

export type Post = Content & {
  slug: string;
  date: string; // ISO
  updated?: string; // ISO
  minutes: number;
  kind: DiagramKind;
  tags: string[];
  repos: { label: string; url: string }[];
  cases?: string[]; // case-study slugs
};

const GH = "https://github.com/yassineaqejjaj";

export const posts: Post[] = [
  {
    slug: "building-enterprise-agentic-platforms-nova", date: "2026-11-01", updated: "2026-11-01", minutes: 8, kind: "layers",
    tags: ["Agentic AI", "Platform", "Governance"],
    repos: [{ label: "NOVA", url: `${GH}/NOVA` }, { label: "ORBIT", url: `${GH}/ORBIT` }, { label: "FORGE", url: `${GH}/FORGE` }],
    ...nova,
  },
  {
    slug: "ai-operating-model-experiments-to-enterprise-adoption", date: "2026-11-01", updated: "2026-11-01", minutes: 8, kind: "steps",
    tags: ["Operating model", "Governance", "Adoption"],
    repos: [{ label: "agentic-sdlc", url: `${GH}/agentic-sdlc` }, { label: "TrustRail", url: `${GH}/TrustRail` }, { label: "NOVA", url: `${GH}/NOVA` }],
    cases: ["dila-sovereign-ai"],
    ...operating,
  },
  {
    slug: "evaluating-multi-agent-systems-in-production", date: "2026-11-01", updated: "2026-11-01", minutes: 8, kind: "loop",
    tags: ["Evaluation", "Multi-agent", "Reliability"],
    repos: [{ label: "FORGE", url: `${GH}/FORGE` }, { label: "NOVA", url: `${GH}/NOVA` }, { label: "MedGuard AI", url: `${GH}/medguard-ai` }],
    cases: ["dila-sovereign-ai"],
    ...evaluation,
  },
  {
    slug: "context-engineering-beyond-traditional-rag", date: "2026-11-01", updated: "2026-11-01", minutes: 8, kind: "compare",
    tags: ["Context engineering", "RAG", "Memory"],
    repos: [{ label: "ORBIT", url: `${GH}/ORBIT` }, { label: "NOVA", url: `${GH}/NOVA` }, { label: "FORGE", url: `${GH}/FORGE` }],
    cases: ["dila-sovereign-ai"],
    ...context,
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const loc = (p: Post, l: Locale): Loc => p[l];
