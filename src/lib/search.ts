import { decode } from "he";
import { getTranslations } from "next-intl/server";
import { CATEGORY, fetchPosts, decodeExcerpt } from "@/lib/wordpress";
import type { Locale } from "@/i18n/routing";

export type SearchResult = {
  title: string;
  href: string;
  type: "page" | "blog" | "podcast" | "caseStudy";
  excerpt?: string;
};

// Every static (non-WordPress) page, keyed to its nav.json translation for
// the display title. Kept in sync manually — same tradeoff as sitemap.ts's
// STATIC_ROUTES, since there's no single source of truth for the site's
// static route list.
const STATIC_PAGES: { path: string; navKey: string }[] = [
  { path: "/", navKey: "home" },
  { path: "/about", navKey: "about" },
  { path: "/services", navKey: "services" },
  { path: "/services/web-design", navKey: "webDesign" },
  { path: "/services/seo", navKey: "seo" },
  { path: "/portfolio", navKey: "portfolio" },
  { path: "/case-studies", navKey: "caseStudies" },
  { path: "/pricing", navKey: "pricing" },
  { path: "/blog", navKey: "blog" },
  { path: "/podcast", navKey: "podcast" },
  { path: "/white-paper", navKey: "whitePaper" },
  { path: "/contact", navKey: "contact" },
  { path: "/calendar", navKey: "calendar" },
];

async function searchStaticPages(locale: string, query: string): Promise<SearchResult[]> {
  const t = await getTranslations({ locale, namespace: "nav" });
  const needle = query.toLowerCase();
  return STATIC_PAGES.filter(({ navKey }) => t(navKey).toLowerCase().includes(needle)).map(({ path, navKey }) => ({
    title: t(navKey),
    href: path,
    type: "page" as const,
  }));
}

async function searchSection(
  categoryId: number,
  query: string,
  path: string,
  type: "blog" | "podcast" | "caseStudy"
): Promise<SearchResult[]> {
  const { posts } = await fetchPosts(categoryId, 1, 8, query);
  return posts.map((post) => ({
    title: decode(post.title.rendered),
    href: `/${path}/${post.slug}`,
    type,
    excerpt: decodeExcerpt(post.excerpt.rendered, 140),
  }));
}

export async function searchSite(query: string, locale: Locale): Promise<SearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const [pages, blog, podcast, caseStudies] = await Promise.all([
    searchStaticPages(locale, trimmed),
    searchSection(CATEGORY.blog[locale], trimmed, "blog", "blog"),
    searchSection(CATEGORY.podcast[locale], trimmed, "podcast", "podcast"),
    searchSection(CATEGORY.caseStudies[locale], trimmed, "case-studies", "caseStudy"),
  ]);

  return [...pages, ...blog, ...podcast, ...caseStudies];
}
