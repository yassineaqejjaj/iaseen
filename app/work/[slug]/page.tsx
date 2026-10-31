import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "@/components/PageHead";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() { return caseStudies.map((c) => ({ slug: c.slug })); }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) notFound();
  const steps: [string, string | null][] = [
    ["Context", c.story.context], ["Problem", c.story.problem], ["My role", c.story.role],
    ["Approach", c.story.approach], ["Solution", c.story.solution], ["Impact", c.story.impact], ["Lessons", c.story.lessons],
  ];
  return (
    <>
      <PageHead eyebrow={`Case study · ${c.client}`} title={c.title}>{c.summary}</PageHead>
      <div className="container-x max-w-3xl pb-24">
        {c.sensitive && (
          <p className="card mb-6 p-4 text-sm text-muted">Defense-related mission: only public or authorised information is shown. No internal architecture, documents, data or confidential figures.</p>
        )}
        <ol className="space-y-6">
          {steps.map(([t, v], i) => (
            <li key={t} className="grid gap-2 border-t border-line pt-6 md:grid-cols-[10rem_1fr]">
              <p className="eyebrow">{String(i + 1).padStart(2, "0")} · {t}</p>
              {v ? <p>{v}</p> : <p className="text-muted italic">Quantified results are shared on request once validated.</p>}
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-2">{c.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
        <Link href="/work" className="mt-10 inline-block text-sm font-semibold text-electric">← All case studies</Link>
      </div>
    </>
  );
}
