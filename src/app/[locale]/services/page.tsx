import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Hammer, Search } from "lucide-react";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription", { city: SITE.city, name: SITE.name }),
  };
}

export default function ServicesPage() {
  const t = useTranslations("services");

  const SERVICES = [
    { icon: Hammer, key: "webDesign", href: "/services/web-design" },
    { icon: Search, key: "seo", href: "/services/seo" },
  ];

  const industries = t.raw("whoIWorkWith.industries") as string[];
  const faqs = t.raw("faq.items") as { question: string; answer: string }[];

  return (
    <>
      <section className="container-px pt-24 pb-8">
        <Reveal className="max-w-4xl">
          <h1 className="font-display text-balance text-4xl leading-[1.1] text-fg sm:text-5xl md:text-6xl">
            {t("heading")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-fg-muted">{t("subhead")}</p>
        </Reveal>
      </section>

      <section className="container-px pb-16 md:pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => {
            const bullets = t.raw(`cards.${service.key}.bullets`) as string[];
            return (
              <Reveal key={service.key} delay={i * 0.1}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-3xl border border-card-border bg-card p-10 transition-colors hover:border-accent"
                >
                  <service.icon className="text-accent" size={30} />
                  <h2 className="font-display mt-6 text-3xl text-card-fg">{t(`cards.${service.key}.title`)}</h2>
                  <p className="mt-4 text-card-fg-muted">{t(`cards.${service.key}.description`)}</p>
                  <ul className="mt-6 space-y-2">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-card-fg-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-card-fg group-hover:text-accent transition-colors">
                    {t(`cards.${service.key}.explore`)}
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-px py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-fg-dim">{t("whoIWorkWith.eyebrow")}</p>
          <h2 className="font-display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            {t("whoIWorkWith.heading")}
          </h2>
          <p className="mt-4 text-fg-muted">{t("whoIWorkWith.intro")}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
          {industries.map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-card-border bg-card px-4 py-2 text-sm text-card-fg-muted"
            >
              {industry}
            </span>
          ))}
        </Reveal>
      </section>

      <section className="container-px py-16 md:py-24">
        <Testimonials compact />
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
    </>
  );
}
