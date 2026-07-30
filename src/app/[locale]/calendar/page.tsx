import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import CalEmbed from "@/components/CalEmbed";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calendar" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription", { name: SITE.name }),
  };
}

export default function CalendarPage() {
  const t = useTranslations("calendar");

  return (
    <>
      <section className="container-px pt-24 pb-8">
        <Reveal className="max-w-3xl">
          <h1 className="font-display text-balance text-4xl leading-[1.1] text-fg sm:text-5xl md:text-6xl">
            {t("heading")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted">{t("subhead", { shortName: SITE.shortName })}</p>
        </Reveal>
      </section>

      <section className="container-px pb-24 md:pb-32">
        <Reveal delay={0.1} className="overflow-hidden rounded-3xl border border-border bg-bg-elevated">
          <CalEmbed />
        </Reveal>
      </section>
    </>
  );
}
