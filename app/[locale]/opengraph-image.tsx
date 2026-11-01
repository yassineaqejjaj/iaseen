import { ImageResponse } from "next/og";

export const alt = "Yassine Aqejjaj, Head of AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Latin-only text: the default OG font has no Arabic glyphs, so every language shares this card.
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#05060A", color: "#F2F4F8", fontFamily: "sans-serif", position: "relative" }}>
        <svg width="620" height="372" viewBox="0 0 200 120" style={{ position: "absolute", right: 40, top: 110 }}>
          <g stroke="rgba(201,206,216,0.35)" strokeWidth="1.1" fill="none" strokeLinejoin="round">
            <path d="M20 60 L60 30 L100 22 L140 30 L180 60 L140 90 L100 98 L60 90 Z" />
            <path d="M60 30 L100 60 L140 30 M60 90 L100 60 L140 90 M20 60 L180 60" />
          </g>
          <g fill="#F2F4F8"><circle cx="20" cy="60" r="4.5" /><circle cx="60" cy="30" r="4" /><circle cx="100" cy="22" r="3.5" /><circle cx="140" cy="30" r="4" /><circle cx="180" cy="60" r="4.5" /><circle cx="140" cy="90" r="4" /><circle cx="100" cy="98" r="3.5" /><circle cx="60" cy="90" r="4" /></g>
          <circle cx="100" cy="60" r="10" fill="#4C6FF0" />
        </svg>
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 10, color: "#F2F4F8", fontWeight: 500 }}>IASEEN</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>Yassine Aqejjaj</div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 24, color: "#7B96FF" }}>I don&apos;t just lead AI. I build it.</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9BA3B5", letterSpacing: 2 }}>HEAD OF AI · PRODUCT BUILDER · iaseen.com</div>
      </div>
    ),
    size,
  );
}
