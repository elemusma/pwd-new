import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { decode } from "he";
import { useLocale, useTranslations } from "next-intl";
import { getFeaturedImage, decodeExcerpt, formatPostDate, type WPPost } from "@/lib/wordpress";

export default function PostCard({ post, basePath }: { post: WPPost; basePath: string }) {
  const image = getFeaturedImage(post);
  const t = useTranslations("general");
  const locale = useLocale();

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition-colors hover:border-accent"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-card-soft">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-card-fg-dim">
            <span className="font-display text-2xl">PW</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs uppercase tracking-widest text-card-fg-dim">{formatPostDate(post.date, locale)}</p>
        <h3 className="font-display mt-3 text-xl text-card-fg">{decode(post.title.rendered)}</h3>
        <p className="mt-3 flex-1 text-sm text-card-fg-muted">{decodeExcerpt(post.excerpt.rendered, 130)}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-card-fg group-hover:text-accent transition-colors">
          {t("readMore")}
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
