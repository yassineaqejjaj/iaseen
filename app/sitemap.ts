import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { contentEn } from "@/lib/content";
import { locales } from "@/lib/i18n";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iaseen.com";
const url = (l: string, p: string) => `${base}${l === "en" ? "" : `/${l}`}${p === "/" ? "" : p}` || base;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = [{ p: "/", priority: 1 }, { p: "/nova", priority: 0.9 }, { p: "/blog", priority: 0.8 }, { p: "/speaking", priority: 0.7 }, { p: "/work", priority: 0.8 }, { p: "/lab", priority: 0.8 }, { p: "/about", priority: 0.8 }, { p: "/experience", priority: 0.8 }, { p: "/expertise", priority: 0.7 }, { p: "/insights", priority: 0.7 }, { p: "/ask", priority: 0.5 }, { p: "/contact", priority: 0.6 }, { p: "/resources/ai-factory-guide", priority: 0.8 }, { p: "/resources/agentic-transformation", priority: 0.8 }, { p: "/privacy", priority: 0.3 }, ...posts.map((x) => ({ p: `/blog/${x.slug}`, priority: 0.7 })), ...contentEn.clients.map((c) => ({ p: `/work/${c.slug}`, priority: 0.8 }))];
  return pages.flatMap(({ p, priority }) =>
    locales.map((l) => ({
      url: url(l, p) || base,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: Object.fromEntries([...locales.map((x) => [x, url(x, p) || base]), ["x-default", url("en", p) || base]]) },
    })),
  );
}
