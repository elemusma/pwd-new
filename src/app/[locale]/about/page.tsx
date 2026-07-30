import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Compass, Gift, Handshake, LineChart, MessageSquareText, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import { SITE } from "@/lib/site";

const VALUE_ICONS = [MessageSquareText, Compass, LineChart, Handshake, Gift, Users];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription", {
      name: SITE.name,
      years: SITE.founderYearsExperience,
      yearsInBusiness: SITE.yearsInBusiness,
    }),
  };
}

export default function AboutPage() {
  const t = useTranslations("about");

  const values = (t.raw("values.items") as { title: string; description: string }[]).map((v, i) => ({
    ...v,
    icon: VALUE_ICONS[i],
  }));

  const timelineRaw = t.raw("timeline.items") as { year: string; title: string; description: string }[];
  const timeline = timelineRaw.map((item, i) =>
    i === 2
      ? {
          ...item,
          year: t("timeline.items.2.year", { yearsInBusiness: SITE.yearsInBusiness }),
          title: t("timeline.items.2.title", { name: SITE.name }),
        }
      : item
  );

  return (
    <>
      <section className="container-px pt-24 pb-8">
        <Reveal className="max-w-3xl">
          <h1 className="font-display text-balance text-4xl leading-[1.1] text-fg sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-fg-muted">
            {t("heroHeading", { yearsInBusiness: SITE.yearsInBusiness })}
          </p>
        </Reveal>
      </section>

      <section className="container-px pb-16 md:pb-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <Reveal>
            <p className="text-lg leading-relaxed text-fg-muted">
              {t("intro1", { name: SITE.name, yearsInBusiness: SITE.yearsInBusiness, city: SITE.city })}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">
              {t("intro2", { shortName: SITE.shortName })}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">{t("intro3")}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex justify-center rounded-3xl border border-card-border bg-card py-10">
              <div className="relative aspect-square w-48 overflow-hidden rounded-full">
                <Image
                  src="/headshot/Ted-Martinez-Headshot-Precise-Wolf-Digital.png"
                  alt="Ted Martinez, founder of Precise Wolf Digital"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative mt-6 rounded-3xl border border-card-border bg-card p-10">
              <p className="text-xs uppercase tracking-widest text-card-fg-dim">{t("atAGlance")}</p>
              <div className="mt-8 space-y-8">
                <div>
                  <p className="font-display text-4xl text-card-fg">{SITE.founderYearsExperience}+ yrs</p>
                  <p className="mt-1 text-sm text-card-fg-muted">{t("glance.experience")}</p>
                </div>
                <div>
                  <p className="font-display text-4xl text-card-fg">{SITE.yearsInBusiness} yrs</p>
                  <p className="mt-1 text-sm text-card-fg-muted">{t("glance.running", { name: SITE.name })}</p>
                </div>
                <div>
                  <p className="font-display text-4xl text-card-fg">100%</p>
                  <p className="mt-1 text-sm text-card-fg-muted">{t("glance.personally")}</p>
                </div>
                <div>
                  <p className="font-display text-4xl text-card-fg">{SITE.city}</p>
                  <p className="mt-1 text-sm text-card-fg-muted">{t("glance.basedHere")}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-px py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-fg-dim">{t("values.eyebrow")}</p>
          <h2 className="font-display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            {t("values.heading")}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08} className="rounded-2xl border border-card-border bg-card p-8">
              <value.icon className="text-accent" size={26} />
              <h3 className="font-display mt-5 text-xl text-card-fg">{value.title}</h3>
              <p className="mt-3 text-card-fg-muted">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-fg-dim">{t("timeline.eyebrow")}</p>
          <h2 className="font-display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            {t("timeline.heading")}
          </h2>
        </Reveal>

        <div className="mt-14 space-y-0 border-t border-border-soft">
          {timeline.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.06}
              className="grid grid-cols-1 gap-2 border-b border-border-soft py-8 sm:grid-cols-[160px_1fr] sm:gap-8"
            >
              <p className="text-sm text-fg-dim">{item.year}</p>
              <div>
                <h3 className="font-display text-xl text-fg sm:text-2xl">{item.title}</h3>
                <p className="mt-2 max-w-xl text-fg-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px py-16 md:py-24">
        <Testimonials compact />
      </section>

      <CtaSection heading={t("cta")} />
    </>
  );
}
