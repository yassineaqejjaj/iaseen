import PageHead from "@/components/PageHead";
import { profile } from "@/lib/content";
export const metadata = { title: "Contact — Yassine Aqejjaj" };
export default function Page() {
  const items = [
    ["Email", profile.email, `mailto:${profile.email}`],
    ["LinkedIn", "Connect", profile.linkedin],
    ["GitHub", `@${profile.githubUser}`, profile.github],
    ["CV (PDF)", "Open and save as PDF", profile.cv],
  ];
  return (
    <>
      <PageHead eyebrow="Contact" title="Let's build something">Hiring for AI leadership, scoping an AI programme, or inspecting the code — reach out.</PageHead>
      <div className="container-x grid gap-4 pb-24 md:grid-cols-2">
        {items.map(([t, v, h]) => (
          <a key={t} href={h} className="card p-6 transition hover:border-electric">
            <p className="eyebrow">{t}</p>
            <p className="display mt-1 text-xl font-bold">{v}</p>
          </a>
        ))}
      </div>
    </>
  );
}
