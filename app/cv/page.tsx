import { profile, roles, pillars } from "@/lib/content";
import PrintButton from "@/components/PrintButton";
export const metadata = { title: "CV — Yassine Aqejjaj" };
export default function Page() {
  return (
    <div className="light-page"><article className="wrap" style={{ maxWidth: 780, paddingBlock: 48 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <h1 className="display" style={{ margin: 0, fontSize: 40 }}>{profile.name}</h1>
          <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>Head of AI · Product Builder · AI Strategist</p>
          <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }}>{profile.email} · {profile.linkedin.replace("https://", "")}</p>
        </div>
        <PrintButton />
      </div>
      <p>AI leader with 13 years of experience building AI products, shaping enterprise AI operating models and leading cross-functional delivery across defence, public services, retail and financial services. Head of AI Factory at Devoteam.</p>
      <h2 className="eyebrow" style={{ marginTop: 32 }}>EXPERIENCE</h2>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 18 }}>
        {roles.map((r) => (
          <li key={r.title + r.period} style={{ breakInside: "avoid" }}>
            <p style={{ margin: 0, fontWeight: 600 }}>{r.title} — {r.org}, {r.place} <span style={{ fontWeight: 400, color: "var(--muted)" }}>({r.period})</span></p>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }}>{r.summary}</p>
            {r.impact && <p style={{ margin: "4px 0 0", fontSize: 14 }}>{r.impact}</p>}
          </li>
        ))}
      </ul>
      <h2 className="eyebrow" style={{ marginTop: 32 }}>EXPERTISE</h2>
      <p style={{ fontSize: 14 }}>{pillars.map((p) => `${p.name}: ${p.skills.join(", ")}`).join(" · ")}</p>
      <h2 className="eyebrow" style={{ marginTop: 32 }}>EDUCATION AND TRAINING</h2>
      <p style={{ fontSize: 14, lineHeight: 1.6 }}>MSc Strategic Marketing, IAE Nice (2015–2016) · MSc Strategic Marketing, Mundiapolis (2014–2015) · Machine Learning, Stanford (2020–2021) · AI Product Management, Duke University / Pratt School of Engineering (2024–2025)</p>
      <h2 className="eyebrow" style={{ marginTop: 32 }}>LANGUAGES</h2>
      <p style={{ fontSize: 14 }}>French (native) · Arabic (native) · English (professional)</p>
    </article></div>
  );
}
