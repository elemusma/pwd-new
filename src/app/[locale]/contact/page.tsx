import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription", { name: SITE.name, city: SITE.city }),
  };
}

export default function ContactPage() {
  const t = useTranslations("contact");

  const DETAILS = [
    { icon: Mail, label: t("details.email"), value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: t("details.phone"), value: SITE.phone, href: `tel:${SITE.phoneHref}` },
    { icon: MapPin, label: t("details.location"), value: SITE.addressLine, href: undefined },
  ];

  return (
    <section className="container-px pt-24 pb-16 md:pb-24">
      {/* DOM order is heading → form → details so the form comes before the
          details on mobile; on desktop the grid places the form in its own column. */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.3fr] md:grid-rows-[auto_1fr] md:gap-x-16 md:gap-y-12">
        <Reveal className="max-w-3xl md:col-start-1 md:row-start-1">
          <h1 className="font-display text-balance text-4xl leading-[1.1] text-fg sm:text-5xl md:text-6xl">
            {t("heading")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-muted">{t("subhead")}</p>
        </Reveal>

        <Reveal
          delay={0.1}
          onLoad
          className="rounded-3xl border border-card-border bg-card p-8 md:col-start-2 md:row-span-2 md:row-start-1 md:p-10"
        >
          <ContactForm />
        </Reveal>

        <Reveal delay={0.2} className="space-y-6 md:col-start-1 md:row-start-2">
          {DETAILS.map((detail) => (
            <div key={detail.label} className="flex items-start gap-4 rounded-2xl border border-card-border bg-card p-6">
              <detail.icon className="mt-0.5 shrink-0 text-accent" size={20} />
              <div>
                <p className="text-xs uppercase tracking-widest text-card-fg-dim">{detail.label}</p>
                {detail.href ? (
                  <a href={detail.href} className="mt-1 block text-card-fg hover:text-accent transition-colors">
                    {detail.value}
                  </a>
                ) : (
                  <p className="mt-1 text-card-fg">{detail.value}</p>
                )}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
