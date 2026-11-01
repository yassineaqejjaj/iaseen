import ClientLogo from "./ClientLogo";

/** A slow, endless row of logos. The list is rendered twice for a seamless loop; the copy is hidden from assistive tech.
 *  With reduced motion the row stops and wraps. */
export default function LogoMarquee({ names, label, reverse = false, seconds = 40 }: { names: string[]; label: string; reverse?: boolean; seconds?: number }) {
  // Repeat short lists so each half is wider than any screen; otherwise the loop shows a gap.
  const full = Array.from({ length: Math.max(1, Math.ceil(14 / names.length)) }, () => names).flat();
  const row = (hidden: boolean) => (
    <ul className="marquee-list" aria-hidden={hidden || undefined}>
      {full.map((n, i) => <li key={n + i} dir="ltr" aria-hidden={i >= names.length || undefined}><ClientLogo name={n} /></li>)}
    </ul>
  );
  return (
    <div className="marquee-wrap">
      <span className="marquee-label">{label}</span>
      <div className="marquee" dir="ltr" data-reverse={reverse || undefined} style={{ ["--dur" as string]: `${seconds}s` }}>
        <div className="marquee-track">{row(false)}{row(true)}</div>
      </div>
    </div>
  );
}
