import { SITE } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { CATEGORY, fetchAllPosts, type WPPost } from "@/lib/wordpress";

const BASE_URL = SITE.url;

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/services/web-design",
  "/services/seo",
  "/portfolio",
  "/case-studies",
  "/pricing",
  "/contact",
  "/calendar",
  "/blog",
  "/podcast",
  "/white-paper",
];

// Split into one sitemap per content source: static Next.js pages, the
// "Search Engine Optimization" WP blog category (English), its "SEO Español"
// counterpart, and the "Podcast" / "Podcast Español" categories. Each is
// independently generated at request time, so /sitemap/1.xml (etc.) always
// reflects whatever is currently published in WordPress — no manual updates
// needed when new posts go live.
export const SITEMAP_IDS = {
  pages: 0,
  blogEn: 1,
  blogEs: 2,
  podcastEn: 3,
  podcastEs: 4,
  caseStudiesEn: 5,
  caseStudiesEs: 6,
} as const;

export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "monthly";
  priority: number;
  alternates: { languages: Record<string, string> };
};

function localizedUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

type Section = "blog" | "podcast" | "caseStudies";

// CATEGORY's keys are camelCase, but the case studies route itself is
// "/case-studies" (kebab-case), so the URL path segment needs its own lookup
// rather than reusing the section key directly.
const SECTION_PATH: Record<Section, string> = {
  blog: "blog",
  podcast: "podcast",
  caseStudies: "case-studies",
};

function postAlternates(
  post: WPPost,
  section: Section,
  slugById: Map<number, { locale: string; slug: string }>
) {
  const path = SECTION_PATH[section];
  const selfLocale =
    post.lang && routing.locales.includes(post.lang as (typeof routing.locales)[number]) ? post.lang : routing.defaultLocale;
  const languages: Record<string, string> = {
    [selfLocale]: localizedUrl(selfLocale, `/${path}/${post.slug}`),
  };
  if (post.translations) {
    for (const [loc, id] of Object.entries(post.translations)) {
      if (loc === selfLocale) continue;
      const match = slugById.get(id);
      if (match) languages[loc] = localizedUrl(loc, `/${path}/${match.slug}`);
    }
  }
  return { selfLocale, languages };
}

export async function staticPagesSitemap(): Promise<SitemapEntry[]> {
  return STATIC_ROUTES.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, route),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, route)])),
      },
    }))
  );
}

export async function postSitemap(section: Section, locale: "en" | "es"): Promise<SitemapEntry[]> {
  const path = SECTION_PATH[section];
  const categoryId = CATEGORY[section][locale];
  const otherLocale = locale === "en" ? "es" : "en";
  const otherCategoryId = CATEGORY[section][otherLocale];

  const [posts, otherPosts] =
    categoryId === otherCategoryId
      ? [await fetchAllPosts(categoryId), [] as WPPost[]]
      : await Promise.all([fetchAllPosts(categoryId), fetchAllPosts(otherCategoryId)]);

  const slugById = new Map<number, { locale: string; slug: string }>();
  posts.forEach((p) => slugById.set(p.id, { locale, slug: p.slug }));
  otherPosts.forEach((p) => slugById.set(p.id, { locale: otherLocale, slug: p.slug }));

  return posts.map((post) => {
    const { selfLocale, languages } = postAlternates(post, section, slugById);
    return {
      url: localizedUrl(selfLocale, `/${path}/${post.slug}`),
      lastModified: new Date(post.modified || post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages },
    };
  });
}

export async function sitemapForId(id: number): Promise<SitemapEntry[] | null> {
  switch (id) {
    case SITEMAP_IDS.pages:
      return staticPagesSitemap();
    case SITEMAP_IDS.blogEn:
      return postSitemap("blog", "en");
    case SITEMAP_IDS.blogEs:
      return postSitemap("blog", "es");
    case SITEMAP_IDS.podcastEn:
      return postSitemap("podcast", "en");
    case SITEMAP_IDS.podcastEs:
      return postSitemap("podcast", "es");
    case SITEMAP_IDS.caseStudiesEn:
      return postSitemap("caseStudies", "en");
    case SITEMAP_IDS.caseStudiesEs:
      return postSitemap("caseStudies", "es");
    default:
      return null;
  }
}

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function renderUrlsetXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const alternates = Object.entries(entry.alternates.languages)
        .map(([hreflang, href]) => `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}" />`)
        .join("\n");
      return `<url>
<loc>${escapeXml(entry.url)}</loc>
${alternates}
<lastmod>${entry.lastModified.toISOString()}</lastmod>
<changefreq>${entry.changeFrequency}</changefreq>
<priority>${entry.priority}</priority>
</url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}
