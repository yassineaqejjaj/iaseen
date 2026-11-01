import type { Locale } from "./i18n";
import type { Content, DiagramKind, Loc } from "./blog-types";
import { content as nova } from "./blog-content/building-enterprise-agentic-platforms-nova";
import { content as operating } from "./blog-content/ai-operating-model-experiments-to-enterprise-adoption";
import { content as evaluation } from "./blog-content/evaluating-multi-agent-systems-in-production";
import { content as context } from "./blog-content/context-engineering-beyond-traditional-rag";
import { content as factory } from "./blog-content/what-is-an-ai-factory";
import { content as agenticVsRag } from "./blog-content/agentic-ai-vs-rag-vs-workflows";
import { content as sovereign } from "./blog-content/sovereign-generative-ai-public-sector-dila";
import { content as governance } from "./blog-content/ai-agent-governance-policies-approvals-receipts";
import { content as mcp } from "./blog-content/mcp-enterprise-connecting-agents-safely";
import { content as autonomy } from "./blog-content/earned-autonomy-governing-ai-coding-agents";

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
  {
    slug: "what-is-an-ai-factory", date: "2026-11-01", updated: "2026-11-01", minutes: 9, kind: "layers",
    tags: ["AI Factory", "Operating model", "Enablement"],
    repos: [{ label: "NOVA", url: `${GH}/NOVA` }],
    cases: ["dila-sovereign-ai", "decathlon-ai-transformation"],
    ...factory,
  },
  {
    slug: "agentic-ai-vs-rag-vs-workflows", date: "2026-11-01", updated: "2026-11-01", minutes: 9, kind: "steps",
    tags: ["Agentic AI", "RAG", "Decision guide"],
    repos: [{ label: "NOVA", url: `${GH}/NOVA` }, { label: "ORBIT", url: `${GH}/ORBIT` }, { label: "FORGE", url: `${GH}/FORGE` }],
    cases: ["dila-sovereign-ai"],
    ...agenticVsRag,
  },
  {
    slug: "sovereign-generative-ai-public-sector-dila", date: "2026-11-01", updated: "2026-11-01", minutes: 9, kind: "layers",
    tags: ["Public sector", "Sovereign AI", "RAG"],
    repos: [],
    cases: ["dila-sovereign-ai"],
    ...sovereign,
  },
  {
    slug: "ai-agent-governance-policies-approvals-receipts", date: "2026-11-01", updated: "2026-11-01", minutes: 9, kind: "loop",
    tags: ["Governance", "Agents", "Security"],
    repos: [{ label: "TrustRail", url: `${GH}/TrustRail` }, { label: "NOVA", url: `${GH}/NOVA` }],
    ...governance,
  },
  {
    slug: "mcp-enterprise-connecting-agents-safely", date: "2026-11-01", updated: "2026-11-01", minutes: 9, kind: "compare",
    tags: ["MCP", "Security", "Context"],
    repos: [{ label: "ORBIT", url: `${GH}/ORBIT` }, { label: "NOVA", url: `${GH}/NOVA` }],
    ...mcp,
  },
  {
    slug: "earned-autonomy-governing-ai-coding-agents", date: "2026-11-01", updated: "2026-11-01", minutes: 9, kind: "steps",
    tags: ["Coding agents", "SDLC", "Governance"],
    repos: [{ label: "agentic-sdlc", url: `${GH}/agentic-sdlc` }, { label: "NOVA", url: `${GH}/NOVA` }, { label: "FORGE", url: `${GH}/FORGE` }],
    ...autonomy,
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const loc = (p: Post, l: Locale): Loc => p[l];
