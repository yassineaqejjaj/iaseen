"use client";
import { fmtKpi, KPIS, topKpis } from "@/lib/kpis";
import { useI18n } from "./LocaleProvider";

/** The three indicators shown on a project card. */
export function KpiRow({ id, compact = false }: { id: string; compact?: boolean }) {
  const { locale } = useI18n();
  const list = topKpis(id);
  if (!list.length) return null;
  return (
    <ul className="kpis" data-compact={compact || undefined} aria-label="KPI">
      {list.map((x) => (
        <li key={x.l.en}>
          <span className="kpi-v" dir="ltr">{fmtKpi(x.v, locale)}</span>
          <span className="kpi-l">{x.l[locale]}</span>
        </li>
      ))}
    </ul>
  );
}

/** The full table, with a note on how to read it. */
export function KpiTable({ id, title }: { id: string; title?: string }) {
  const { t, locale } = useI18n();
  const s = KPIS[id];
  if (!s) return null;
  return (
    <div className="kpi-table">
      {title && <h3 className="kpi-title">{title}</h3>}
      <div className="prose-table">
        <table>
          <thead><tr><th scope="col">{t.kpi.indicator}</th><th scope="col">{t.kpi.value}</th></tr></thead>
          <tbody>
            {s.all.map((x) => (
              <tr key={x.l.en}><th scope="row">{x.l[locale]}</th><td dir="ltr" style={{ fontWeight: 600, color: "var(--text)" }}>{fmtKpi(x.v, locale)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="kpi-note">{t.kpi.note}</p>
    </div>
  );
}
