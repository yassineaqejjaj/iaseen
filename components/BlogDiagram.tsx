import type { DiagramKind, Loc } from "@/lib/blog";
import { blogDiagramSource } from "@/lib/diagrams/blog";
import MermaidDiagram from "./MermaidDiagram";

/** Mermaid is the editable source for article diagrams in every language. */
export default function BlogDiagram({ kind, d, label }: { kind: DiagramKind; d: Loc["diagram"]; label: string }) {
  return (
    <figure className="dg" aria-label={label}>
      <MermaidDiagram chart={blogDiagramSource(kind, d)} label={label} />
      <figcaption>{d.caption}</figcaption>
    </figure>
  );
}
