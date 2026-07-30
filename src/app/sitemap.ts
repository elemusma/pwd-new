import type { MetadataRoute } from "next";
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
const SITEMAP_IDS = {
  pages: 0,
  blogEn: 1,
  blogEs: 2,
  podcastEn: 3,
  podcastEs: 4,
  caseStudiesEn: 5,
  caseStudiesEs: 6,
} as const;

export async function generateSitemaps() {
  return Object.values(SITEMAP_IDS).map((id) => ({ id }));
}

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

async function staticPagesSitemap(): Promise<MetadataRoute.Sitemap> {
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

async function postSitemap(section: Section, locale: "en" | "es"): Promise<MetadataRoute.Sitemap> {
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

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  // Next.js's metadata route loader passes `id` through as a string (parsed
  // from the "/sitemap/<id>.xml" URL segment) even though the type says
  // number, so compare against the numeric-string form rather than the raw
  // SITEMAP_IDS values.
  switch (Number(id)) {
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
      return staticPagesSitemap();
  }
}
