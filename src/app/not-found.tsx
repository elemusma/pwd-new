import Link from "next/link";

// Last-resort fallback if a request somehow bypasses [locale]/[...rest] and
// falls back past [locale]/layout.tsx (see that route's comment). Next.js
// requires <html>/<body> here since no other layout in the tree provides
// them at this level, and globals.css isn't loaded this far up, so this
// stays deliberately plain/inline-styled rather than matching the full site.
export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: "#08090a",
          color: "#f4f3ef",
          fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p style={{ fontSize: "3rem", color: "#10a9e5", margin: 0 }}>404</p>
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>Page not found.</h1>
        <Link href="/" style={{ color: "#10a9e5" }}>
          Go back home
        </Link>
      </body>
    </html>
  );
}
