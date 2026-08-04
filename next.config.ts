import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "resources.precisewolf.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/articles/:path*",
        destination: "/blog/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|es)/articles/:path*",
        destination: "/:locale/blog/:path*",
        permanent: true,
      },
      {
        source: "/practice-areas/seo",
        destination: "/services/seo",
        permanent: true,
      },
      {
        source: "/practice-areas/web-design",
        destination: "/services/web-design",
        permanent: true,
      },
      {
        source: "/practice-areas/ecommerce",
        destination: "/services/ecommerce",
        permanent: true,
      },
      {
        source: "/blog/long-tail-keywods",
        destination: "/blog/long-tail-keywords",
        permanent: true,
      },
      {
        source: "/blog/what-lawyers-want",
        destination: "/blog/lawyers-experts-websites",
        permanent: true,
      },
      {
        source: "/blog/crawlability",
        destination: "/blog/what-is-crawlability",
        permanent: true,
      },
      {
        source: "/blog/peer-reviewed-expert-witness",
        destination: "/blog/lawyers-experts-websites",
        permanent: true,
      },
      {
        source: "/blog/ai-ranking",
        destination: "/blog/ai-powered-search",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
