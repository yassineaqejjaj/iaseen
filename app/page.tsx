import Link from "next/link";
import Reveal from "@/components/Reveal";
import Visual from "@/components/Visual";
import { profile, caseStudies, flagshipProjects, roadmap } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="dark-section relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="container-x relative py-24 md:py-36">
          <p className="eyebrow">{profile.roles.join(" · ")}</p>
          <h1 className="display mt-5 text-5xl font-bold leading-[1.02] md:text-8xl">
            I don&apos;t just lead AI.
            <br />
            <span className="text-electric">I build it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#c3cce0]">{profile.pitch}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/work" className="btn btn-primary">View my work →</Link>
            <Link href="/experience" className="btn btn-ghost" style={{ color: "#fff", borderColor: "#3a4a6b" }}>Interactive CV</Link>
          </div>
          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-[#26344f] pt-8">
            {profile.stats.map((s) => (
              <div key={s.label}>
                <dt className="display text-4xl font-bold md:text-5xl">{s.value}</dt>
                <dd className="mt-1 text-sm text-[#9aa6bf]">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-x py-20">
        <Reveal>
          <p className="eyebrow">Three proofs</p>
          <h2 className="display mt-2 text-3xl font-bold md:text-4xl">Lead. Deliver. Build.</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Lead", "Vision, organisation, governance and value creation for enterprise AI.", "/expertise", "Expertise"],
            ["Deliver", "AI in production: client programmes, teams, measurable outcomes.", "/work", "Client work"],
            ["Build", "Agentic platforms, evals and products shipped by me.", "/lab", "AI Lab"],
          ].map(([t, d, h, l], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <Link href={h} className="card block h-full p-6 transition hover:border-electric">
                <p className="display text-2xl font-bold">{t}</p>
                <p className="mt-2 text-muted">{d}</p>
                <p className="mt-4 text-sm font-semibold text-electric">{l} →</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-soft py-20">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Client work</p>
              <h2 className="display mt-2 text-3xl font-bold md:text-4xl">In the enterprise</h2>
            </div>
            <Link href="/work" className="text-sm font-semibold text-electric">All case studies →</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {caseStudies.map((c, i) => (
              <Link key={c.slug} href={`/work/${c.slug}`} className="card overflow-hidden transition hover:border-electric">
                <Visual label={c.image} seed={i} />
                <div className="p-5">
                  <p className="font-semibold">{c.client} | {c.title}</p>
                  <p className="mt-1 text-sm text-muted">{c.tags.join(" · ")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section py-20">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">AI Lab</p>
              <h2 className="display mt-2 text-3xl font-bold md:text-4xl">Products I built myself</h2>
            </div>
            <Link href="/lab" className="text-sm font-semibold text-electric">Open the lab →</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {flagshipProjects.map((p, i) => (
              <Link key={p.slug} href={`/lab#${p.slug}`} className="card overflow-hidden transition hover:border-electric">
                <Visual label={p.kind} seed={i + 1} />
                <div className="p-5">
                  {p.flagship && <span className="eyebrow">Flagship</span>}
                  <p className="display text-lg font-bold">{p.name}</p>
                  <p className="text-sm text-muted">{p.tags.join(" · ")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24 text-center">
        <p className="eyebrow">Personal positioning</p>
        <h2 className="display mt-3 text-4xl font-bold md:text-6xl">AI Leader.<br />Product Builder.<br />Entrepreneur.</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">Leading AI at scale. Building products from scratch. Turning technology into business impact.</p>
        <p className="mx-auto mt-10 max-w-xl text-sm text-muted">Every claim on this site links to a proof: an experience, a result, a product, a publication or a demo.</p>
      </section>
    </>
  );
}
