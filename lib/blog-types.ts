export type DiagramKind = "layers" | "steps" | "loop" | "compare";

export type Block = {
  /** H2, ideally phrased as a question people ask. */
  h: string;
  p?: string[];
  list?: string[];
  table?: { head: string[]; rows: string[][] };
};

export type Loc = {
  title: string;
  dek: string;
  /** Answer-first paragraph (40 to 60 words) shown right under the title; the passage search and AI engines quote. */
  answer?: string;
  sections: Block[];
  take: string;
  diagram: { nodes: string[]; nodes2?: string[]; heads?: [string, string]; caption: string };
  results: { v: string; l: string }[];
  faq?: { q: string; a: string }[];
};

export type Content = { en: Loc; fr: Loc; ar: Loc };
