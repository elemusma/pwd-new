import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "whitePaper.thankYou" });
  return {
    title: t("metaTitle"),
    robots: { index: false, follow: true },
  };
}

export default async function WhitePaperThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "whitePaper.thankYou" });

  return (
    <section className="container-px pt-32 pb-24 md:pb-32">
      <Reveal className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-balance text-4xl leading-[1.1] text-fg sm:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-6 text-lg text-fg-muted">{t("body")}</p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/calendar">{t("cta")}</Button>
          <Link href="/blog" className="text-sm text-fg-muted transition-colors hover:text-fg">
            {t("backToBlog")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
