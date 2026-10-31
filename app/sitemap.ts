import type { MetadataRoute } from "next";
import { clients } from "@/lib/content";
const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iaseen.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/cv", ...clients.map((c) => `/work/${c.slug}`)];
  return pages.map((p) => ({ url: base + p }));
}
