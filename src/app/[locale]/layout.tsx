import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaFormSection from "@/components/CtaFormSection";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import { AltLocaleProvider } from "@/lib/alt-locale-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "general" });
  const title = `${SITE.name} | ${t("metaTitle")}`;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: title,
      template: `%s | ${SITE.name}`,
    },
    description: t("tagline"),
    keywords: [
      "Denver web design",
      "Denver SEO",
      "web designer Denver CO",
      "SEO agency Denver",
      "small business website design Colorado",
    ],
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        en: "/",
        es: "/es",
      },
    },
    openGraph: {
      title,
      description: t("tagline"),
      url: SITE.url,
      siteName: SITE.name,
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("tagline"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "general" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    description: t("tagline"),
    email: SITE.email,
    telephone: SITE.phoneHref,
    url: SITE.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Denver",
      addressRegion: "CO",
      addressCountry: "US",
    },
    areaServed: "Denver, CO",
    priceRange: "$$",
  };

  return (
    <html lang={locale} className={`${inter.variable} ${bricolage.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <AltLocaleProvider>
            <SmoothScroll>
              <div className="bg-fx" aria-hidden="true" />
              <div className="grain" aria-hidden="true" />
              <Nav />
              <main className="relative z-10">{children}</main>
              <CtaFormSection />
              <Footer />
            </SmoothScroll>
          </AltLocaleProvider>
        </NextIntlClientProvider>
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
