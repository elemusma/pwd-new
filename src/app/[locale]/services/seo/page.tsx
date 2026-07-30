import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { FileSearch, MapPin, Newspaper, Settings2, TrendingUp, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import { SITE } from "@/lib/site";

const DELIVERABLE_ICONS = [FileSearch, MapPin, Settings2, Newspaper, Wrench, TrendingUp];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seoPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription", { city: SITE.city }),
  };
}

export default function SeoPage() {
  const t = useTranslations("seoPage");
  const tg = useTranslations("general");

  const deliverables = (t.raw("deliverables.items") as { title: string; description: string }[]).map((d, i) => ({
    ...d,
    icon: DELIVERABLE_ICONS[i],
  }));
  const process = t.raw("process.items") as { title: string; description: string }[];
  const faqs = t.raw("faq.items") as { question: string; answer: string }[];
  const approachParagraphs = t.raw("approach.paragraphs") as string[];
  const specialtyItems = t.raw("specialty.items") as string[];

  return (
    <>
      <section className="container-px pt-24 pb-8">
        <Reveal className="max-w-3xl">
          <h1 className="font-display text-balance text-4xl leading-[1.1] text-fg sm:text-5xl md:text-6xl">
            {t("heading")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted">{t("subhead", { city: SITE.city })}</p>
          <div className="mt-10">
            <Button href="/calendar">{tg("bookFreeCall")}</Button>
          </div>
        </Reveal>
      </section>

      <section className="container-px pb-16 md:pb-24">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            {t("approach.heading")}
          </h2>
          <div className="mt-6 space-y-4">
            {approachParagraphs.map((paragraph, i) => (
              <p key={i} className="text-fg-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-px py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-fg-dim">{t("specialty.eyebrow")}</p>
          <h2 className="font-display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            {t("specialty.heading")}
          </h2>
          <p className="mt-4 text-fg-muted">{t("specialty.body")}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
          {specialtyItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-card-border bg-card px-4 py-2 text-sm text-card-fg-muted"
            >
              {item}
            </span>
          ))}
        </Reveal>
      </section>

      <section className="container-px py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-fg-dim">{t("deliverables.eyebrow")}</p>
          <h2 className="font-display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            {t("deliverables.heading")}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="rounded-2xl border border-card-border bg-card p-8">
              <item.icon className="text-accent" size={26} />
              <h3 className="font-display mt-5 text-xl text-card-fg">{item.title}</h3>
              <p className="mt-3 text-card-fg-muted">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-fg-dim">{t("process.eyebrow")}</p>
          <h2 className="font-display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            {t("process.heading")}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-card-border bg-card-border sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08} className="bg-card p-8">
              <span className="text-xs text-card-fg-dim">0{i + 1}</span>
              <h3 className="font-display mt-4 text-xl text-card-fg">{step.title}</h3>
              <p className="mt-3 text-sm text-card-fg-muted">{step.description}</p>
            </Reveal>
          ))}
        </div>
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
