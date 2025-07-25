"use client";
import React from "react";
import HeaderGotravel from "../layout/client/HeaderClient";
import FooterGotravel from "../layout/client/FooterClient";
import FloatButtonMenu from "@/components/Clients/ui/FloatButtonMenu";
import ScrollToTop from "@/components/Clients/ui/ScrollToTop";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderGotravel />
      <main className="max-lg:pt-[68px]">{children}</main>
      <FloatButtonMenu />
      <ScrollToTop />
      <FooterGotravel />
    </div>
  );
}
