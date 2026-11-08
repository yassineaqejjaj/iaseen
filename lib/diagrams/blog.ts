import type { DiagramKind, Loc } from "../blog-types";

// User-facing labels remain text, even when they contain quotes, markup or Mermaid punctuation.
const quoted = (value: string) => `"${value.replaceAll("&", "#38;").replaceAll('"', "#quot;").replaceAll("<", "#60;").replaceAll(">", "#62;").replace(/[\r\n]+/g, " ")}"`;

export function blogDiagramSource(kind: DiagramKind, diagram: Loc["diagram"]): string {
  const horizontal = /\p{Script=Arabic}/u.test([...diagram.nodes, ...(diagram.nodes2 ?? [])].join(" ")) ? "RL" : "LR";
  const chain = (nodes: string[], prefix: string, loop = false) => {
    const lines = nodes.map((label, i) => `    ${prefix}${i}[${quoted(label)}]`);
    for (let i = 1; i < nodes.length; i++) lines.push(`    ${prefix}${i - 1} --> ${prefix}${i}`);
    if (loop && nodes.length > 1) lines.push(`    ${prefix}${nodes.length - 1} -.-> ${prefix}0`);
    return lines;
  };
  if (kind === "compare") {
    return [`flowchart ${horizontal}`, `    subgraph left[${quoted(diagram.heads?.[0] ?? "")}]`, "    direction TB",
      ...chain(diagram.nodes, "left"), "    end",
      `    subgraph right[${quoted(diagram.heads?.[1] ?? "")}]`, "    direction TB",
      ...chain(diagram.nodes2 ?? [], "right"), "    end"].join("\n");
  }
  return [`flowchart ${kind === "layers" ? "TD" : horizontal}`,
    ...chain(diagram.nodes, "node", kind === "loop" || kind === "layers")].join("\n");
}
