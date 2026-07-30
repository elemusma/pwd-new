import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      `${SITE.url}/sitemap/0.xml`,
      `${SITE.url}/sitemap/1.xml`,
      `${SITE.url}/sitemap/2.xml`,
      `${SITE.url}/sitemap/3.xml`,
      `${SITE.url}/sitemap/4.xml`,
      `${SITE.url}/sitemap/5.xml`,
      `${SITE.url}/sitemap/6.xml`,
    ],
  };
}
