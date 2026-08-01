import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import Button from "@/components/Button";
import SearchBox from "@/components/SearchBox";

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("notFound");
  const tSearch = await getTranslations("search");

  return (
    <section className="container-px flex min-h-[70vh] flex-col items-center justify-center pt-24 pb-24 text-center">
      <p className="font-display text-6xl text-accent sm:text-7xl">404</p>
      <h1 className="font-display mt-4 text-balance text-3xl leading-[1.1] text-fg sm:text-4xl">{t("heading")}</h1>
      <p className="mt-4 max-w-md text-fg-muted">{t("body")}</p>

      <div className="mt-8">
        <Button href="/">{t("backHome")}</Button>
      </div>

      <p className="mt-10 text-sm uppercase tracking-widest text-fg-dim">{t("or")}</p>

      <SearchBox
        locale={locale}
        placeholder={t("searchPlaceholder")}
        submitLabel={tSearch("submit")}
        className="mt-6 w-full max-w-md"
      />
    </section>
  );
}
