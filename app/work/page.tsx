import Link from "next/link";
import PageHead from "@/components/PageHead";
import Visual from "@/components/Visual";
import { caseStudies } from "@/lib/content";
export const metadata = { title: "Client Work — Yassine Aqejjaj" };
export default function Page() {
  return (
    <>
      <PageHead eyebrow="Client Work" title="Real impact, real environments">
        Context → Problem → My role → Approach → Solution → Impact → Lessons. Sensitive missions only show public or authorised information.
      </PageHead>
      <div className="container-x grid gap-4 pb-24 md:grid-cols-3">
        {caseStudies.map((c, i) => (
          <Link key={c.slug} href={`/work/${c.slug}`} className="card overflow-hidden transition hover:border-electric">
            <Visual label={c.image} seed={i} />
            <div className="p-5">
              <p className="display text-xl font-bold">{c.client} | {c.title}</p>
              <p className="mt-2 text-sm text-muted">{c.summary}</p>
              <p className="mt-3 text-xs text-electric">{c.tags.join(" · ")}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
