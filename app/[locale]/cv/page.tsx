import { profile } from "@/lib/content";
import { getI18n, type Locale } from "@/lib/i18n";
import PrintButton from "@/components/PrintButton";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: `CV — Yassine Aqejjaj`, alternates: { languages: { en: "/cv", fr: "/fr/cv", ar: "/ar/cv" } }, robots: { index: locale === "en" } };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const { t, c } = getI18n(locale);
  return (
    <div className="light-page">
      <article className="wrap" style={{ maxWidth: 780, paddingBlock: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 className="display" style={{ margin: 0, fontSize: 40 }}>{profile.name}</h1>
            <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>{t.cv.subtitle}</p>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }} dir="ltr">{profile.email} · {profile.linkedin.replace("https://", "")}</p>
          </div>
          <PrintButton label={t.cv.save} />
        </div>
        <p>{t.cv.summary}</p>
        <h2 className="eyebrow" style={{ marginTop: 32 }}>{t.cv.experience}</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 18 }}>
          {c.roles.map((r) => (
            <li key={r.org + r.period} style={{ breakInside: "avoid" }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{r.title} — {r.org}, {r.place} <span style={{ fontWeight: 400, color: "var(--muted)" }}>({r.period})</span></p>
              <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }}>{r.summary}</p>
              {r.impact && <p style={{ margin: "4px 0 0", fontSize: 14 }}>{r.impact}</p>}
            </li>
          ))}
        </ul>
        <h2 className="eyebrow" style={{ marginTop: 32 }}>{t.cv.expertise}</h2>
        <p style={{ fontSize: 14 }}>{c.pillars.map((p) => `${p.name}: ${p.skills.map((s) => t.expertise.skills[s] ?? s).join(", ")}`).join(" · ")}</p>
        <h2 className="eyebrow" style={{ marginTop: 32 }}>{t.cv.education}</h2>
        <p style={{ fontSize: 14, lineHeight: 1.6 }}>{t.cv.eduText}</p>
        <h2 className="eyebrow" style={{ marginTop: 32 }}>{t.cv.languages}</h2>
        <p style={{ fontSize: 14 }}>{t.cv.langText}</p>
      </article>
    </div>
  );
}
