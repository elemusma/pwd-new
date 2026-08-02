import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Phone } from "lucide-react";
import { SITE, PODCAST_PLATFORMS } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "thankYou" });
  return {
    title: t("metaTitle"),
    robots: { index: false, follow: true },
  };
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "thankYou" });

  return (
    <section className="container-px pt-32 pb-24 md:pb-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-balance text-4xl leading-[1.1] text-fg sm:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-6 text-lg text-fg-muted">{t("body")}</p>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border">
            <Image
              src="/podcast/Inside-The-Attorneys-Mind-Podcast.jpg"
              alt="Inside the Attorney's Mind podcast"
              fill
              sizes="(min-width: 640px) 336px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border">
            <Image
              src="/podcast/Banner-FB-YT.jpg"
              alt="Inside the Attorney's Mind podcast episodes"
              fill
              sizes="(min-width: 640px) 336px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-8 sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-medium text-fg">{t("listenOn")}</p>
            <div className="mt-4 flex items-center justify-center gap-3 sm:justify-start">
              {PODCAST_PLATFORMS.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer me"
                  aria-label={platform.name}
                  className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl transition-transform hover:scale-105"
                >
                  <Image src={platform.icon} alt={platform.name} fill sizes="44px" className="object-cover" />
                </a>
              ))}
            </div>
          </div>

          <p className="text-sm text-fg-muted sm:text-right">
            {t("urgentQuestions")}{" "}
            <a href={`tel:${SITE.phoneHref}`} className="inline-flex items-center gap-1 text-fg hover:text-accent transition-colors">
              <Phone size={14} />
              {SITE.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
