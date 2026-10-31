export default function PageHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="container-x pt-16 pb-10">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display mt-3 text-4xl font-bold md:text-6xl">{title}</h1>
      {children && <p className="mt-4 max-w-2xl text-lg text-muted">{children}</p>}
    </section>
  );
}
