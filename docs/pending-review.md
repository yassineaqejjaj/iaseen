# Pending review: not published

These lines were part of the case studies but name client-internal choices. They are **not** in the
site code on purpose: anything in `lib/content.ts` is shipped to the browser (the `[...]` convention only
hides text on screen, it does not remove it from the page source or the JavaScript bundle).

Add a line back to the `points` of the matching step in `lib/content.ts` only after the client has approved it.

- **Thales, "The approach":** `Enterprise ecosystem: Align the technical strategy with the organization's cloud and data ecosystem.`
- **DILA, "The approach":** `LLM strategy: Integrate Mistral-based generative AI capabilities into the target architecture.`

## DILA KPIs: published as targets, not results

The DILA case study shows nine platform **targets** (delivery time −60%, reuse 75%, faithfulness 0.94, cost per request −30%,
and five others), explicitly labelled "Targets: objectives set for the platform, not measured results".

When real measurements exist (evaluation report, client-approved numbers), replace the `targets` block of the DILA "Impact" step with
a `stats` list of the measured values in `lib/content.ts`, `lib/content.fr.ts` and `lib/content.ar.ts`, and state the method
(reference question set and its size). Never remove the "targets" label while the figures are not measured.
Confirm the engagement period before adding it (currently just "2026").
