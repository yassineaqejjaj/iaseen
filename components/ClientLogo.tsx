import { LOGO_PATHS, LOGO_FILES, LOGO_ORIGINAL } from "@/lib/logos";

const NAMES: Record<string, string> = { thales: "THALES", decathlon: "DECATHLON", carrefour: "Carrefour", fujitsu: "FUJITSU", devoteam: "devoteam", axa: "AXA", banquepopulaire: "Banque Populaire", pmoffice: "Services du Premier ministre" };

/** Monochrome client mark: simple-icons path, else an SVG file in /public/logos, else a text wordmark. */
export default function ClientLogo({ name, height = 28, color = "#FFFFFF" }: { name: string; height?: number; color?: string }) {
  const label = NAMES[name] ?? name;
  if (LOGO_PATHS[name])
    return (
      <svg role="img" aria-label={label} viewBox="0 0 24 24" height={height} width={height} fill={color} style={{ flex: "none" }}>
        <path d={LOGO_PATHS[name]} />
      </svg>
    );
  if (LOGO_FILES.includes(name) && LOGO_ORIGINAL.includes(name))
    return (
      <span style={{ display: "inline-flex", background: "#fff", borderRadius: 8, padding: "4px 8px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/logos/${name}.svg`} alt={label} style={{ height: height * 0.85, width: "auto" }} />
      </span>
    );
  if (LOGO_FILES.includes(name))
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`/logos/${name}.svg`} alt={label} height={height} style={{ height, width: "auto", filter: color === "#FFFFFF" ? "brightness(0) invert(1)" : "brightness(0)" }} />;
  return <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: height * 0.7, letterSpacing: "0.04em", color }}>{label}</span>;
}
