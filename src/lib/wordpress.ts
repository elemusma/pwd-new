// Shared WordPress REST API helper. Consolidates fetch logic that is
// duplicated four times (blog list/detail, podcast list/detail) in the
// reference precisewolf project into one place.
import { decode } from "he";

const WP_BASE_URL = "https://resources.precisewolf.com/wp-json/wp/v2";

// Polylang mints a separate category term per language, so "blog" and
// "podcast" resolve to a different numeric ID in each locale. Note: WP has
// two categories both displaying as "SEO Español" — id 118 (slug
// seo-espanol, empty) is the one Polylang auto-linked as 117's translation,
// but Spanish posts are actually being filed under id 126 (slug seo-es, a
// renamed former "Uncategorized" term) instead, so that's the one wired up
// here. "Podcast Español" (id 218, slug podcast-espanol) was created
// 2026-07-12 for Spanish-dubbed/subtitled episodes.
export const CATEGORY = {
  blog: { en: 117, es: 126 },
  podcast: { en: 119, es: 218 },
  caseStudies: { en: 244, es: 246 },
} as const;

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  lang?: string;
  translations?: Record<string, number>;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text?: string }>;
  };
}

export interface PostListResult {
  posts: WPPost[];
  totalPages: number;
}

// Polylang's own `?lang=` REST filter doesn't actually filter (verified live:
// identical results for lang=en and lang=es on this install), so filtering by
// the per-locale category ID from CATEGORY above is what actually scopes
// results to a language.
export async function fetchPosts(categoryId: number, page = 1, perPage = 9, search?: string): Promise<PostListResult> {
  try {
    // orderby defaults to date, which buries strong title matches under
    // recent-but-only-tangentially-related posts. relevance only applies
    // (and is only valid) when a search term is present.
    const searchParam = search ? `&search=${encodeURIComponent(search)}&orderby=relevance` : "";
    const res = await fetch(
      `${WP_BASE_URL}/posts?categories=${categoryId}&page=${page}&per_page=${perPage}&_embed${searchParam}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return { posts: [], totalPages: 0 };
    const posts = (await res.json()) as WPPost[];
    const totalPages = Number(res.headers.get("X-WP-TotalPages")) || 1;
    return { posts, totalPages };
  } catch {
    return { posts: [], totalPages: 0 };
  }
}

// Fetches every post in a category (paginating in batches of 100, the WP
// REST API's max per_page), for building the sitemap. Not used on regular
// list pages, which paginate for real.
export async function fetchAllPosts(categoryId: number): Promise<WPPost[]> {
  const all: WPPost[] = [];
  let page = 1;
  let totalPages = 1;
  do {
    const { posts, totalPages: tp } = await fetchPosts(categoryId, page, 100);
    all.push(...posts);
    totalPages = tp;
    page += 1;
  } while (page <= totalPages);
  return all;
}

export async function fetchPostBySlug(categoryId: number, slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${WP_BASE_URL}/posts?slug=${encodeURIComponent(slug)}&categories=${categoryId}&_embed=wp:featuredmedia`,
      { next: { revalidate: 15 } }
    );
    if (!res.ok) return null;
    const posts = (await res.json()) as WPPost[];
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

// Used to resolve the other-language version of a post from its
// `translations` map (e.g. `{ en: 5524, es: 5641 }`), since translated posts
// commonly have a different slug than the original.
export async function fetchPostById(id: number): Promise<WPPost | null> {
  try {
    const res = await fetch(`${WP_BASE_URL}/posts/${id}?_embed=wp:featuredmedia`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as WPPost;
  } catch {
    return null;
  }
}

export function getFeaturedImage(post: WPPost): { url: string; alt: string } | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media?.source_url) return null;
  return { url: media.source_url, alt: media.alt_text || decode(post.title.rendered) };
}

export function decodeExcerpt(html: string, maxLength?: number): string {
  const text = decode(html.replace(/<[^>]*>/g, "")).trim();
  if (!maxLength || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export function formatPostDate(dateString: string, locale = "en"): string {
  return new Date(dateString).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
