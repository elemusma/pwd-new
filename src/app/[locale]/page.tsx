import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUpRight, BarChart3, CalendarX, Compass, DollarSign, Hammer, Search, Sparkles, Star, TrendingUp, Users } from "lucide-react";
import HeroIntro from "@/components/HeroIntro";
import Reveal from "@/components/Reveal";
import ClientLogos from "@/components/ClientLogos";
import Button from "@/components/Button";
import Testimonials from "@/components/Testimonials";
import HeadshotIcons from "@/components/HeadshotIcons";
import Faq from "@/components/Faq";

export default function Home() {
  const t = useTranslations("home");
  const tg = useTranslations("general");

  const STATS = [
    { value: "49K+", label: t("stats.totalClicks") },
    { value: "6.6M+", label: t("stats.totalImpressions") },
    { value: "10", label: t("stats.experience") },
  ];

  const SERVICES = [
    { icon: Hammer, key: "webDesign", href: "/services/web-design" },
    { icon: Search, key: "seo", href: "/services/seo" },
  ];

  const PROCESS = [
    { icon: Compass, key: "discover" },
    { icon: Hammer, key: "designBuild" },
    { icon: Search, key: "optimize" },
    { icon: TrendingUp, key: "grow" },
  ];

  const faqs = t.raw("faq.items") as { question: string; answer: string }[];

  const WHY_US = [
    { icon: Users, key: "directAccess" },
    { icon: Sparkles, key: "aiSearch" },
    { icon: DollarSign, key: "pricing" },
    { icon: BarChart3, key: "dataBacked" },
    { icon: CalendarX, key: "noContracts" },
    { icon: Star, key: "reviews" },
  ];

  return (
    <>
      <section className="relative flex min-h-[92vh] flex-col justify-center pt-32 pb-16">
        <div className="container-px grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
          <HeroIntro className="max-w-4xl">
            <h1 className="hero-item font-display text-balance text-3xl leading-[1.05] tracking-tight text-fg sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              {t("heroLine1")}
              <br />
              {t.rich("heroLine2", { accent: (chunks) => <span className="text-accent">{chunks}</span> })}
            </h1>
            <p className="hero-item mt-8 max-w-xl text-lg text-fg-muted">{t("heroSubhead")}</p>
            <div className="hero-item mt-10 flex flex-wrap items-center gap-4">
              <Button href="/calendar">{tg("bookFreeCall")}</Button>
              <Button href="/services" variant="outline">
                {t("viewServices")}
              </Button>
            </div>
          </HeroIntro>
          <Reveal delay={0.15} className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border">
            <Image
              src="/headshot/Ted-Martinez-Hero.jpg"
              alt="Ted Martinez, founder of Precise Wolf Digital, at his desk in Denver"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <ClientLogos heading={t("clientLogos.heading")} />

      <section className="container-px py-24 md:py-32">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="text-center">
              <p className="font-display text-5xl text-fg md:text-6xl">{stat.value}</p>
              <p className="mx-auto mt-3 max-w-[220px] text-sm text-fg-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-fg-dim">{t("whatIDo.eyebrow")}</p>
          <h2 className="font-display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            {t("whatIDo.heading")}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.key} delay={i * 0.1}>
              <Link
                href={service.href}
                className="group block h-full rounded-2xl border border-card-border bg-card p-8 transition-colors hover:border-accent md:p-10"
              >
                <service.icon className="text-accent" size={28} />
                <h3 className="font-display mt-6 text-2xl text-card-fg md:text-3xl">
                  {t(`whatIDo.${service.key}.title`)}
                </h3>
                <p className="mt-4 text-card-fg-muted">{t(`whatIDo.${service.key}.description`)}</p>
                {service.key === "seo" && (
                  <p className="mt-4 text-sm text-card-fg-dim">{t("whatIDo.seo.trustLine")}</p>
                )}
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-card-fg group-hover:text-accent transition-colors">
                  {tg("learnMore")}
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px py-16 md:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-fg-dim">{t("whyUs.eyebrow")}</p>
          <h2 className="font-display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            {t("whyUs.heading")}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item, i) => (
            <Reveal key={item.key} delay={i * 0.06} className="rounded-2xl border border-card-border bg-card p-8">
              <item.icon className="text-accent" size={26} />
              <h3 className="font-display mt-5 text-xl text-card-fg">{t(`whyUs.items.${item.key}.title`)}</h3>
              <p className="mt-3 text-card-fg-muted">{t(`whyUs.items.${item.key}.description`)}</p>
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
          {PROCESS.map((step, i) => (
            <Reveal key={step.key} delay={i * 0.08} className="bg-card p-8">
              <span className="text-xs text-card-fg-dim">0{i + 1}</span>
              <step.icon className="mt-4 text-accent" size={24} />
              <h3 className="font-display mt-5 text-xl text-card-fg">{t(`process.${step.key}.title`)}</h3>
              <p className="mt-3 text-sm text-card-fg-muted">{t(`process.${step.key}.description`)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-px py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
              {t("pricingTeaser.heading")}
            </h2>
            <p className="mt-4 text-fg-muted">{t("pricingTeaser.body")}</p>
            <Link
              href="/pricing"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent transition-colors"
            >
              {t("pricingTeaser.cta")}
              <ArrowUpRight size={15} />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <HeadshotIcons />
          </Reveal>
        </div>
      </section>

      {/* RESULTS SECTION: placeholder. Do not fill with generic "we get results" copy.
      Waiting on real case study data (traffic, rankings, or leads for a specific client)
      before this gets written. Leave this section out of the rendered page until copy is provided. */}

      <section className="container-px py-16 md:py-24">
        <Testimonials />
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
