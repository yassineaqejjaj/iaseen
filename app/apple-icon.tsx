import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// IASEEN app icon: the four-node eye on a light ground, the pupil is the only colour.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F2F4F8" }}>
        <svg width="180" height="180" viewBox="0 0 200 200">
          <g transform="translate(0,40)">
            <path d="M28 60 L100 24 L172 60 L100 96 Z" fill="none" stroke="#05060A" strokeWidth="6" strokeLinejoin="round" />
            <path d="M28 60 L172 60" stroke="#05060A" strokeWidth="6" />
            <circle cx="28" cy="60" r="9" fill="#05060A" /><circle cx="172" cy="60" r="9" fill="#05060A" />
            <circle cx="100" cy="24" r="9" fill="#05060A" /><circle cx="100" cy="96" r="9" fill="#05060A" />
            <circle cx="100" cy="60" r="18" fill="#4C6FF0" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
