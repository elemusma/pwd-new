import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import TrustBadge from "@/components/TrustBadge";
import TestimonialCard from "@/components/TestimonialCard";
import { TESTIMONIALS } from "@/lib/testimonials";

export default function Testimonials({ compact = false }: { compact?: boolean }) {
  const items = compact ? TESTIMONIALS.slice(0, 4) : TESTIMONIALS;
  const loop = [...items, ...items];
  const t = useTranslations("testimonials");

  return (
    <div>
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-fg-dim">{t("eyebrow")}</p>
          <h2 className="font-display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl text-balance">
            {t("heading")}
          </h2>
          <p className="mt-4 text-fg-muted">{t("disclosure")}</p>
        </div>
        <TrustBadge className="shrink-0" />
      </Reveal>

      <Reveal delay={0.1} className="marquee-pause-on-hover mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max animate-marquee-slow items-stretch gap-6">
          {loop.map((item, i) => (
            <TestimonialCard
              key={`${item.name}-${i}`}
              item={item}
              readMoreLabel={t("readMore")}
              showLessLabel={t("showLess")}
            />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
