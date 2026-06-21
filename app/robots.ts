import type { MetadataRoute } from "next";

// Genera /robots.txt automáticamente: permite a todos los buscadores indexar
// el sitio y les indica dónde está el sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://aejhernandez.dev/sitemap.xml",
  };
}
