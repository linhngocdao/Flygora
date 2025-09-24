import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

//http://52.64.94.227
const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95, 100],
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
        hostname: "localhost",
        port: "5555",
        pathname: "/uploads/images/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
