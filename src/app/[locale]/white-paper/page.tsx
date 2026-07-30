import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import WhitePaperForm from "@/components/WhitePaperForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "whitePaper" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function WhitePaperPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "whitePaper" });

  return (
    <section className="container-px pt-24 pb-24 md:pb-32">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal className="overflow-hidden rounded-3xl border border-border">
          <Image
            src="/white-paper/get-more-cases-cover.jpg"
            alt={t("imageAlt")}
            width={719}
            height={603}
            priority
            className="h-auto w-full"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-balance text-3xl leading-[1.1] text-fg sm:text-4xl md:text-5xl">
            {t("heading")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted">{t("subhead")}</p>
          <div className="mt-10 max-w-md rounded-3xl border border-card-border bg-card p-8">
            <WhitePaperForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
