import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { REVIEW_COUNT, GOOGLE_REVIEW_LINK } from "@/lib/testimonials";

export default function TrustBadge({ className = "" }: { className?: string }) {
  const t = useTranslations("general");

  return (
    <a
      href={GOOGLE_REVIEW_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 text-sm text-fg-muted hover:text-fg transition-colors ${className}`}
    >
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="fill-accent text-accent" />
        ))}
      </span>
      {t("googleReviews", { count: REVIEW_COUNT })}
    </a>
  );
}
