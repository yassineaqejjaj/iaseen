/**
 * IASEEN Constellation: an eye drawn by connected nodes, with the pupil as the only accent.
 * Below 48 px wide the eye drops to four nodes with heavier strokes (brand rule). Wordmark: Space Grotesk 500, tracking +28%.
 */
export type SymbolTone = "dark" | "light" | "mono" | "accent";

const TONES: Record<SymbolTone, { link: string; node: string; pupil: string }> = {
  dark: { link: "rgba(201,206,216,0.5)", node: "#F2F4F8", pupil: "#4C6FF0" },
  light: { link: "#8A93A8", node: "#05060A", pupil: "#4C6FF0" },
  mono: { link: "#05060A", node: "#05060A", pupil: "#05060A" },
  accent: { link: "rgba(255,255,255,0.6)", node: "#FFFFFF", pupil: "#05060A" },
};

export function Symbol({ width = 46, tone = "dark", title }: { width?: number; tone?: SymbolTone; title?: string }) {
  const c = TONES[tone];
  const small = width < 48;
  const link = tone === "dark" && small ? "rgba(201,206,216,0.6)" : c.link;
  return (
    <svg role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} width={width} height={(width * 120) / 200} viewBox="0 0 200 120" style={{ display: "block", flex: "none" }}>
      {small ? (
        <>
          <g stroke={link} strokeWidth="3" fill="none" strokeLinejoin="round"><path d="M20 60 L100 22 L180 60 L100 98 Z" /><path d="M20 60 L180 60" /></g>
          <g fill={c.node}><circle cx="20" cy="60" r="10" /><circle cx="180" cy="60" r="10" /><circle cx="100" cy="22" r="9" /><circle cx="100" cy="98" r="9" /></g>
          <circle cx="100" cy="60" r="18" fill={c.pupil} />
        </>
      ) : (
        <>
          <g stroke={link} strokeWidth="1.3" fill="none" strokeLinejoin="round"><path d="M20 60 L60 30 L100 22 L140 30 L180 60 L140 90 L100 98 L60 90 Z" /><path d="M60 30 L100 60 L140 30 M60 90 L100 60 L140 90 M20 60 L180 60" /></g>
          <g fill={c.node}><circle cx="20" cy="60" r="5" /><circle cx="60" cy="30" r="4.5" /><circle cx="100" cy="22" r="4" /><circle cx="140" cy="30" r="4.5" /><circle cx="180" cy="60" r="5" /><circle cx="140" cy="90" r="4.5" /><circle cx="100" cy="98" r="4" /><circle cx="60" cy="90" r="4.5" /></g>
          <circle cx="100" cy="60" r="11" fill={c.pupil} />
        </>
      )}
    </svg>
  );
}

export function Wordmark({ size = 18, color = "#F2F4F8" }: { size?: number; color?: string }) {
  return <span aria-hidden className="display" dir="ltr" style={{ fontSize: size, lineHeight: 1, fontWeight: 500, letterSpacing: "0.28em", color, marginInlineEnd: "-0.28em" }}>IASEEN</span>;
}

/** Horizontal lockup for dark backgrounds: symbol + wordmark. */
export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <span role="img" aria-label="IASEEN" dir="ltr" style={{ display: "inline-flex", alignItems: "center", gap: size * 0.4, lineHeight: 1 }}>
      <Symbol width={Math.round(size * 1.45)} />
      <Wordmark size={size * 0.5} />
    </span>
  );
}
