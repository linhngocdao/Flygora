import type { Metadata } from "next";
import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import localFont from "next/font/local";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const geomanist = localFont({
  src: [
    {
      path: "../../../public/fonts/Geomanist-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Geomanist-Book.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Geomanist-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Geomanist-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geomanist",
});

const svnKingston = localFont({
  src: "../../../public/fonts/SVN-Kingston-Regular.woff2",
  variable: "--font-kingston",
});

export const metadata: Metadata = {
  title: "GO TRAVEL",
  description: "Go Travel - Khám phá thế giới cùng chúng tôi",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", sizes: "32x32", type: "image/png" }],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <body className={`${geomanist.variable} ${svnKingston.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
