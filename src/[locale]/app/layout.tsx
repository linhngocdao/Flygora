import type {Metadata} from "next";
import "../styles/globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import localFont from 'next/font/local'

const geomanist = localFont({
  src: [{
    path: './fonts/Geomanist-Regular.woff2', weight: '400', style: 'normal',
  }, {
    path: './fonts/Geomanist-Book.woff2', weight: '300', style: 'normal',
  }, {
    path: './fonts/Geomanist-Medium.woff2', weight: '500', style: 'normal',
  }, {
    path: './fonts/Geomanist-Bold.woff2', weight: '700', style: 'normal',
  }], variable: '--font-geomanist'
})

const svnKingston = localFont({
  src: './fonts/SVN-Kingston-Regular.woff2', variable: '--font-kingston'
})


export const metadata: Metadata = {
  title: "GO TRAVEL",
  description: "Go Travel - Khám phá thế giới cùng chúng tôi",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${geomanist.variable} ${svnKingston.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
