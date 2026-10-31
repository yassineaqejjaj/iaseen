import Link from "next/link";
import PageHead from "@/components/PageHead";
import { insights } from "@/lib/content";
export const metadata = { title: "Insights — Yassine Aqejjaj" };
export default function Page() {
  return (
    <>
      <PageHead eyebrow="Insights" title="Ideas, stage, teaching">Books, talks and training: transmitting what I learn building and leading AI.</PageHead>
      <div className="container-x space-y-12 pb-24">
        {Object.entries(insights).map(([cat, items]) => (
          <section key={cat}>
            <h2 className="display text-2xl font-bold">{cat}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {items.map((i) => {
                const ext = i.url.startsWith("http");
                const inner = (
                  <>
                    <p className="eyebrow">{i.kind}</p>
                    <p className="mt-1 font-semibold">{i.title}</p>
                    <p className="mt-1 text-sm text-muted">{i.desc}</p>
                  </>
                );
                return ext
                  ? <a key={i.title} href={i.url} target="_blank" rel="noopener noreferrer" className="card p-5 transition hover:border-electric">{inner}</a>
                  : <Link key={i.title} href={i.url} className="card p-5 transition hover:border-electric">{inner}</Link>;
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
