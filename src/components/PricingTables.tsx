import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { PLANS } from "@/lib/pricing";

export default function PricingTables() {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {PLANS.map((plan, i) => {
        const features = t.raw(`pricing.plans.${plan.id}.features`) as string[];

        return (
          <Reveal key={plan.id} delay={i * 0.1} className="flex h-full flex-col rounded-3xl border border-card-border bg-card p-10">
            <h3 className="font-display text-2xl text-card-fg">{t(`pricing.plans.${plan.id}.name`)}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-5xl text-card-fg">{plan.price}</span>
              {plan.unit && <span className="text-card-fg-muted">{plan.unit}</span>}
            </div>
            <p className="mt-4 text-card-fg-muted">{t(`pricing.plans.${plan.id}.description`)}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-card-fg-muted">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href={plan.payLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg hover:bg-accent-soft transition-colors"
              >
                {t(`pricing.plans.${plan.id}.ctaLabel`)}
              </a>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
