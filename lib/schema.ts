import { profile, real } from "./content";
import { posts, postBySlug } from "./blog";
import { getI18n, type Locale } from "./i18n";

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iaseen.com";
const PERSON_ID = `${SITE}/#yassine-aqejjaj`;
const pageUrl = (l: Locale, p = "") => `${SITE}${l === "en" ? "" : `/${l}`}${p}`;

/** Serialise JSON-LD safely for an inline <script>. */
export const ld = (o: unknown) => JSON.stringify(o).replace(/</g, "\\u003c");

const person = (l: Locale) => {
  const { t, c } = getI18n(l);
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Yassine Aqejjaj",
    jobTitle: t.meta.jobTitle,
    description: c.bio.paragraphs[0],
    url: SITE,
    image: `${SITE}/yassine-aqejjaj.webp`,
    worksFor: { "@type": "Organization", name: "Devoteam" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "IAE Nice" },
      { "@type": "CollegeOrUniversity", name: "Mundiapolis" },
    ],
    knowsAbout: ["AI strategy", "Agentic AI", "Retrieval-augmented generation (RAG)", "LLM evaluation", "AI operating models", "AI product management", "MLOps", "Sovereign AI"],
    knowsLanguage: ["fr", "ar", "en"],
    homeLocation: { "@type": "Place", name: "Paris, France" },
    sameAs: [profile.linkedin, profile.github],
  };
};

const website = (l: Locale) => ({
  "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: "Yassine Aqejjaj", inLanguage: l, publisher: { "@id": PERSON_ID },
});

/** Entity graph shared by every page. */
export const siteGraph = (l: Locale) => ({ "@context": "https://schema.org", "@graph": [person(l), website(l)] });

/** Home page: profile, books and the FAQ that is visible on the page. */
export const homeGraph = (l: Locale) => {
  const { c } = getI18n(l);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "ProfilePage", "@id": `${pageUrl(l)}#profile`, url: pageUrl(l) || SITE, inLanguage: l, mainEntity: { "@id": PERSON_ID }, isPartOf: { "@id": `${SITE}/#website` } },
      ...c.books.map((b) => ({ "@type": "Book", name: b.title, description: b.theme, url: b.url, author: { "@id": PERSON_ID } })),
      ...c.articles.map((a) => ({ "@type": "Article", headline: a.title, url: a.url, datePublished: a.date, inLanguage: a.lang, author: { "@id": PERSON_ID }, publisher: { "@type": "Organization", name: "Devoteam" } })),
      {
        "@type": "FAQPage", inLanguage: l,
        mainEntity: c.qa.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
      },
    ],
  };
};

/** Case study page: article + breadcrumb. */
export const caseGraph = (l: Locale, slug: string) => {
  const { c, t } = getI18n(l);
  const cl = c.clients.find((x) => x.slug === slug);
  if (!cl) return null;
  const url = pageUrl(l, `/work/${slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article", "@id": `${url}#article`, headline: `${cl.client}: ${cl.title}`, description: cl.summary, inLanguage: l, url,
        author: { "@id": PERSON_ID }, publisher: { "@id": PERSON_ID }, about: cl.tags.filter(real), mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Yassine Aqejjaj", item: pageUrl(l) || SITE },
          { "@type": "ListItem", position: 2, name: t.nav.work, item: `${pageUrl(l)}#client-work` },
          { "@type": "ListItem", position: 3, name: cl.client, item: url },
        ],
      },
    ],
  };
};

export const novaGraph = (l: Locale) => {
  const { t, c } = getI18n(l);
  const n = t.novaPage;
  const url = pageUrl(l, "/nova");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication", "@id": `${url}#app`, name: "NOVA Suite", applicationCategory: "BusinessApplication", operatingSystem: "Web",
        description: n.metaDescription, inLanguage: l, url, creator: { "@id": PERSON_ID },
        sameAs: [`${profile.github}/NOVA`, `${profile.github}/ORBIT`, `${profile.github}/FORGE`],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Yassine Aqejjaj", item: pageUrl(l) || SITE },
          { "@type": "ListItem", position: 2, name: t.nav.lab, item: `${pageUrl(l)}#ai-lab` },
          { "@type": "ListItem", position: 3, name: "NOVA Suite", item: url },
        ],
      },
    ],
  };
};

export const blogGraph = (l: Locale) => {
  const { t } = getI18n(l);
  const url = pageUrl(l, "/blog");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog", "@id": `${url}#blog`, name: t.blog.title, description: t.blog.metaDescription, inLanguage: l, url, author: { "@id": PERSON_ID },
        blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p[l].title, url: pageUrl(l, `/blog/${p.slug}`), datePublished: p.date })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Yassine Aqejjaj", item: pageUrl(l) || SITE },
          { "@type": "ListItem", position: 2, name: t.blog.nav, item: url },
        ],
      },
    ],
  };
};

export const postGraph = (l: Locale, slug: string) => {
  const { t } = getI18n(l);
  const post = postBySlug(slug);
  if (!post) return null;
  const x = post[l];
  const url = pageUrl(l, `/blog/${slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting", "@id": `${url}#post`, headline: x.title, description: x.dek, inLanguage: l, url, datePublished: post.date, dateModified: post.date,
        author: { "@id": PERSON_ID }, publisher: { "@id": PERSON_ID }, mainEntityOfPage: url, keywords: post.tags.join(", "),
        citation: post.repos.map((r) => r.url),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Yassine Aqejjaj", item: pageUrl(l) || SITE },
          { "@type": "ListItem", position: 2, name: t.blog.nav, item: pageUrl(l, "/blog") },
          { "@type": "ListItem", position: 3, name: x.title, item: url },
        ],
      },
    ],
  };
};
