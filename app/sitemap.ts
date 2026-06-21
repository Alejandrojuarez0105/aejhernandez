import type { MetadataRoute } from "next";

// Genera /sitemap.xml automáticamente. Es una sola página (SPA de scroll),
// así que solo listamos la home como URL canónica.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aejhernandez.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
