import Link from "next/link";
import Logo from "./Logo";

const links = [["About", "/#about"], ["Experience", "/#experience"], ["Client Work", "/#client-work"], ["AI Lab", "/#ai-lab"], ["Expertise", "/#expertise"], ["Insights", "/#insights"], ["Contact", "/#contact"]];

export default function Header() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(8,11,18,.72)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--line)" }}>
      <nav aria-label="Main" className="wrap" style={{ paddingBlock: 14, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <Link href="/#top" aria-label="iaseen, back to top" style={{ textDecoration: "none", display: "inline-flex" }}>
          <Logo size={34} />
        </Link>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 20px", fontSize: 15, fontWeight: 500 }}>
          {links.map(([l, h]) => (
            <Link key={h} href={h} style={{ color: "var(--text2)", textDecoration: "none", padding: "10px 0" }}>{l}</Link>
          ))}
          <Link href="/#ask" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, padding: "0 18px", borderRadius: 999, background: "var(--accent)", color: "#07101f", textDecoration: "none", fontWeight: 600 }}>
            <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /></svg>
            Ask my AI
          </Link>
        </div>
      </nav>
    </header>
  );
}
