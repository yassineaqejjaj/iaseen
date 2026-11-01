/** Folds secondary content on the home page. The content stays in the HTML (crawlable); only its display is collapsed. */
export default function Disclosure({ label, count, children, id }: { label: string; count?: number; children: React.ReactNode; id?: string }) {
  return (
    <details id={id} className="more">
      <summary>
        <span>{label}</span>
        {count != null && <span className="more-count">{count}</span>}
        <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </summary>
      <div className="more-body">{children}</div>
    </details>
  );
}
