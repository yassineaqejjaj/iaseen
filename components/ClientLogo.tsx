import { LOGO_PATHS, LOGO_FILES, LOGO_COLOUR } from "@/lib/logos";

const NAMES: Record<string, string> = { thales: "Thales", decathlon: "Decathlon", carrefour: "Carrefour", fujitsu: "Fujitsu", devoteam: "Devoteam", axa: "AXA", banquepopulaire: "Banque Populaire", pmoffice: "Services du Premier ministre" };

/**
 * Client mark on a transparent background, no chip.
 * Files: white silhouette on the dark theme (original shapes and lettering), except brand-colour marks.
 * Carrefour: the symbol plus its name set in text, as no free full logo file exists.
 */
export default function ClientLogo({ name, height = 28 }: { name: string; height?: number }) {
  const label = NAMES[name] ?? name;
  const ext = LOGO_FILES[name];
  const file = name === "devoteam" ? "devoteam-light" : name; // Devoteam: original disc, lettering lightened for dark backgrounds
  if (ext)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`/logos/${file}.${ext}`} alt={label} style={{ height, width: "auto", maxWidth: "100%", display: "block", filter: LOGO_COLOUR.includes(name) ? "none" : "brightness(0) invert(1)" }} />
    );
  if (LOGO_PATHS[name])
    return (
      <span role="img" aria-label={label} style={{ display: "inline-flex", alignItems: "center", gap: height * 0.28, color: "#fff" }}>
        <svg aria-hidden viewBox="0 0 24 24" height={height} width={height} fill="currentColor"><path d={LOGO_PATHS[name]} /></svg>
        <span aria-hidden style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: height * 0.82, letterSpacing: "-0.02em", lineHeight: 1 }}>{label}</span>
      </span>
    );
  return <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: height * 0.7, letterSpacing: "0.02em", color: "#fff" }}>{label}</span>;
}
