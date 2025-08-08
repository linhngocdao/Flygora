import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import QueryProvider from "@/provider/Query.provider";
import ScrollToTop from "@/components/ui/ScrollToTop";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    vi: "Flygora Travel - Premium Experience Tour",
    en: "Flygora Travel - Premium Experience Tour",
  };

  const descriptions = {
    vi: "Nền tảng đặt tour du lịch mạo hiểm hàng đầu Việt Nam. Khám phá những điểm đến độc đáo với Go Travel.",
    en: "Leading adventure travel platform in Vietnam. Discover unique destinations with Go Travel.",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    icons: {
      icon: [
        { url: "/images/homePage/flygora.svg" },
        { url: "/images/homePage/flygora.svg", sizes: "32x32", type: "image/svg+xml" },
      ],
      shortcut: "/images/homePage/flygora.svg",
      apple: [{ url: "/images/homePage/flygora.svg", sizes: "180x180", type: "image/svg+xml" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <QueryProvider>
        <ScrollToTop>{children}</ScrollToTop>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
