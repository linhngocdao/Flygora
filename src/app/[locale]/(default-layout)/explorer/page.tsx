"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SubscribeBanner from "@/components/Clients/layout/home/SubscribeBanner/page";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  publishDate: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
  color: string;
}

const ExplorerPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Categories data
  const categories: Category[] = [
    { id: "all", name: "All Posts", count: 6, color: "bg-gray-600" },
    { id: "food-tours", name: "Food Tours", count: 4, color: "bg-yellow-600" },
    { id: "team-building", name: "Team Building", count: 1, color: "bg-green-600" },
    { id: "travel-guides", name: "Travel Guides", count: 2, color: "bg-blue-600" },
    { id: "cultural-experiences", name: "Cultural Experiences", count: 1, color: "bg-purple-600" },
  ];

  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Vietnam Itinerary 5 days - Top three tours",
      excerpt:
        "Discover the best of Vietnam in just 5 days with our carefully curated food tours that showcase authentic flavors...",
      image: "/images/homePage/foodtour1.jpg",
      category: "food-tours",
      readTime: "5 min read",
      publishDate: "Dec 15, 2024",
      slug: "vietnam-itinerary-5-days",
    },
    {
      id: 2,
      title: "How to do Hanoi food tour under $100?",
      excerpt:
        "Experience the authentic taste of Hanoi's street food culture without breaking the bank. Our budget-friendly guide...",
      image: "/images/homePage/foodtour2.jpg",
      category: "food-tours",
      readTime: "7 min read",
      publishDate: "Dec 10, 2024",
      slug: "hanoi-food-tour-budget",
    },
    {
      id: 3,
      title: "Ultimate guide for Hanoi Food Tours 2025",
      excerpt:
        "From traditional pho to modern fusion cuisine, explore Hanoi's culinary landscape with our comprehensive guide...",
      image: "/images/homePage/foodtour3.jpg",
      category: "travel-guides",
      readTime: "10 min read",
      publishDate: "Dec 5, 2024",
      slug: "hanoi-food-tours-guide-2025",
    },
    {
      id: 4,
      title: "Street Food Adventure - Best spots in Old Quarter",
      excerpt:
        "Navigate through Hanoi's bustling Old Quarter and discover hidden gems where locals eat authentic Vietnamese cuisine...",
      image: "/images/homePage/foodtour4.jpg",
      category: "food-tours",
      readTime: "6 min read",
      publishDate: "Nov 28, 2024",
      slug: "street-food-old-quarter",
    },
    {
      id: 5,
      title: "Team Building with Vietnamese Cooking Classes",
      excerpt:
        "Strengthen your team bonds while learning to cook traditional Vietnamese dishes in our interactive cooking experiences...",
      image: "/images/homePage/teambuilding1.jpg",
      category: "team-building",
      readTime: "8 min read",
      publishDate: "Nov 20, 2024",
      slug: "team-building-cooking-classes",
    },
    {
      id: 6,
      title: "Traditional Vietnamese Breakfast Tours",
      excerpt:
        "Start your day like a local with our morning food tours featuring traditional Vietnamese breakfast specialties...",
      image: "/images/homePage/foodtour5.jpg",
      category: "food-tours",
      readTime: "5 min read",
      publishDate: "Nov 15, 2024",
      slug: "vietnamese-breakfast-tours",
    },
  ];

  // Filter posts based on selected category
  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || "Tourism Blog";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Section */}

      <section className="relative md:h-[500px] h-[400px] max-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/aboutUs/banner.webp"
            alt="image banner explore"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 w-full h-full bg-linear" />
        <div className="relative flex items-center justify-center h-full">
          <div className="container translate-y-14">
            <h1 className="text-center font-bold uppercase text-[#EDE52A] text-[2rem] md:text-[2rem] lg:text-[2.5rem]">
              Inspiration For Your Next Trip
            </h1>
          </div>
        </div>
      </section>

      {/* Blog Content Layout */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Blog Post - Left Side */}
            <div className="lg:col-span-2">
              <Link href={`/explorer/${filteredPosts[0]?.slug || "vietnam-itinerary-5-days"}`}>
                <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group cursor-pointer">
                  {/* Featured Image Container */}
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={filteredPosts[0]?.image || "/images/homePage/foodtour1.jpg"}
                      alt={filteredPosts[0]?.title || "Featured Post"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
                        {getCategoryName(filteredPosts[0]?.category)}
                      </span>
                    </div>

                    {/* Decorative leaves */}
                    <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                      <Image
                        src="/images/homePage/leaf-bg-right.webp"
                        alt="Leaf decoration"
                        width={80}
                        height={100}
                        className="w-12 h-auto"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                      <Image
                        src="/images/homePage/leaf-bg-left.webp"
                        alt="Leaf decoration"
                        width={80}
                        height={100}
                        className="w-12 h-auto"
                      />
                    </div>
                  </div>

                  {/* Featured Content */}
                  <div className="p-8">
                    <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                      <span>{filteredPosts[0]?.publishDate}</span>
                      <span>•</span>
                      <span>{filteredPosts[0]?.readTime}</span>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300 leading-tight">
                      {filteredPosts[0]?.title}
                    </h2>

                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {filteredPosts[0]?.excerpt}
                    </p>

                    <Link
                      href={`/explorer/${filteredPosts[0]?.slug || "vietnam-itinerary-5-days"}`}
                      className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg group/btn"
                    >
                      Read Full Article
                      <svg
                        className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              </Link>
            </div>

            {/* Blog Posts Sidebar - Right Side */}
            <div className="lg:col-span-1">
              {/* Categories Section */}
              <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 text-left group ${
                        selectedCategory === category.id
                          ? "bg-green-100 border-2 border-green-500 text-green-800"
                          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent text-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          selectedCategory === category.id
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Posts</h3>
                {filteredPosts.slice(1).map((post) => (
                  <Link key={post.id} href={`/explorer/${post.slug}`}>
                    <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer">
                      {/* Small Image Container */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {getCategoryName(post.category)}
                          </span>
                        </div>
                      </div>

                      {/* Small Content */}
                      <div className="p-4">
                        <div className="flex items-center text-xs text-gray-500 mb-2 space-x-2">
                          <span>{post.publishDate}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300 leading-tight line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{post.excerpt}</p>

                        <Link
                          href={`/explorer/${post.slug}`}
                          className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors duration-300 text-sm group/btn"
                        >
                          Read More
                          <svg
                            className="w-3 h-3 ml-1 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <SubscribeBanner className="pt-15" />
    </div>
  );
};

export default ExplorerPage;
