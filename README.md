# iaseen: Personal AI Portfolio

Portfolio of Yassine Aqejjaj, Head of AI. Live at [iaseen.com](https://iaseen.com).

> I don't just lead AI. I build it.

The site shows three things, each backed by a proof: defining an AI strategy (**Lead**), putting AI into production (**Deliver**) and building products myself (**Build**).

## What's on the page

A single-page site, plus one page per client case study.

| Section | Content |
|---|---|
| Hero | Dark-glass sphere that splits into Lead / Build / Think, key figures, client and partner logos |
| Lead · Deliver · Build | Tabbed panel linking each claim to its proof |
| Experience | Interactive CV with Leadership / AI Product / Technical lenses |
| Client Work | Case studies, opened at `/work/[slug]` as a seven-step path |
| AI Lab | NOVA Suite explorer and filterable product grid |
| Expertise | Skills tied to roles, missions and products (no skill bars) |
| Insights | Books, podcast, teaching |
| Ask My AI | Assistant that answers only from the validated content, with sources |
| Contact | Email, CV, LinkedIn, GitHub |

Other routes: `/nova` (NOVA Suite product page: architecture, real screens, public code), `/sitemap.xml`, `/robots.txt`. The CV is a static PDF, `public/Yassine-Aqejjaj-CV.pdf` (English); `/cv`, `/fr/cv` and `/ar/cv` redirect to it. It contains a phone number and a personal email: replace the file to change them.

A "I'm here as a" selector (Recruiter, Client / Partner, Builder / Founder) reorders the sections without extra pages.

## Languages

English (`/`), French (`/fr`) and Arabic (`/ar`, right-to-left). Every page and case study exists in all three.

- **UI strings:** [`lib/dict.ts`](lib/dict.ts), one dictionary per language.
- **Content:** English is the source in [`lib/content.ts`](lib/content.ts). [`lib/content.fr.ts`](lib/content.fr.ts) and [`lib/content.ar.ts`](lib/content.ar.ts) override only the text, so slugs, links and figures stay in one place. When you change an English text, update the two translations.
- **Routing:** `proxy.ts` serves English at the root and leaves `/fr`, `/ar` as they are. The language switcher keeps you on the same page.
- **Arabic:** the layout is mirrored (`dir="rtl"`), uses Noto Sans Arabic and disables letter-spacing, which breaks Arabic joins. Latin names and logos stay left-to-right.
- **Ask My AI** answers in the visitor's language, from that language's content.
- **SEO:** each page declares its alternates (`hreflang`) and the sitemap lists all three languages.

Translations were written by Claude: have a native speaker review the French and, above all, the Arabic before relying on them.

## Hero story

The home page opens on **IASEEN · The Intelligence Universe**: a dark-glass sphere with a luminous rim (three.js through React Three Fiber, one small shader, no HDR file) that splits into three objects, LEAD, BUILD and THINK, as you scroll; each links to its section, with a fly-in transition toward the chosen object. Pointer parallax and magnetic buttons add depth.

- **Progressive:** the 3D code (about 0.9 MB, uncompressed) is a separate chunk, downloaded on desktop when the browser is idle. The headline, brand and CTAs are plain server-rendered HTML, so the first paint and SEO do not wait for it.
- **Fallbacks:** the same scroll story runs in pure CSS (a gradient orb that splits) when WebGL is missing. On small screens or with `prefers-reduced-motion`, there is no scroll story and no 3D: the hero is a normal static block with the three entries listed under it.
- **Code:** `components/HeroStory.tsx` (layout, scroll progress, fallback), `components/HeroScene.tsx` (3D), `lib/heroProgress.ts` (scroll and pointer values read every frame), `components/MagneticCursor.tsx`.
- **Executive mode** flattens the hero and removes the scroll story.

## Interactions

- **Executive mode** (header toggle): a compact, motion-free CV view of the same content, saved in the browser. The server HTML is always the full experience, so crawlers and AI assistants never see the reduced version.
- **`⌘K` / `Ctrl K` command palette**: jump to any section or case study, download the CV, switch mode, or ask a question. It answers only from the validated content (the same grounded search as Ask My AI) and is downloaded only the first time it is opened.
- **Interludes**: four short pauses between sections (one sentence, then three figures taken from the content). Hidden in executive mode.
- **Ask My AI acts on the page**: answers carry buttons that open a case study, filter the AI Lab, highlight a skill or select a node of the constellation (`lib/actions.ts`, event `iaseen-act`). The same buttons appear in the command palette.
- **Guided tours**: an answer can start a step-by-step tour (leadership, building, delivery, RAG) that moves the page at each step (`lib/tours.ts`, `components/GuidedTour.tsx`; captions are in `t.tours`).
- **Career constellation**: an interactive graph linking roles, skills, products and client missions, built from the `proof` data in `lib/content.ts`. Selecting a node lights the whole chain (role, skills, products) and lists it as clickable chips, with the GitHub or site link for products. On small screens it is replaced by the list below it.
- Secondary content on the home page (more products, talks and articles, quick answers) is folded in `<details>` (`components/Disclosure.tsx`): it stays in the HTML for crawlers.
- Inactive tab panels (roles, case-study steps, skill proofs) carry `data-inactive` rather than `hidden`: they stay in the HTML for crawlers but are not displayed.

## SEO and GEO

Titles, canonical and `hreflang`, JSON-LD entity graph (Person, WebSite, ProfilePage, Books, FAQPage, Article), a visible FAQ,
`/llms.txt` and `/llms-full.txt` for AI assistants, a sitemap in three languages and a `robots.txt` that welcomes search and AI crawlers.
The full strategy, the actions only you can do (Search Console, profile alignment, third-party mentions) and the measurement plan are in
[`docs/seo-geo-strategy.md`](docs/seo-geo-strategy.md). Optional env vars: `NEXT_PUBLIC_GSC_VERIFICATION`, `NEXT_PUBLIC_BING_VERIFICATION`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · [Motion](https://motion.dev) · [simple-icons](https://simpleicons.org) (Carrefour symbol)

No database and no backend: all content is static and the assistant runs in the browser.

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:3100. If that port is taken, change `-p 3100` in the `dev` and `start` scripts of `package.json`.

```bash
npm run build   # production build
npm start       # serve the build
```

## Project structure

```
app/
  page.tsx                  home: all sections
  work/[slug]/page.tsx      case study page
  cv/page.tsx               printable CV
  layout.tsx                fonts, metadata, analytics
  globals.css               design tokens, surfaces, visitor-path ordering
components/                 interactive sections and shared UI
lib/
  content.ts                single source of truth for all content
  ask.ts                    retrieval behind Ask My AI
  logos.ts                  client logo manifest
public/logos/               client logo files
```

## Editing content

Everything shown on the site lives in [`lib/content.ts`](lib/content.ts): roles, client case studies, products, skills and proofs, books, and the suggested Ask My AI questions.

- **Placeholders:** any string starting with `[` is treated as not yet validated and is not displayed (see `real()`). Replace it with real text to publish it.
- **Confidential text never goes in this file.** `real()` only hides text on screen: everything in `lib/content.ts` is still shipped in the page source and the JavaScript bundle. Lines awaiting client approval live in [`docs/pending-review.md`](docs/pending-review.md) and are added back only once approved.
- **Metrics:** only figures from the CV or approved by the client belong here. Case-study steps with no content are hidden.
- **Sensitive missions:** for defence and public-sector work, publish only public or client-approved information: no internal architecture, documents, data or confidential figures. Case studies flagged `sensitive: true` show a confidentiality notice.
- **Ask My AI:** it can only answer from `content.ts`, so updating content updates the assistant. Answers are retrieval by keywords, not a language model.

## Client logos

`ClientLogo` displays each mark on a transparent background.

- Add a file to `public/logos/` and register it in `LOGO_FILES` in [`lib/logos.ts`](lib/logos.ts) as `key: "svg"` or `key: "png"`.
- Logos are shown as white silhouettes on the dark theme. Add the key to `LOGO_COLOUR` to keep a mark's own colours.
- Carrefour is the simple-icons symbol with the name set in text, because no free full logo file exists. Drop `public/logos/carrefour.svg` and register it to use the official one.
- Devoteam uses `devoteam-light.png`: the original disc, with the lettering lightened for dark backgrounds.

Client and employer logos are trademarks of their owners and are shown only to name the organisations the work was done for.

## Design

- **Direction:** dark editorial, with glass surfaces reserved for interactive elements (proof panel, visitor selector, assistant, NOVA module).
- **Identity:** IASEEN Constellation (an eye drawn by connected nodes). Logo files in `public/brand/`, rules and tokens in [`docs/brand.md`](docs/brand.md).
- **Palette:** Void `#05060A`, Deep `#0B0E17`, Chrome `#C9CED8`, Light `#F2F4F8`, Electric `#4C6FF0` (the only accent), Glow `#7B96FF`.
- **Type:** Space Grotesk (titles, wordmark), Inter (text), JetBrains Mono (labels).
- **Motion:** hero title reveal, a node-graph object that follows the pointer and scroll, card hover reflections. All motion respects `prefers-reduced-motion`, and the node graph stays static on small screens.
- **CV page:** a light theme, so it prints cleanly.

## Environment variables

Both are optional.

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used by the sitemap and Open Graph tags. Defaults to `https://iaseen.com`. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables Plausible analytics for that domain. |

## Deployment

The site is deployed on Vercel.

```bash
npx vercel --prod
```

Add `--force` to rebuild without the cache. Set `NEXT_PUBLIC_SITE_URL` to `https://iaseen.com` in the Vercel project settings and attach the domain under Settings, then Domains.

The home page fetches the public repository count from the GitHub API and revalidates it hourly. If the request fails, that figure is simply left out.
