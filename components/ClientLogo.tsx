import { LOGO_PATHS, LOGO_FILES } from "@/lib/logos";

const NAMES: Record<string, string> = { thales: "Thales", decathlon: "Decathlon", carrefour: "Carrefour", fujitsu: "Fujitsu", devoteam: "Devoteam", axa: "AXA", banquepopulaire: "Banque Populaire", pmoffice: "Services du Premier ministre" };

/**
 * Client mark: white silhouette on a transparent background, in a fixed-size cell per brand
 * (object-fit: contain) so every logo has the same optical weight. `scale` enlarges the whole family.
 * Carrefour: the symbol plus its name set in text, as no free full logo file exists.
 */
export default function ClientLogo({ name, scale = 1 }: { name: string; scale?: number }) {
  const label = NAMES[name] ?? name;
  const f = LOGO_FILES[name];
  if (f)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`/logos/${f[0]}`} alt={label} width={f[1] * scale} height={f[2] * scale}
        style={{ width: f[1] * scale, height: f[2] * scale, objectFit: "contain", objectPosition: "left center", display: "block", filter: "brightness(0) invert(1)" }} />
    );
  const h = 28 * scale;
  if (LOGO_PATHS[name])
    return (
      <span role="img" aria-label={label} style={{ display: "inline-flex", alignItems: "center", gap: h * 0.28, color: "#fff", height: h }}>
        <svg aria-hidden viewBox="0 0 24 24" height={h} width={h} fill="currentColor"><path d={LOGO_PATHS[name]} /></svg>
        <span aria-hidden style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: h * 0.82, letterSpacing: "-0.02em", lineHeight: 1 }}>{label}</span>
      </span>
    );
  return <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: h * 0.7, color: "#fff" }}>{label}</span>;
}
