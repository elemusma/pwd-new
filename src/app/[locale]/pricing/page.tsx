import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import PricingTables from "@/components/PricingTables";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription", { name: SITE.name, city: SITE.city }),
  };
}

export default function PricingPage() {
  const t = useTranslations("pricing");
  const faqs = t.raw("faq.items") as { question: string; answer: string }[];

  return (
    <>
      <section className="container-px pt-24 pb-8">
        <Reveal className="max-w-3xl">
          <h1 className="font-display text-balance text-4xl leading-[1.1] text-fg sm:text-5xl md:text-6xl">
            {t("heading")}
          </h1>
        </Reveal>
      </section>

      <section className="container-px pb-16 md:pb-24">
        <PricingTables />
      </section>

      <section className="container-px py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-fg-dim">{t("faq.eyebrow")}</p>
          <h2 className="font-display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            {t("faq.heading")}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <Faq items={faqs} />
        </Reveal>
      </section>

      <section className="container-px py-16 md:py-24">
        <Testimonials compact />
      </section>
    </>
  );
}
