import PageHead from "@/components/PageHead";
import Visual from "@/components/Visual";
import { flagshipProjects, profile } from "@/lib/content";
export const metadata = { title: "AI Lab — Yassine Aqejjaj" };
export const revalidate = 3600;

type Repo = { id: number; name: string; description: string | null; html_url: string; language: string | null; pushed_at: string; fork: boolean; stargazers_count: number };

async function getRepos(): Promise<Repo[]> {
  try {
    const r = await fetch(`https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=pushed`, { next: { revalidate: 3600 } });
    if (!r.ok) return [];
    return ((await r.json()) as Repo[]).filter((x) => !x.fork);
  } catch { return []; }
}

export default async function Page() {
  const repos = await getRepos();
  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
  return (
    <>
      <PageHead eyebrow="AI Lab" title="Products, not repositories">
        Personal products and prototypes, kept separate from client work. Flagship order is editorial; the repository list below syncs from GitHub.
      </PageHead>
      <section className="container-x grid gap-4 pb-16 md:grid-cols-2">
        {flagshipProjects.map((p, i) => {
          const repo = p.repo ? byName.get(p.repo.toLowerCase()) : undefined;
          return (
            <article key={p.slug} id={p.slug} className="card scroll-mt-24 overflow-hidden">
              <Visual label={p.kind} seed={i + 1} />
              <div className="p-6">
                {p.flagship && <p className="eyebrow">Flagship project</p>}
                <h2 className="display text-2xl font-bold">{p.name}</h2>
                <p className="mt-2 text-muted">{p.pitch}</p>
                <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                {repo && <a href={repo.html_url} className="mt-4 inline-block text-sm font-semibold text-electric">GitHub{repo.language ? ` · ${repo.language}` : ""} →</a>}
              </div>
            </article>
          );
        })}
      </section>
      <section className="dark-section py-16">
        <div className="container-x">
          <p className="eyebrow">Live from GitHub</p>
          <h2 className="display mt-2 text-3xl font-bold">Public repositories</h2>
          {repos.length === 0 ? (
            <p className="mt-6 text-muted">Repositories unavailable right now. <a className="text-electric" href={profile.github}>Open GitHub →</a></p>
          ) : (
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {repos.map((r) => (
                <li key={r.id}>
                  <a href={r.html_url} className="card block p-4 transition hover:border-electric">
                    <p className="font-semibold">{r.name}</p>
                    <p className="mt-1 text-sm text-muted">{r.description ?? "—"}</p>
                    <p className="mt-2 text-xs text-muted">{r.language ?? "n/a"} · updated {new Date(r.pushed_at).toLocaleDateString("en-GB")}</p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
