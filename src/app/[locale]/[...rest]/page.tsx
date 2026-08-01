import { notFound } from "next/navigation";

// Catches any path that doesn't match a real route (e.g. /asd, /blog/typo-url).
// Without this, an unmatched path can't be resolved to a locale at all, so
// Next.js falls back past [locale]/layout.tsx to the bare root layout —
// which has no <html>/<body> — instead of rendering [locale]/not-found.tsx
// with the site's actual Nav/Footer/theme.
export default function CatchAll() {
  notFound();
}
