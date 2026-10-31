import { profile, experiences, skills } from "@/lib/content";
import PrintButton from "@/components/PrintButton";
export const metadata = { title: "CV — Yassine Aqejjaj" };
export default function Page() {
  return (
    <article className="container-x max-w-3xl py-12">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="display text-4xl font-bold">{profile.name}</h1>
          <p className="mt-1 text-muted">{profile.roles.join(" · ")}</p>
          <p className="mt-1 text-sm text-muted">{profile.email} · {profile.github.replace("https://", "")}</p>
        </div>
        <PrintButton />
      </div>
      <p>{profile.pitch}</p>
      <h2 className="eyebrow mt-8">Experience</h2>
      <ul className="mt-3 space-y-5">
        {experiences.map((e) => (
          <li key={e.id} className="break-inside-avoid">
            <p className="font-semibold">{e.title} — {e.org} <span className="font-normal text-muted">({e.period})</span></p>
            <p className="text-sm text-muted">{e.summary}</p>
          </li>
        ))}
      </ul>
      <h2 className="eyebrow mt-8">Expertise</h2>
      <p className="mt-3 text-sm">{skills.map((s) => s.name).join(" · ")}</p>
      <p className="mt-8 text-xs text-muted">Generated from the validated content of this site.</p>
    </article>
  );
}
