/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.flygora.com/", // Thay đổi thành domain thực của bạn
  generateRobotsTxt: true, // Tạo robots.txt
  sitemapSize: 7000, // Giới hạn số URL trong mỗi sitemap
  changefreq: "daily", // Tần suất thay đổi content
  priority: 0.7, // Độ ưu tiên mặc định

  // Cấu hình cho đa ngôn ngữ (vi/en)
  alternateRefs: [
    {
      href: "https://www.flygora.com/vi", // Domain tiếng Việt
      hreflang: "vi",
    },
    {
      href: "https://www.flygora.com/en", // Domain tiếng Anh
      hreflang: "en",
    },
  ],

  // Loại trừ các route không cần index
  exclude: [
    "/admin/*", // Trang admin
    "/api/*", // API routes
    "/404", // Trang lỗi
    "/500", // Trang lỗi server
    "/_error", // Next.js error pages
    "/_document", // Next.js document
    "/_app", // Next.js app
  ],

  // Custom transform cho từng URL
  transform: async (config, path) => {
    // Ưu tiên cao cho trang chủ
    if (path === "/vi" || path === "/en") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Ưu tiên trung bình cho các trang tour
    if (path.includes("/tours")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Ưu tiên thấp cho các trang khác
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  // Cấu hình robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"], // Chặn crawl admin và api
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin"], // Google có thể crawl api nhưng không crawl admin
      },
    ],
    additionalSitemaps: ["https://www.flygora.com/sitemap.xml"],
  },
};
