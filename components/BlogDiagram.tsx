import type { DiagramKind, Loc } from "@/lib/blog";

/** Article diagrams drawn in HTML and CSS so labels wrap and mirror correctly in French and Arabic. */
export default function BlogDiagram({ kind, d, label }: { kind: DiagramKind; d: Loc["diagram"]; label: string }) {
  const chain = (nodes: string[], cls = "") => (
    <ol className={`dg-chain ${cls}`}>
      {nodes.map((n, i) => (<li key={n}><span className="dg-node">{n}</span>{i < nodes.length - 1 && <span aria-hidden className={`dg-arrow${cls ? "" : " flip"}`}>→</span>}</li>))}
    </ol>
  );
  return (
    <figure className="dg" aria-label={label}>
      {kind === "layers" && (
        <div className="dg-layers" dir="auto">
          {d.nodes.map((n, i) => (<div key={n} className="dg-layer" data-i={i} data-edge={i === 0 || i === d.nodes.length - 1 ? "" : undefined}>{n}</div>))}
          <span aria-hidden className="dg-return">↺</span>
        </div>
      )}
      {kind === "steps" && (
        <ol className="dg-steps">
          {d.nodes.map((n, i) => (<li key={n} style={{ ["--h" as string]: `${96 + i * 46}px` }}><span>{n}</span></li>))}
        </ol>
      )}
      {kind === "loop" && (
        <div className="dg-loop">
          {chain(d.nodes)}
          <div aria-hidden className="dg-loopback"><span>↺</span></div>
        </div>
      )}
      {kind === "compare" && (
        <div className="dg-compare">
          <div><p className="dg-head">{d.heads?.[0]}</p>{chain(d.nodes, "v")}</div>
          <div data-accent><p className="dg-head">{d.heads?.[1]}</p>{chain(d.nodes2 ?? [], "v")}</div>
        </div>
      )}
      <figcaption>{d.caption}</figcaption>
    </figure>
  );
}
