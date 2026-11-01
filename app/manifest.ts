import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IASEEN · Yassine Aqejjaj",
    short_name: "IASEEN",
    description: "Head of AI, agentic platforms and product builder.",
    start_url: "/",
    display: "standalone",
    background_color: "#05060A",
    theme_color: "#05060A",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
