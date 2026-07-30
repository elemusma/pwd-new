"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import ContactForm from "@/components/ContactForm";

// Renders on every page except these — they already have their own dedicated
// contact flow, so a second contact form would just be redundant clutter.
const EXCLUDED_PATHS = ["/contact", "/calendar", "/about", "/thank-you", "/white-paper/thank-you"];

export default function CtaFormSection() {
  const pathname = usePathname();
  const t = useTranslations("ctaForm");

  if (EXCLUDED_PATHS.includes(pathname)) return null;

  return (
    <section className="container-px py-24 md:py-32">
      <div className="rounded-3xl border border-border bg-bg-elevated p-10 md:p-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-balance text-3xl text-fg sm:text-4xl">{t("heading")}</h2>
          <p className="mt-4 text-fg-muted">{t("subhead")}</p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl">
          <ContactForm submitLabel={t("submit")} />
        </div>
      </div>
    </section>
  );
}
