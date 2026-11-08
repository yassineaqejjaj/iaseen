"use client";

import { useEffect, useId, useState } from "react";
import { getTheme, type Theme } from "@/lib/theme";

// Mermaid has shared renderer configuration; keep theme changes and concurrent charts ordered.
let rendering: Promise<unknown> = Promise.resolve();

export default function MermaidDiagram({ chart, label }: { chart: string; label: string }) {
  const instance = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [theme, setTheme] = useState<Theme>("dark");
  const [svg, setSvg] = useState<string | null>(null);
  const [minimumWidth, setMinimumWidth] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const sync = () => setTheme(getTheme());
    sync();
    window.addEventListener("iaseen-theme", sync);
    return () => window.removeEventListener("iaseen-theme", sync);
  }, []);

  useEffect(() => {
    let active = true;
    setSvg(null);
    setFailed(false);
    const render = async () => {
      if (!active) return;
      const { default: mermaid } = await import("mermaid");
      const dark = theme === "dark";
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        suppressErrorRendering: true,
        theme: "base",
        fontFamily: "Inter, Arial, sans-serif",
        themeVariables: {
          background: dark ? "#0B0E17" : "#F2F4F8",
          primaryColor: dark ? "#0B0E17" : "#FFFFFF",
          primaryTextColor: dark ? "#F2F4F8" : "#05060A",
          primaryBorderColor: "#4C6FF0",
          lineColor: dark ? "#C9CED8" : "#4C6FF0",
          secondaryColor: dark ? "#171D30" : "#E8EDFF",
          tertiaryColor: dark ? "#111522" : "#F2F4F8",
          clusterBkg: dark ? "#111522" : "#F2F4F8",
          clusterBorder: "#4C6FF0",
          edgeLabelBackground: dark ? "#0B0E17" : "#FFFFFF",
        },
        flowchart: { htmlLabels: false, useMaxWidth: true, curve: "basis" },
        sequence: { useMaxWidth: true },
      });
      const result = await mermaid.render(`mermaid-${instance}`, chart);
      if (active) {
        const element = new DOMParser().parseFromString(result.svg, "image/svg+xml").documentElement;
        const width = Number(element.getAttribute("viewBox")?.trim().split(/\s+/)[2]);
        setMinimumWidth(Number.isFinite(width) && width > 0 ? Math.ceil(width) : 0);
        setSvg(result.svg);
      }
    };
    const job = rendering.then(render, render);
    rendering = job.catch(() => undefined);
    void job.catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, [chart, instance, theme]);

  return (
    <div role="img" aria-label={label} aria-busy={!svg && !failed} dir="ltr" tabIndex={0}
      style={{ overflow: "auto", maxWidth: "100%", maxHeight: 720, minWidth: 0, padding: 16 }}>
      {svg ? <div className="mermaid-diagram" style={{ minWidth: minimumWidth }} dangerouslySetInnerHTML={{ __html: svg }} /> :
        <p role="status" style={{ color: "var(--muted)" }}>{label}</p>}
    </div>
  );
}
