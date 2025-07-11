import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['cms.junglebosstours.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.junglebosstours.com',
        port: '',
        pathname: '/assets/**',
      }
    ]
  }
};

export default withNextIntl(nextConfig);
