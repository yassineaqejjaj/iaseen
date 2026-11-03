import { contentEn, type Content } from "./content";
import { contentFr } from "./content.fr";
import { contentAr } from "./content.ar";
import { dictEn, dictFr, dictAr, type Dict } from "./dict";

export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const isLocale = (s: string): s is Locale => (locales as readonly string[]).includes(s);

const dicts: Record<Locale, Dict> = { en: dictEn, fr: dictFr, ar: dictAr };
const contents: Record<Locale, Content> = { en: contentEn, fr: contentFr, ar: contentAr };

export type I18n = {
  locale: Locale; dir: "ltr" | "rtl"; t: Dict; c: Content;
  /** Locale-aware internal link. "#about" -> "/fr#about", "/work/x" -> "/fr/work/x". English has no prefix. */
  href: (p: string) => string;
};

const SECTION_PAGES: Record<string, string> = { "#experience": "/experience", "#client-work": "/work", "#ai-lab": "/lab", "#expertise": "/expertise", "#insights": "/insights", "#contact": "/contact", "#ask": "/ask" };

const cache = new Map<Locale, I18n>();
export function getI18n(locale: Locale): I18n {
  let v = cache.get(locale);
  if (!v) {
    const base = locale === defaultLocale ? "" : `/${locale}`;
    v = {
      locale, dir: locale === "ar" ? "rtl" : "ltr", t: dicts[locale], c: contents[locale],
      // Section anchors that are now pages ("#ai-lab" -> "/lab") open the page itself, at its top. "#about" and "#top" stay anchors on the home page.
      href: (p) => { const q = SECTION_PAGES[p] ?? p; return /^https?:/.test(q) ? q : q.startsWith("#") ? (base || "/") + q : q === "/" ? base || "/" : base + q; },
    };
    cache.set(locale, v);
  }
  return v;
}

/** Path without its locale prefix ("/fr/work/x" -> "/work/x"). */
export const stripLocale = (pathname: string) => pathname.replace(/^\/(en|fr|ar)(?=\/|$)/, "") || "/";
