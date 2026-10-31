import { ImageResponse } from "next/og";

export const alt = "Yassine Aqejjaj, Head of AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Latin-only text: the default OG font has no Arabic glyphs, so every language shares this card.
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg, #080b12 0%, #111b33 60%, #1b2a55 100%)", color: "#f1f5f9" }}>
        <div style={{ display: "flex", fontSize: 30, color: "#98e4e0", letterSpacing: 4 }}>HEAD OF AI · AI STRATEGIST · PRODUCT BUILDER</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>Yassine Aqejjaj</div>
          <div style={{ display: "flex", fontSize: 44, marginTop: 24, color: "#9bb4ff" }}>I don't just lead AI. I build it.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#94a3b8" }}>iaseen.com · Agentic AI · RAG · Enterprise AI strategy</div>
      </div>
    ),
    size,
  );
}
