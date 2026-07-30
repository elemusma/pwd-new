import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { SITE } from "@/lib/site";

export default function CtaSection({
  heading,
  buttonLabel,
}: {
  heading: string;
  buttonLabel?: string;
}) {
  const t = useTranslations("general");

  return (
    <section className="container-px py-24 md:py-32">
      <Reveal className="flex flex-col items-start gap-8 rounded-3xl border border-card-border bg-card p-10 md:flex-row md:items-center md:justify-between md:p-16">
        <h2 className="font-display max-w-xl text-3xl text-card-fg sm:text-4xl md:text-5xl text-balance">
          {heading}
        </h2>
        <div className="flex shrink-0 flex-col items-start gap-4">
          <Button href="/calendar">{buttonLabel ?? t("bookFreeCall")}</Button>
          <a
            href={`tel:${SITE.phoneHref}`}
            className="inline-flex items-center gap-1.5 text-sm text-card-fg-muted hover:text-card-fg transition-colors"
          >
            <Phone size={14} />
            {t("orCall", { phone: SITE.phone })}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
