import type { MetadataRoute } from "next";
import { contentEn } from "@/lib/content";
import { locales } from "@/lib/i18n";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iaseen.com";
const url = (l: string, p: string) => `${base}${l === "en" ? "" : `/${l}`}${p === "/" ? "" : p}` || base;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = [{ p: "/", priority: 1 }, ...contentEn.clients.map((c) => ({ p: `/work/${c.slug}`, priority: 0.8 }))];
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
