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
    ];
  },
};

export default withNextIntl(nextConfig);
