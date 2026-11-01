import Link from "next/link";
import { profile } from "@/lib/content";
import HeroPortrait from "./HeroPortrait";
import { getI18n, type Locale } from "@/lib/i18n";

export default function About({ locale }: { locale: Locale }) {
  const { t, c, href } = getI18n(locale);
  const bio = c.bio;
  return (
    <section id="about" style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="wrap sec" style={{ display: "flex", flexWrap: "wrap", gap: "56px 72px", alignItems: "center" }}>
        <div style={{ flex: "0 1 380px", minWidth: 260, width: "100%" }}><HeroPortrait alt={t.about.alt} /></div>
        <div style={{ flex: "1 1 460px", minWidth: 0, maxWidth: 820 }}>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 className="h2">{bio.headline}</h2>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 18, maxWidth: 640 }}>
            {bio.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} style={{ margin: 0, fontSize: 18, lineHeight: 1.7, color: "var(--text2)" }}>{p}</p>
            ))}
          </div>
          <ul style={{ margin: "28px 0 0", padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 8 }}>
            {bio.facts.map((f) => <li key={f} className="chip">{f}</li>)}
          </ul>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href={href("#experience")} className="pill pill-accent" style={{ color: "#07101f" }}>{t.about.journey}</Link>
            <a href={profile.linkedin} className="pill pill-line">{t.about.linkedin}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
