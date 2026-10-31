# SEO and GEO strategy for iaseen.com

SEO = being found in search engines. GEO (generative engine optimisation) = being understood and cited by AI assistants
(ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews). Neither can be guaranteed; this plan maximises the odds and
makes progress measurable.

## 1. Goals and queries

The site should win **entity queries** (people searching for Yassine) and **expertise queries** (people looking for this profile).

| Intent | Example queries (EN / FR / AR) |
|---|---|
| Entity | "Yassine Aqejjaj", "Yassine Aqejjaj Devoteam", "iaseen" |
| Role | "Head of AI Factory Devoteam", "Head of AI Paris", "directeur IA Paris" |
| Expertise | "sovereign AI platform RAG public sector", "NOVA Suite agentic platform", "IA souveraine administration" |
| Books | "Symbiose collaboration augmentée", "Leading with AI healthcare blueprint" |
| Assistant questions | "Who is Yassine Aqejjaj?", "Who leads AI at Devoteam?", "Experts in agentic AI and RAG in France" |

## 2. What is implemented (in the code)

**Technical SEO**
- One `<h1>` per page, a `<main>` landmark, server-rendered text for every section.
- Per-language `<title>` (about 50 characters) and description (about 155), canonical URLs, `hreflang` for en / fr / ar plus `x-default`.
- Sitemap with the three languages, alternates, priorities and last-modified date; `robots.txt` pointing to it.
- Social card image (1200x630) and Twitter card for every page; case studies have their own title and description.
- Case-study steps, roles and skill proofs are all in the HTML (inactive panels are `hidden`), so crawlers read the full text.
- Proper 404 status for unknown paths; old URLs redirect permanently (`/cv`, `/work/french-prime-ministers-office`).

**GEO**
- **Entity graph (JSON-LD):** `Person` (employer, education, knowledge areas, languages, `sameAs` to LinkedIn and GitHub),
  `WebSite`, `ProfilePage`, four `Book`s linked to the author, `Article` + `BreadcrumbList` per case study, `FAQPage`.
- **Answer-first FAQ** on the home page (6 questions, visible text identical to the structured data), in all three languages.
- **`/llms.txt` and `/llms-full.txt`:** a concise and a full plain-text summary for AI assistants, generated from the same content.
  Unvalidated placeholders and unmeasured targets are deliberately excluded.
- **`robots.txt`** explicitly allows search and AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot,
  PerplexityBot, Google-Extended, Applebot-Extended, CCBot). Remove a name from `app/robots.ts` to opt out.
- **Consistent naming:** "Yassine Aqejjaj", "Head of AI Factory, Devoteam", "NOVA Suite (Nova Agents, Nova Context, Nova Evals / FORGE)" are written the same way everywhere.

## 3. Actions only you can do (highest impact first)

1. **Google Search Console and Bing Webmaster Tools.** Add `iaseen.com`, verify, submit `https://iaseen.com/sitemap.xml`.
   Set `NEXT_PUBLIC_GSC_VERIFICATION` and `NEXT_PUBLIC_BING_VERIFICATION` in Vercel (the code already reads them), redeploy, then verify.
2. **Align every profile with the site.** LinkedIn headline and About: same title, same wording, link to iaseen.com.
   GitHub profile README and the NOVA / TrustRail / MedGuard READMEs: one-line bio, link back to iaseen.com.
   Amazon author page, YouTube and podcast descriptions: link to iaseen.com. Inbound links from real profiles are the strongest entity signal.
3. **Get cited by third parties:** Devoteam team or news page, conference speaker pages (Google Cloud Summit, AICamp), HUB Institute,
   the podcast pages. Ask each to name you "Yassine Aqejjaj, Head of AI Factory at Devoteam" and link to iaseen.com.
4. **Publish measured results** where you can source them (see `docs/pending-review.md`): specific, verifiable numbers are what
   AI assistants quote, and what builds trust.
5. **Plausible analytics** (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) to see which pages and languages bring visitors.

## 4. Content plan (what to write next)

AI assistants and search engines reward pages that answer one precise question with evidence.

- 4 to 6 short articles (600-900 words) under Insights, each tied to a case study or product, for example:
  "How to build a reusable RAG platform for a public administration", "Evaluating RAG: faithfulness, relevancy, precision and recall",
  "Operating model for an AI Factory", "Agentic AI in production: lessons from NOVA Suite".
- Each article: answer in the first two sentences, a headline per question, one table or checklist, sources, date, author box linking to the About section.
- Publish in English first, then French; Arabic for the topics with a regional audience.
- Reuse real material only: case-study facts, evaluation methods you actually used, public talks.

## 5. Measuring progress

- **Search Console:** impressions and clicks for "Yassine Aqejjaj" and expertise queries; indexed pages per language; hreflang errors.
- **AI visibility check, monthly:** ask ChatGPT, Claude, Perplexity and Gemini the questions in section 1, in all three languages.
  Record whether they name you, whether the facts are right, and whether they cite iaseen.com. Fix wrong facts at the source (site, LinkedIn, bios).
- **Structured data:** run the home page and a case study through Google's Rich Results Test and the Schema.org validator after each deploy.
- **Core Web Vitals:** check Search Console or PageSpeed Insights quarterly; keep images optimised and avoid heavy new effects.

## 6. 90-day plan

| Weeks | Focus |
|---|---|
| 1-2 | Deploy, verify Search Console and Bing, submit sitemap, align LinkedIn / GitHub / Amazon / YouTube profiles |
| 3-4 | Add real, sourced KPIs to the DILA and Carrefour case studies; first AI visibility baseline |
| 5-8 | Publish 2 articles (EN + FR); request mentions from Devoteam and one conference page |
| 9-12 | Publish 2 more articles; review Search Console queries; adjust titles and the FAQ to the questions people really ask |

## 7. Guardrails

- Never publish unverified figures to win a snippet: AI assistants repeat what they find, errors included.
- Keep client-confidential details out of the site (also out of `llms-full.txt`).
- When English content changes, update the French and Arabic versions so the three stay consistent.
