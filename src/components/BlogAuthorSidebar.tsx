import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { AUTHOR } from "@/lib/site";
import WhitePaperCard from "@/components/WhitePaperCard";
import ShareCard from "@/components/ShareCard";

export default function BlogAuthorSidebar({
  url,
  title,
  authorRole,
  authorBio,
  shareLabel,
  ctaHeading,
  ctaButtonLabel,
  showWhitePaperCta,
  whitePaperImageAlt,
  whitePaperBody,
  whitePaperButtonLabel,
}: {
  url: string;
  title: string;
  authorRole: string;
  authorBio: string;
  shareLabel: string;
  ctaHeading: string;
  ctaButtonLabel: string;
  showWhitePaperCta?: boolean;
  whitePaperImageAlt?: string;
  whitePaperBody?: string;
  whitePaperButtonLabel?: string;
}) {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:gap-6">
      <div className="sticky top-28 flex flex-col gap-6">
        {showWhitePaperCta && (
          <WhitePaperCard
            imageAlt={whitePaperImageAlt ?? ""}
            body={whitePaperBody ?? ""}
            buttonLabel={whitePaperButtonLabel ?? ""}
          />
        )}

        <div className="rounded-2xl border border-card-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <Image src={AUTHOR.photo} alt={AUTHOR.name} fill sizes="48px" className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-card-fg">{AUTHOR.name}</p>
              <p className="text-xs text-card-fg-muted">{authorRole}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-card-fg-muted">{authorBio}</p>
        </div>

        <ShareCard url={url} title={title} label={shareLabel} />

        <div className="rounded-2xl border border-card-border bg-card p-5">
          <p className="text-sm text-card-fg">{ctaHeading}</p>
          <Link
            href="/calendar"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent-soft transition-colors"
          >
            {ctaButtonLabel}
          </Link>
        </div>
      </div>
    </aside>
  );
}
