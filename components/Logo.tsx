/** iaseen logo, reversed version for dark backgrounds: symbol (eye over a pillar "i") + wordmark with the accent dot. */
export default function Logo({ size = 32 }: { size?: number }) {
  const font = size * 0.86;
  return (
    <span role="img" aria-label="iaseen" style={{ display: "inline-flex", alignItems: "center", gap: size * 0.34, lineHeight: 1 }}>
      <svg aria-hidden width={size} height={size} viewBox="0 0 64 64">
        <rect width="64" height="64" rx="16" fill="#FFFFFF" />
        <path d="M18 20 Q32 8 46 20 Q32 32 18 20 Z" fill="none" stroke="#0B1020" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="32" cy="20" r="4.5" fill="#6A91FF" />
        <rect x="28.5" y="30" width="7" height="20" rx="3.5" fill="#0B1020" />
      </svg>
      <span aria-hidden className="display" style={{ fontSize: font, lineHeight: 1, letterSpacing: "-0.04em", color: "#F1F5F9", display: "inline-flex", alignItems: "baseline", fontWeight: 400 }}>
        <span style={{ fontWeight: 700, position: "relative" }}>
          ı<span style={{ position: "absolute", left: "50%", top: "0.12em", width: "0.16em", height: "0.16em", marginLeft: "-0.1em", borderRadius: "50%", background: "#6A91FF" }} />
        </span>
        <span style={{ fontWeight: 700 }}>a</span>
        <span style={{ fontWeight: 400 }}>seen</span>
      </span>
    </span>
  );
}
