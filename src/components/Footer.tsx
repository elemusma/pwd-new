import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import Logo from "@/components/Logo";

export default function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const tg = useTranslations("general");

  return (
    <footer className="relative z-10 border-t border-border-soft bg-bg">
      <div className="container-px py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12 md:gap-8">
          <div>
            <Link href="/" className="group mb-4 block w-full">
              <Logo className="h-auto w-full" />
            </Link>
            <p className="text-fg-muted text-sm max-w-xs mb-6">{tg("tagline")}</p>
            <Link
              href="/calendar"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-soft transition-colors"
            >
              {tg("bookFreeCall")}
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-fg-dim mb-4">{tf("sitemap")}</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-fg-muted hover:text-fg transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/calendar" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  {t("calendar")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-fg-dim mb-4">{tf("services")}</p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/services/web-design" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  {t("webDesign")}
                </Link>
              </li>
              <li>
                <Link href="/services/seo" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  {t("seo")}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-fg-muted hover:text-fg transition-colors">
                  {t("pricing")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-fg-dim mb-4">{tf("contact")}</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${SITE.email}`} className="text-fg-muted hover:text-fg transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneHref}`} className="text-fg-muted hover:text-fg transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li className="text-fg-muted">{SITE.addressLine}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-fg-dim">
            {tf("copyright", { year: new Date().getFullYear(), name: SITE.name })}
          </p>
          <p className="text-xs text-fg-dim">{tf("builtIn", { city: SITE.city })}</p>
        </div>
      </div>
    </footer>
  );
}
