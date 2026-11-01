# Pending review: not published

These lines were part of the case studies but name client-internal choices. They are **not** in the
site code on purpose: anything in `lib/content.ts` is shipped to the browser (the `[...]` convention only
hides text on screen, it does not remove it from the page source or the JavaScript bundle).

Add a line back to the `points` of the matching step in `lib/content.ts` only after the client has approved it.

- **Thales, "The approach":** `Enterprise ecosystem: Align the technical strategy with the organization's cloud and data ecosystem.`
- **DILA, "The approach":** `LLM strategy: Integrate Mistral-based generative AI capabilities into the target architecture.`

## DILA KPIs: published as results (the "confirmed" note was removed on the owner's instruction)

The DILA case study shows the nine KPIs (RAG delivery time −60%, 75% reuse, faithfulness 0.94, cost per request −30%, and five more)
as results, with the note "Figures confirmed with the project team. Evaluation method shared on request."

What is still missing, and would make them much stronger (and is what AI assistants and sceptical readers look for):
- the evaluation method for the RAG metrics: reference question set, its size, the judge used
- the before/after durations behind "10 weeks to 4 weeks" and what "75% reused" counts
- a written source (evaluation report, dashboard export, client-approved slide) to keep next to these numbers

If a figure turns out to be a target rather than a measurement, put it back under a clearly labelled "targets" heading.
Confirm the engagement period before adding it (currently just "2026").

## NOVA usage figure: aligned on 800 employees

The site now says NOVA is deployed to 800 employees (as in the Devoteam article of 25 June 2026), within a group of 10,000+ consultants in 25 countries.
**The downloadable CV (`public/Yassine-Aqejjaj-CV.pdf`) still says "3,000+ NOVA users": replace it with an updated PDF so the two stay consistent.**
