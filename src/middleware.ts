import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// The requested URL is the source of truth for locale, not the saved
// NEXT_LOCALE cookie. next-intl's own resolveLocale always lets an explicit
// path prefix (e.g. /es/blog) win outright regardless of localeDetection —
// cookie/Accept-Language are only ever consulted for *unprefixed* paths, and
// with detection on, a stale "es" cookie would force-redirect ANY unprefixed
// URL (including the bare "/") to its /es equivalent — 404ing on WordPress
// content, whose translations don't share slugs. localeDetection: false
// disables that entirely: every unprefixed path, including "/", always
// serves the default locale (English) regardless of cookie/Accept-Language.
export default createMiddleware({ ...routing, localeDetection: false });

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
