"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { gsap } from "@/lib/gsap";
import Logo from "@/components/Logo";
import { useAltLocalePath } from "@/lib/alt-locale-context";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const el = menuRef.current;
    if (!el) return;
    if (open) {
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        el.querySelectorAll(".mobile-link"),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.1, ease: "power3.out" }
      );
    } else if (el) {
      gsap.to(el, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    }
  }, [open]);

  const otherLocale = locale === "en" ? "es" : "en";
  const altPath = useAltLocalePath();
  const localeSwitchHref = altPath ?? pathname;

  const navMuted = scrolled ? "text-card-fg-muted" : "text-fg-muted";
  const navBase = scrolled ? "text-card-fg" : "text-fg";
  const navBorder = scrolled ? "border-card-border" : "border-border";

  const isLinkActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isNavItemActive = (link: (typeof NAV_LINKS)[number]) =>
    isLinkActive(link.href) || ("children" in link && !!link.children?.some((c) => isLinkActive(c.href)));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-card-border bg-card shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-px flex items-center justify-between h-20">
        <Link href="/" className="group flex items-center">
          <Logo height={57} dark={scrolled} />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = isNavItemActive(link);
            return (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-sm transition-colors py-2 ${
                    active ? "text-accent" : `${navMuted} hover:text-accent`
                  }`}
                >
                  {t(link.key)}
                  {"children" in link && link.children && (
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                </Link>
                {"children" in link && link.children && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="min-w-[160px] rounded-xl border border-card-border bg-card p-2 shadow-2xl shadow-black/40">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block rounded-lg px-3 py-2 text-sm transition-colors whitespace-nowrap hover:bg-card-soft hover:text-accent ${
                            isLinkActive(child.href) ? "text-accent" : "text-card-fg-muted"
                          }`}
                        >
                          {t(child.key)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={localeSwitchHref}
            locale={otherLocale}
            className={`hidden lg:inline-flex items-center gap-1.5 text-sm ${navMuted} hover:text-accent transition-colors`}
            aria-label={otherLocale === "es" ? "Ver en español" : "View in English"}
          >
            <span aria-hidden="true">{otherLocale === "es" ? "🇲🇽" : "🇺🇸"}</span>
            {otherLocale === "es" ? "Español" : "English"}
          </Link>
          <Link
            href="/calendar"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg hover:bg-accent-soft transition-colors"
          >
            {t("bookACall")}
            <ArrowUpRight size={15} />
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border ${navBorder} ${navBase}`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        className="md:hidden fixed inset-0 top-20 z-40 hidden flex-col justify-between bg-card px-6 pb-10 pt-4"
        style={{ height: "calc(100dvh - 5rem)" }}
      >
        <div className="flex flex-col gap-1">
          {NAV_LINKS.flatMap((link) =>
            "children" in link && link.children
              ? [
                  { key: link.key, href: link.href, isChild: false },
                  ...link.children.map((c) => ({ key: c.key, href: c.href, isChild: true })),
                ]
              : [{ key: link.key, href: link.href, isChild: false }]
          ).map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href + link.key}
                href={link.href}
                className={`mobile-link font-display py-3 border-b border-card-border ${
                  active ? "text-accent" : "text-card-fg"
                } ${link.isChild ? "pl-4 text-xl" : "text-3xl"} ${
                  link.isChild && !active ? "text-card-fg-muted" : ""
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href={localeSwitchHref}
            locale={otherLocale}
            className="mobile-link inline-flex items-center justify-center gap-1.5 rounded-full border border-card-border py-3.5 text-base font-medium text-card-fg"
          >
            {otherLocale === "es" ? "Ver en español" : "View in English"}
          </Link>
          <Link
            href="/calendar"
            className="mobile-link inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-3.5 text-base font-medium text-bg"
          >
            {t("bookACall")}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
