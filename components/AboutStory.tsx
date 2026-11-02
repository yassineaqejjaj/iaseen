import { getI18n, type Locale } from "@/lib/i18n";

const startYear = (period: string) => period.match(/\d{4}/)?.[0] ?? "";

/** The personal story (three blocks in the person's own words), a career timeline and the one-line conviction. Used by /about. */
export default function AboutStory({ locale }: { locale: Locale }) {
  const { t, c } = getI18n(locale);
  const x = t.aboutStory;
  const steps = [...c.roles].reverse().filter((r, i, a) => a.findIndex((q) => q.org === r.org) === i);
  return (
    <section aria-labelledby="story" style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="wrap" style={{ paddingBlock: "72px 88px", maxWidth: 1000 }}>
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2 id="story" className="h2" style={{ marginBottom: 40 }}>{x.title}</h2>

        <div className="story-blocks">
          {x.blocks.map((b) => (
            <article key={b.k} className="story-block">
              <h3 className="story-k">{b.k}</h3>
              <div className="story-p">{b.p.map((p) => <p key={p.slice(0, 28)}>{p}</p>)}</div>
            </article>
          ))}
        </div>

        <figure className="story-quote">
          <blockquote dir="auto">“{x.quote}”</blockquote>
          <figcaption>— {x.quoteBy}</figcaption>
        </figure>

        <h3 className="story-k" style={{ marginTop: 56 }}>{x.timeline}</h3>
        <ol className="story-tl">
          {steps.map((r) => (
            <li key={r.org}>
              <span className="story-tl-y" dir="ltr">{startYear(r.period)}</span>
              <span className="story-tl-o">{r.org}</span>
              <span className="story-tl-t">{r.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
