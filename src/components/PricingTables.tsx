"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import { PLANS } from "@/lib/pricing";

export default function PricingTables() {
  const t = useTranslations();
  const [multilingual, setMultilingual] = useState(false);
  const toggleId = useId();

  return (
    <div>
      <div className="flex w-fit max-w-full flex-col items-start gap-4 rounded-2xl border border-accent bg-accent/5 py-5 pr-5 pl-4 sm:flex-row sm:items-center">
        <label htmlFor={toggleId} className="cursor-pointer text-sm text-fg">
          {t("pricing.multilingualToggle")}
        </label>
        <button
          id={toggleId}
          type="button"
          role="switch"
          aria-checked={multilingual}
          onClick={() => setMultilingual((v) => !v)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
            multilingual ? "bg-accent" : "bg-card-border"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition-transform ${
              multilingual ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PLANS.map((plan, i) => {
          const features = t.raw(`pricing.plans.${plan.id}.features`) as string[];
          const price = multilingual ? plan.multilingualPrice : plan.price;
          const href = multilingual ? plan.multilingualPayLink : plan.payLink;
          const isExternal = href.startsWith("http");
          const ctaLabel = multilingual && !isExternal ? t("pricing.bookCallCta") : t(`pricing.plans.${plan.id}.ctaLabel`);

          return (
            <Reveal key={plan.id} delay={i * 0.1} className="flex h-full flex-col rounded-3xl border border-card-border bg-card p-10">
              <h3 className="font-display text-2xl text-card-fg">{t(`pricing.plans.${plan.id}.name`)}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl text-card-fg">{price}</span>
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
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg hover:bg-accent-soft transition-colors"
                >
                  {ctaLabel}
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
