import type { MetadataRoute } from "next";
import { contentEn } from "@/lib/content";
import { locales } from "@/lib/i18n";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iaseen.com";
const url = (l: string, p: string) => `${base}${l === "en" ? "" : `/${l}`}${p === "/" && l !== "en" ? "" : p === "/" ? "" : p}` || base;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...contentEn.clients.map((c) => `/work/${c.slug}`)];
  return pages.flatMap((p) =>
    locales.map((l) => ({
      url: url(l, p) || base,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, url(x, p) || base])) },
    })),
  );
}
