import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStepper from "@/components/CaseStepper";
import ClientLogo from "@/components/ClientLogo";
import { clients } from "@/lib/content";

export function generateStaticParams() { return clients.map((c) => ({ slug: c.slug })); }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const k = clients.findIndex((x) => x.slug === slug);
  if (k < 0) notFound();
  const c = clients[k];
  const next = clients[(k + 1) % clients.length];
  const facts = [["ROLE", c.role], ["CLIENT", c.org], ["FOCUS", c.focus], ...(c.year ? [["YEAR", c.year]] : [])];
  return (
    <>
      <header style={{ borderBottom: "1px solid var(--line)" }}>
        <nav aria-label="Case study" className="wrap" style={{ paddingBlock: 14, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Link href="/" className="display" style={{ fontSize: 24, color: "var(--text)", textDecoration: "none" }}>YA<span style={{ color: "var(--accent)" }}>.</span></Link>
          <Link href="/#client-work" style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>← All client work</Link>
        </nav>
      </header>
      <section style={{ background: "radial-gradient(800px 400px at 80% 0%, rgba(106,145,255,.16), transparent 60%), var(--bg)", color: "#fff", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingBlock: "80px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
            <ClientLogo name={c.logo} height={c.logo === "pmoffice" ? 72 : 40} />
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, letterSpacing: ".14em", color: "var(--signal)" }}>CASE STUDY · {c.sector}{c.year ? ` · ${c.year}` : ""}</p>
          </div>
          <h1 className="display" style={{ margin: 0, maxWidth: 860, fontSize: "clamp(38px, 5.4vw, 68px)", lineHeight: 1.05 }}>{c.client}: {c.title}</h1>
          <p style={{ margin: "22px 0 0", maxWidth: 680, fontSize: 19, lineHeight: 1.6, color: "var(--text2)" }}>{c.summary}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginTop: 40 }}>
            {facts.map(([t, v]) => (
              <div key={t} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: 18 }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: ".1em", color: "var(--muted)" }}>{t}</p>
                <p style={{ margin: "6px 0 0", fontSize: 16, fontWeight: 600 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {c.sensitive && (
        <div style={{ background: "var(--cloud)", borderBottom: "1px solid var(--line)" }}>
          <div className="wrap" style={{ paddingBlock: 16, fontSize: 14, lineHeight: 1.5, color: "var(--body)" }}>
            Only public or client-approved information is shared here: no internal architecture, documents, data or confidential figures.
          </div>
        </div>
      )}
      <CaseStepper steps={c.steps} />
      <footer style={{ background: "var(--cloud)", borderTop: "1px solid var(--line)", color: "#fff" }}>
        <div className="wrap" style={{ paddingBlock: 56, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <p className="display" style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em" }}>Next case study: {next.client}, {next.title.toLowerCase()}</p>
          <Link href={`/work/${next.slug}`} className="pill" style={{ minHeight: 52, padding: "0 24px", background: "var(--accent)", color: "#07101f" }}>Read it</Link>
        </div>
      </footer>
    </>
  );
}
