import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { decode } from "he";
import Reveal from "@/components/Reveal";
import SetAltLocalePath from "@/components/SetAltLocalePath";
import ProseContent from "@/components/ProseContent";
import WhitePaperCard from "@/components/WhitePaperCard";
import ShareCard from "@/components/ShareCard";
import { fetchPostBySlug, fetchPostById, getFeaturedImage, decodeExcerpt, formatPostDate, CATEGORY } from "@/lib/wordpress";
import { SITE } from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await fetchPostBySlug(CATEGORY.podcast[locale as Locale], slug);
  if (!post) {
    const t = await getTranslations({ locale, namespace: "podcastPage" });
    return { title: t("notFound") };
  }

  const title = decode(post.title.rendered);
  const description = decodeExcerpt(post.excerpt.rendered, 160);
  const image = getFeaturedImage(post);

  const localizedUrl = (l: string, postSlug: string) =>
    `${SITE.url}${l === routing.defaultLocale ? "" : `/${l}`}/podcast/${postSlug}`;

  const languages: Record<string, string> = { [locale]: localizedUrl(locale, slug) };
  const otherLocale = routing.locales.find((l) => l !== locale);
  const otherLocalePostId = otherLocale ? post.translations?.[otherLocale] : undefined;
  if (otherLocale && otherLocalePostId && otherLocalePostId !== post.id) {
    const altPost = await fetchPostById(otherLocalePostId);
    if (altPost) languages[otherLocale] = localizedUrl(otherLocale, altPost.slug);
  }

  return {
    title,
    description,
    alternates: { canonical: localizedUrl(locale, slug), languages },
    openGraph: {
      title,
      description,
      type: "article",
      images: image ? [{ url: image.url }] : undefined,
    },
  };
}

export default async function PodcastEpisodePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await fetchPostBySlug(CATEGORY.podcast[locale as Locale], slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "podcastPage" });

  const otherLocale = routing.locales.find((l) => l !== locale);
  const otherLocalePostId = otherLocale ? post.translations?.[otherLocale] : undefined;
  const altPost = otherLocalePostId && otherLocalePostId !== post.id ? await fetchPostById(otherLocalePostId) : null;
  // Fall back to the section listing (always valid in both locales) rather
  // than reusing this post's slug — WordPress translations don't share
  // slugs, so guessing "/podcast/<this-english-slug>" would 404.
  const altPath = altPost ? `/podcast/${altPost.slug}` : "/podcast";

  const title = decode(post.title.rendered);
  const canonicalUrl = `${SITE.url}${locale === routing.defaultLocale ? "" : `/${locale}`}/podcast/${slug}`;

  return (
    <>
      <SetAltLocalePath path={altPath} />
      <section className="container-px pt-24 pb-8">
        <Reveal className="max-w-3xl">
          <Link href="/podcast" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors">
            <ArrowLeft size={15} />
            {t("backToPodcast")}
          </Link>
          <p className="mt-6 text-xs uppercase tracking-widest text-fg-dim">{formatPostDate(post.date, locale)}</p>
          <h1 className="font-display text-balance mt-4 text-2xl leading-[1.15] text-fg sm:text-3xl md:text-4xl">
            {title}
          </h1>
        </Reveal>
      </section>

      <section className="container-px pb-24 md:pb-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
          <Reveal>
            <ProseContent
              html={post.content.rendered}
              className="prose prose-invert max-w-3xl prose-headings:font-display prose-a:text-accent prose-a:no-underline hover:prose-a:underline [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:rounded-2xl [&_iframe]:border [&_iframe]:border-card-border"
            />
          </Reveal>

          {/* All current episodes are in the expert-witness/attorney niche, so
              this shows on every episode for now. Once the podcast branches
              into other industries (starting around episode 29 per Ted),
              this will need to become conditional like the blog's
              WHITE_PAPER_BLOG_SLUGS allowlist. */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-6">
              <WhitePaperCard
                imageAlt={t("whitePaperCta.imageAlt")}
                body={t("whitePaperCta.body")}
                buttonLabel={t("whitePaperCta.button")}
              />
              <ShareCard url={canonicalUrl} title={title} label={t("shareEpisode")} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
