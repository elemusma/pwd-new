import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import PodcastPlatforms from "@/components/PodcastPlatforms";
import { fetchPosts, CATEGORY } from "@/lib/wordpress";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "podcastPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription", { name: SITE.name }),
  };
}

export default async function PodcastPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const { posts, totalPages } = await fetchPosts(CATEGORY.podcast[locale as Locale], page, 9);
  const t = await getTranslations({ locale, namespace: "podcastPage" });

  return (
    <>
      <section className="container-px pt-24 pb-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-3xl">
            <h1 className="font-display text-balance text-4xl leading-[1.1] text-fg sm:text-5xl md:text-6xl">
              {t("heading")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-fg-muted">{t("subhead")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <PodcastPlatforms label={t("listenOn")} />
          </Reveal>
        </div>
      </section>

      <section className="container-px pb-24 md:pb-32">
        {posts.length === 0 ? (
          <Reveal className="rounded-2xl border border-card-border bg-card p-10 text-center text-card-fg-muted">
            {t("empty")}
          </Reveal>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={Math.min(i * 0.05, 0.3)}>
                  <PostCard post={post} basePath="/podcast" />
                </Reveal>
              ))}
            </div>
            <Pagination basePath="/podcast" currentPage={page} totalPages={totalPages} />
          </>
        )}
      </section>
    </>
  );
}
