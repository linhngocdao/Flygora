import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://52.64.94.227/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.junglebosstours.com",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "junglebosstours.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost:5555",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
