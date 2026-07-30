import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import PortfolioGrid from "@/components/PortfolioGrid";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolioPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription", { city: SITE.city }),
  };
}

export default function PortfolioPage() {
  const t = useTranslations("portfolioPage");

  return (
    <>
      <section className="container-px pt-24 pb-8">
        <Reveal className="max-w-3xl">
          <h1 className="font-display text-balance text-4xl leading-[1.1] text-fg sm:text-5xl md:text-6xl">
            {t("heading")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted">{t("subhead")}</p>
        </Reveal>
      </section>

      <section className="container-px pb-16 md:pb-24">
        <PortfolioGrid viewWebsiteLabel={t("viewWebsite")} comingSoonLabel={t("comingSoon")} />
      </section>
    </>
  );
}
