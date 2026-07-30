import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function WhitePaperCard({
  imageAlt,
  body,
  buttonLabel,
}: {
  imageAlt: string;
  body: string;
  buttonLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-card-border bg-card">
      <Image
        src="/white-paper/get-more-cases-cover.jpg"
        alt={imageAlt}
        width={719}
        height={603}
        className="h-auto w-full"
      />
      <div className="p-5">
        <p className="text-sm text-card-fg-muted">{body}</p>
        <Link
          href="/white-paper"
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent-soft transition-colors"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
