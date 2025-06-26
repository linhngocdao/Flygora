import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cms.junglebosstours.com'],
    // Hoặc sử dụng remotePatterns cho Next.js 13+
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

export default nextConfig;
