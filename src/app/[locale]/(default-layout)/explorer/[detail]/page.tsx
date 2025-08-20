"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SubscribeBanner from "@/components/Clients/layout/home/SubscribeBanner/page";

interface BlogDetailPageProps {
  params: {
    detail: string;
    locale: string;
  };
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  tags: string[];
  slug: string;
}

interface RelatedPost {
  id: number;
  title: string;
  image: string;
  category: string;
  readTime: string;
  publishDate: string;
  slug: string;
}

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

const BlogDetailPage = ({ params }: BlogDetailPageProps) => {
  console.log(params);

  const [copiedLink, setCopiedLink] = useState(false);

  // Table of Contents data
  const tableOfContents: TOCItem[] = [
    { id: "link-339-facebook", title: "1. Link 339 Facebook là gì?", level: 1 },
    { id: "tac-dung-link-339", title: "2. Tác dụng của link 339", level: 1 },
    { id: "khi-nao-can-su-dung", title: "3. Khi nào cần sử dụng link 339", level: 1 },
    {
      id: "cach-mo-khoa-facebook",
      title: "4. Cách mở khóa Facebook khi bị xác minh danh tính",
      level: 1,
    },
    { id: "luu-y-mo-khoa", title: "5. Một số lưu ý khi mở khóa xác minh danh tính", level: 1 },
    { id: "cung-cap-thong-tin", title: "5.1. Cung cấp thông tin chính xác", level: 2 },
    { id: "kien-nhan-cho-doi", title: "5.2. Kiên nhẫn chờ đợi", level: 2 },
    { id: "tuan-thu-chinh-sach", title: "5.3. Tuân thủ chính sách của Facebook", level: 2 },
    { id: "lien-he-ho-tro", title: "5.4. Liên hệ với bộ phận hỗ trợ", level: 2 },
    { id: "h2-tab-media", title: "6. H2: Tab Media- Đơn Vị Mở Khóa 339 Uy Tín Hàng Đầu", level: 1 },
    {
      id: "quy-trinh-chuyen-nghiep",
      title: "6.1. Quy trình chuyên nghiệp – Cam kết minh bạch & bảo mật",
      level: 2,
    },
    {
      id: "toc-do-xu-ly",
      title: "6.2. Tốc độ xử lý nhanh – Nhận kết quả trong vòng 24h – 72h",
      level: 2,
    },
    { id: "ho-tro-24-7", title: "6.3. Hỗ trợ 24/7 – Cam kết đồng hành lâu dài", level: 2 },
    {
      id: "chinh-sach-bao-hanh",
      title: "6.4. Chính sách bảo hành – Hoàn tiền nếu không thành công",
      level: 2,
    },
    { id: "quy-trinh-ho-tro", title: "6.5. Quy trình hỗ trợ mở khóa 339 tại TAB Media", level: 2 },
  ];

  // Copy link function
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Mock data - in real app, this would come from API based on params.detail
  const blogPost: BlogPost = {
    id: 1,
    title: "Vietnam Itinerary 5 days - Top three tours",
    content: `
      <h2 id="link-339-facebook">1. Link 339 Facebook là gì?</h2>
      <p>Link 339 Facebook là một đường dẫn đặc biệt được sử dụng để xác minh danh tính tài khoản Facebook khi bị khóa do vi phạm chính sách hoặc nghi ngờ hoạt động bất thường. Đây là công cụ quan trọng giúp người dùng khôi phục quyền truy cập vào tài khoản của mình một cách nhanh chóng và hiệu quả.</p>

      <h2 id="tac-dung-link-339">2. Tác dụng của link 339</h2>
      <p>Link 339 có vai trò quan trọng trong việc:</p>
      <ul>
        <li><strong>Xác minh danh tính:</strong> Giúp Facebook xác nhận bạn là chủ sở hữu thực sự của tài khoản</li>
        <li><strong>Mở khóa tài khoản:</strong> Khôi phục quyền truy cập khi tài khoản bị hạn chế</li>
        <li><strong>Bảo mật cao:</strong> Đảm bảo tính an toàn và bảo mật cho người dùng</li>
        <li><strong>Tiết kiệm thời gian:</strong> Quy trình xử lý nhanh chóng, hiệu quả</li>
      </ul>

      <h2 id="khi-nao-can-su-dung">3. Khi nào cần sử dụng link 339</h2>
      <p>Bạn cần sử dụng link 339 Facebook trong các trường hợp sau:</p>
      <blockquote>
        "Link 339 là giải pháp tối ưu khi tài khoản Facebook của bạn gặp vấn đề về xác minh danh tính."
      </blockquote>
      <p>Các tình huống thường gặp:</p>
      <ul>
        <li>Tài khoản bị khóa do nghi ngờ spam hoặc hoạt động bất thường</li>
        <li>Facebook yêu cầu xác minh danh tính qua CMND/CCCD</li>
        <li>Tài khoản bị hạn chế chức năng do vi phạm chính sách</li>
        <li>Cần khôi phục tài khoản sau khi bị hack</li>
      </ul>

      <h2 id="cach-mo-khoa-facebook">4. Cách mở khóa Facebook khi bị xác minh danh tính</h2>
      <p>Quy trình mở khóa Facebook thông qua link 339 bao gồm các bước sau:</p>
      <ol>
        <li><strong>Truy cập link 339:</strong> Sử dụng đường dẫn chính thức được cung cấp</li>
        <li><strong>Cung cấp thông tin:</strong> Điền đầy đủ thông tin cá nhân theo yêu cầu</li>
        <li><strong>Upload giấy tờ:</strong> Tải lên hình ảnh CMND/CCCD rõ nét, đúng định dạng</li>
        <li><strong>Chờ xử lý:</strong> Facebook sẽ xem xét và phản hồi trong vòng 24-72 giờ</li>
        <li><strong>Nhận kết quả:</strong> Theo dõi email để nhận thông báo kết quả xử lý</li>
      </ol>

      <h2 id="luu-y-mo-khoa">5. Một số lưu ý khi mở khóa xác minh danh tính</h2>
      <p>Để đảm bảo quá trình mở khóa diễn ra thuận lợi, bạn cần lưu ý những điểm sau:</p>

      <h3 id="cung-cap-thong-tin">5.1. Cung cấp thông tin chính xác</h3>
      <p>Đảm bảo tất cả thông tin cá nhân phải trùng khớp với giấy tờ tùy thân. Bất kỳ sai lệch nào cũng có thể dẫn đến việc từ chối yêu cầu mở khóa.</p>

      <h3 id="kien-nhan-cho-doi">5.2. Kiên nhẫn chờ đợi</h3>
      <p>Quá trình xem xét có thể mất từ 24-72 giờ. Tránh gửi nhiều yêu cầu cùng lúc vì điều này có thể làm chậm quá trình xử lý.</p>

      <h3 id="tuan-thu-chinh-sach">5.3. Tuân thủ chính sách của Facebook</h3>
      <p>Cam kết tuân thủ các quy định và chính sách của Facebook để tránh bị khóa tài khoản trong tương lai.</p>

      <h3 id="lien-he-ho-tro">5.4. Liên hệ với bộ phận hỗ trợ</h3>
      <p>Nếu gặp khó khăn, hãy liên hệ với các dịch vụ hỗ trợ chuyên nghiệp để được tư vấn và hỗ trợ kịp thời.</p>

      <h2 id="h2-tab-media">6. H2: Tab Media- Đơn Vị Mở Khóa 339 Uy Tín Hàng Đầu</h2>
      <p>Tab Media là đơn vị hàng đầu trong lĩnh vực hỗ trợ mở khóa Facebook 339, với nhiều năm kinh nghiệm và tỷ lệ thành công cao. Chúng tôi cam kết mang đến dịch vụ chất lượng nhất cho khách hàng.</p>

      <h3 id="quy-trinh-chuyen-nghiep">6.1. Quy trình chuyên nghiệp – Cam kết minh bạch & bảo mật</h3>
      <p>Tab Media áp dụng quy trình làm việc chuyên nghiệp, minh bạch trong từng bước thực hiện. Chúng tôi cam kết bảo mật tuyệt đối thông tin khách hàng và không sử dụng cho mục đích khác.</p>

      <h3 id="toc-do-xu-ly">6.2. Tốc độ xử lý nhanh – Nhận kết quả trong vòng 24h – 72h</h3>
      <p>Với đội ngũ chuyên gia giàu kinh nghiệm, Tab Media có thể xử lý yêu cầu mở khóa trong thời gian ngắn nhất, thường chỉ từ 24-72 giờ.</p>

      <h3 id="ho-tro-24-7">6.3. Hỗ trợ 24/7 – Cam kết đồng hành lâu dài</h3>
      <p>Đội ngũ tư vấn viên của Tab Media luôn sẵn sàng hỗ trợ khách hàng 24/7, đảm bảo giải đáp mọi thắc mắc và hỗ trợ kịp thời khi cần thiết.</p>

      <h3 id="chinh-sach-bao-hanh">6.4. Chính sách bảo hành – Hoàn tiền nếu không thành công</h3>
      <p>Tab Media cam kết chính sách bảo hành rõ ràng. Nếu không thành công trong việc mở khóa tài khoản, chúng tôi sẽ hoàn lại 100% chi phí cho khách hàng.</p>

      <h3 id="quy-trinh-ho-tro">6.5. Quy trình hỗ trợ mở khóa 339 tại TAB Media</h3>
      <p>Quy trình hỗ trợ tại Tab Media được thiết kế đơn giản và hiệu quả:</p>
      <ol>
        <li><strong>Liên hệ tư vấn:</strong> Khách hàng liên hệ để được tư vấn miễn phí</li>
        <li><strong>Phân tích tình huống:</strong> Chuyên gia phân tích và đưa ra giải pháp phù hợp</li>
        <li><strong>Thực hiện dịch vụ:</strong> Tiến hành các bước mở khóa theo quy trình chuẩn</li>
        <li><strong>Theo dõi kết quả:</strong> Cập nhật tiến độ và thông báo kết quả cho khách hàng</li>
        <li><strong>Hỗ trợ sau dịch vụ:</strong> Tư vấn cách sử dụng tài khoản an toàn trong tương lai</li>
      </ol>

      <p>Liên hệ Tab Media ngay hôm nay để được hỗ trợ mở khóa Facebook 339 một cách nhanh chóng và hiệu quả nhất!</p>
    `,
    excerpt:
      "Discover the best of Vietnam in just 5 days with our carefully curated food tours that showcase authentic flavors...",
    image: "/images/homePage/foodtour1.jpg",
    category: "food-tours",
    readTime: "8 min read",
    publishDate: "Dec 15, 2024",
    author: {
      name: "Chef Minh Nguyen",
      avatar: "/images/homePage/introduce.png",
      bio: "Award-winning chef and culinary expert with over 15 years of experience in Vietnamese cuisine and food tourism.",
    },
    tags: ["Food Tours", "Vietnam Travel", "Culinary Experience", "Street Food", "Cultural Tours"],
    slug: "vietnam-itinerary-5-days",
  };

  const relatedPosts: RelatedPost[] = [
    {
      id: 2,
      title: "How to do Hanoi food tour under $100?",
      image: "/images/homePage/foodtour2.jpg",
      category: "food-tours",
      readTime: "6 min read",
      publishDate: "Dec 10, 2024",
      slug: "hanoi-food-tour-budget",
    },
    {
      id: 3,
      title: "Street Food Adventure - Best spots in Old Quarter",
      image: "/images/homePage/foodtour4.jpg",
      category: "food-tours",
      readTime: "5 min read",
      publishDate: "Nov 28, 2024",
      slug: "street-food-old-quarter",
    },
    {
      id: 4,
      title: "Team Building with Vietnamese Cooking Classes",
      image: "/images/homePage/teambuilding1.jpg",
      category: "team-building",
      readTime: "7 min read",
      publishDate: "Nov 20, 2024",
      slug: "team-building-cooking-classes",
    },
  ];

  const categories = [
    { name: "Food Tours", count: 4, color: "bg-yellow-600" },
    { name: "Team Building", count: 1, color: "bg-green-600" },
    { name: "Travel Guides", count: 2, color: "bg-blue-600" },
    { name: "Cultural Experiences", count: 1, color: "bg-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600 transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link href="/explorer" className="hover:text-yellow-600 transition-colors">
              Explorer
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Vietnam Itinerary 5 days</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <Image src={blogPost.image} alt={blogPost.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Decorative leaves */}
        <div className="absolute top-10 right-10 opacity-30">
          <Image
            src="/images/homePage/leaf-bg-right.webp"
            alt="Leaf decoration"
            width={150}
            height={200}
            className="w-24 h-auto"
          />
        </div>
        <div className="absolute bottom-10 left-10 opacity-30">
          <Image
            src="/images/homePage/leaf-bg-left.webp"
            alt="Leaf decoration"
            width={150}
            height={200}
            className="w-24 h-auto"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <div className="mb-4">
              <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
                Food Tours
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {blogPost.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-gray-200">
              <span>{blogPost.publishDate}</span>
              <span>•</span>
              <span>{blogPost.readTime}</span>
              <span>•</span>
              <span>By {blogPost.author.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Article Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Article Header */}
                <div className="p-8 border-b border-gray-200">
                  <div className="flex items-center space-x-4 mb-6">
                    <Image
                      src={blogPost.author.avatar}
                      alt={blogPost.author.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{blogPost.author.name}</h3>
                      <p className="text-gray-600 text-sm">{blogPost.author.bio}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-8 prose prose-lg max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blogPost.content }}
                  />
                </div>

                {/* Social Sharing */}
                <div className="p-8 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Share on</h4>
                  <div className="flex space-x-4">
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                          "_blank"
                        )
                      }
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        copiedLink
                          ? "bg-green-600 text-white"
                          : "bg-gray-600 text-white hover:bg-gray-700"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {copiedLink ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        )}
                      </svg>
                      <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
                    </button>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Table of Contents */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    Mục lục
                  </h3>
                  <div className="space-y-2">
                    {tableOfContents.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left p-2 rounded-lg transition-all duration-300 hover:bg-yellow-50 hover:text-yellow-700 group ${
                          item.level === 1
                            ? "font-medium text-gray-800"
                            : "ml-4 text-gray-600 text-sm"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mt-2 transition-colors ${
                              item.level === 1 ? "bg-yellow-500" : "bg-gray-400"
                            } group-hover:bg-yellow-600`}
                          ></span>
                          <span className="leading-relaxed">{item.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category, index) => (
                      <Link
                        key={index}
                        href={`/explorer?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                          <span className="font-medium text-gray-700 group-hover:text-gray-900">
                            {category.name}
                          </span>
                        </div>
                        <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Related Posts */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Related Posts</h3>
                  <div className="space-y-6">
                    {relatedPosts.map((post) => (
                      <Link key={post.id} href={`/explorer/${post.slug}`} className="block group">
                        <article className="flex space-x-4">
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                              {post.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500 mt-2 space-x-2">
                              <span>{post.publishDate}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Back to Blog */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <Link
                    href="/explorer"
                    className="flex items-center justify-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      />
                    </svg>
                    <span>Back to Blog</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <SubscribeBanner />
    </div>
  );
};

export default BlogDetailPage;
