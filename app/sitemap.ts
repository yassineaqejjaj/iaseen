import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content";
const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://iaseen.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/experience", "/work", "/lab", "/expertise", "/insights", "/contact", "/cv", ...caseStudies.map((c) => `/work/${c.slug}`)];
  return pages.map((p) => ({ url: base + p }));
}
