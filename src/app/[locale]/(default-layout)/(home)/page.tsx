"use client";
import React from "react";
import AllAdventureTour from "@/components/Clients/layout/home/AdventureTours/page";
import HeroSection from "@/components/Clients/layout/home/HeroSection/page";
import WhychooseUsSection from "@/components/Clients/layout/home/WhyChooseUs/page";
import FeaturedTour from "@/components/Clients/layout/home/FeaturedTour/page";
import TeamBuilding from "@/components/Clients/layout/home/TeamBuilding/page";
import GuestReviewSection from "@/components/Clients/layout/home/GuestReview/page";
import SafetyCommitment from "@/components/Clients/layout/home/SafetyCommitment/page";
import FaqSection from "@/components/Clients/layout/home/FAQSection/page";
import RecommendationBanner from "@/components/Clients/layout/home/RecommendationBanner/page";
import SubscribeBanner from "@/components/Clients/layout/home/SubscribeBanner/page";
import FooterIntroPage from "@/components/Clients/layout/home/FooterIntro/page";

export default function Home() {
  return (
    <div>
      <main className="homepage max-lg:pt-[35px]">
        {/* HeroSection */}
        <HeroSection />

        {/* WhyChooseUs */}
        <WhychooseUsSection />

        {/* Feature Tours */}
        <FeaturedTour />

        {/* All Adventure Tours */}
        <AllAdventureTour />

        {/* Team Building Section */}
        <TeamBuilding />

        {/*Guest Review Section*/}
        <GuestReviewSection />

        {/*SafetyCommitment */}
        <SafetyCommitment />

        {/* Faq Section*/}
        <FaqSection />

        {/*Recommendation Banner */}
        <RecommendationBanner />

        <AllAdventureTour />

        {/* Subscribe Banner */}
        <SubscribeBanner />

        {/* Footer Intro Section */}
        <FooterIntroPage />
      </main>
    </div>
  );
}
