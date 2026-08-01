import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import Reveal from "@/components/Reveal";
import SearchBox from "@/components/SearchBox";
import { searchSite, type SearchResult } from "@/lib/search";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "search" });
  return { title: t("metaTitle"), robots: { index: false, follow: true } };
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const t = await getTranslations({ locale, namespace: "search" });

  const results = query ? await searchSite(query, locale as Locale) : [];

  const typeLabel: Record<SearchResult["type"], string> = {
    page: t("typePage"),
    blog: t("typeBlog"),
    podcast: t("typePodcast"),
    caseStudy: t("typeCaseStudy"),
  };

  return (
    <section className="container-px pt-24 pb-24 md:pb-32">
      <Reveal className="max-w-3xl">
        <h1 className="font-display text-balance text-4xl leading-[1.1] text-fg sm:text-5xl md:text-6xl">
          {t("heading")}
        </h1>
        <SearchBox
          locale={locale as Locale}
          defaultValue={query}
          placeholder={t("placeholder")}
          submitLabel={t("submit")}
          className="mt-8 max-w-xl"
        />
      </Reveal>

      {query && (
        <Reveal delay={0.05} className="mt-14">
          <p className="text-sm text-fg-dim">
            {t("resultsFor", { query })} — {t("resultCount", { count: results.length })}
          </p>

          {results.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-card-border bg-card p-10 text-center text-card-fg-muted">
              {t("empty")}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.href}`}
                  href={result.href}
                  className="group block rounded-2xl border border-card-border bg-card p-6 transition-colors hover:border-accent"
                >
                  <span className="text-xs uppercase tracking-widest text-card-fg-dim">{typeLabel[result.type]}</span>
                  <h2 className="font-display mt-2 flex items-center gap-1.5 text-xl text-card-fg">
                    {result.title}
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </h2>
                  {result.excerpt && <p className="mt-2 text-sm text-card-fg-muted">{result.excerpt}</p>}
                </Link>
              ))}
            </div>
          )}
        </Reveal>
      )}
    </section>
  );
}
