import type { PageAct } from "./actions";

/** Guided tours the assistant can start. The actions are language-neutral; captions and keywords live in the dictionary (t.tours). */
export const TOURS: Record<string, PageAct[]> = {
  leadership: [{ k: "node", v: "r:Devoteam" }, { k: "skill", v: "AI Strategy" }, { k: "skill", v: "Operating Model" }, { k: "case", v: "thales-data-ai-operating-model" }],
  build: [{ k: "node", v: "p:nova" }, { k: "filter", v: "AGENTIC" }, { k: "skill", v: "AI Agents" }, { k: "page", v: "/nova" }],
  delivery: [{ k: "node", v: "m:dila-sovereign-ai" }, { k: "skill", v: "Enterprise Delivery" }, { k: "case", v: "dila-sovereign-ai" }],
  rag: [{ k: "skill", v: "RAG" }, { k: "node", v: "m:dila-sovereign-ai" }, { k: "node", v: "p:context" }, { k: "page", v: "/nova" }],
};
