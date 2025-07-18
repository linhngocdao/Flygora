import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Script from "next/script";
import localFont from "next/font/local";

const geomanist = localFont({
  src: [
    {
      path: "../../public/fonts/Geomanist-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Geomanist-Book.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Geomanist-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Geomanist-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geomanist",
});

const svnKingston = localFont({
  src: "../../public/fonts/SVN-Kingston-Regular.woff2",
  variable: "--font-kingston",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const { locale } = await params;
  return (
    <html className="scroll-smooth" lang={locale}>
      <head>
        <meta
          name="google-site-verification"
          content="VcvjRVy6m_ytCbrFg_zW87BsDG4lFd2RGQDYu8IX_JQ"
        />
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${geomanist.variable} ${svnKingston.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
