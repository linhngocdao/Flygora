import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
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
    ],
    // Thêm cấu hình Netlify Image CDN
    loader: "custom",
    loaderFile: "./src/lib/netlify-image-loader.ts",
  },
  // Tối ưu hóa cho Netlify
  output: "export", // Hỗ trợ static export cho Netlify
  // Vô hiệu hóa strict mode trong production
  reactStrictMode: process.env.NODE_ENV === "development",
};

export default withNextIntl(nextConfig);
