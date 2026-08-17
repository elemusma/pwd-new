import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { decode } from "he";
import Reveal from "@/components/Reveal";
import TableOfContents from "@/components/TableOfContents";
import BlogAuthorSidebar from "@/components/BlogAuthorSidebar";
import SetAltLocalePath from "@/components/SetAltLocalePath";
import { fetchPostBySlug, fetchPostById, getFeaturedImage, decodeExcerpt, formatPostDate, isMeaningfullyUpdated, CATEGORY } from "@/lib/wordpress";
import { addHeadingIdsAndExtractToc } from "@/lib/toc";
import { SITE } from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";
import { WHITE_PAPER_BLOG_SLUGS } from "@/lib/whitePaper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await fetchPostBySlug(CATEGORY.blog[locale as Locale], slug);
  if (!post) {
    const t = await getTranslations({ locale, namespace: "blogPost" });
    return { title: t("notFound") };
  }

  const title = decode(post.title.rendered);
  const description = decodeExcerpt(post.excerpt.rendered, 160);
  const image = getFeaturedImage(post);

  const localizedUrl = (l: string, postSlug: string) =>
    `${SITE.url}${l === routing.defaultLocale ? "" : `/${l}`}/blog/${postSlug}`;

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await fetchPostBySlug(CATEGORY.blog[locale as Locale], slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blogPost" });
  const tGeneral = await getTranslations({ locale, namespace: "general" });
  const { html: contentHtml, toc } = addHeadingIdsAndExtractToc(post.content.rendered);

  const otherLocale = routing.locales.find((l) => l !== locale);
  const otherLocalePostId = otherLocale ? post.translations?.[otherLocale] : undefined;
  const altPost = otherLocalePostId && otherLocalePostId !== post.id ? await fetchPostById(otherLocalePostId) : null;
  // Fall back to the section listing (always valid in both locales) rather
  // than reusing this post's slug — WordPress translations don't share
  // slugs, so guessing "/blog/<this-english-slug>" for Spanish would 404.
  const altPath = altPost ? `/blog/${altPost.slug}` : "/blog";

  const title = decode(post.title.rendered);
  const canonicalUrl = `${SITE.url}${locale === routing.defaultLocale ? "" : `/${locale}`}/blog/${slug}`;

  return (
    <>
      <SetAltLocalePath path={altPath} />
      <section className="container-px pt-24 pb-8">
        <Reveal className="max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors">
            <ArrowLeft size={15} />
            {t("backToBlog")}
          </Link>
          <p className="mt-6 text-xs uppercase tracking-widest text-fg-dim">
            {formatPostDate(post.date, locale)}
            {isMeaningfullyUpdated(post) ? ` ${t("updated", { date: formatPostDate(post.modified, locale) })}` : ""}
          </p>
          <h1 className="font-display text-balance mt-4 text-3xl leading-[1.15] text-fg sm:text-4xl md:text-5xl">
            {title}
          </h1>
        </Reveal>
      </section>

      <section className="container-px pb-24 md:pb-32">
        <div className="max-w-6xl grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr_260px]">
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <TableOfContents items={toc} label={t("onThisPage")} />
            </aside>
          )}
          <Reveal>
            <div
              className="prose prose-invert max-w-none prose-headings:font-display prose-h2:scroll-mt-28 prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </Reveal>
          <BlogAuthorSidebar
            url={canonicalUrl}
            title={title}
            authorRole={t("authorRole")}
            authorBio={t("authorBio")}
            shareLabel={t("shareArticle")}
            ctaHeading={t("cta")}
            ctaButtonLabel={tGeneral("bookFreeCall")}
            showWhitePaperCta={WHITE_PAPER_BLOG_SLUGS.includes(slug)}
            whitePaperImageAlt={t("whitePaperCta.imageAlt")}
            whitePaperBody={t("whitePaperCta.body")}
            whitePaperButtonLabel={t("whitePaperCta.button")}
          />
        </div>
      </section>
    </>
  );
}
