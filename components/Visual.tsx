/** Abstract ambient visual (not a real product screenshot). */
export default function Visual({ label, seed = 0 }: { label: string; seed?: number }) {
  const hue = [222, 200, 250, 235][seed % 4];
  return (
    <div className="relative flex h-40 items-end overflow-hidden rounded-t-2xl p-4" style={{ background: `linear-gradient(135deg, hsl(${hue} 70% 18%), hsl(${hue + 20} 80% 55%))` }}>
      <div className="grid-bg absolute inset-0 opacity-40" />
      <span className="relative text-xs font-semibold uppercase tracking-widest text-white/80">{label}</span>
    </div>
  );
}
