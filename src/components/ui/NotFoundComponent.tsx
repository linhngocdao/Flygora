import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/homePage/error-bg.webp)" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 xl:gap-x-8 md:gap-x-[22px]">
          <div className="space-y-4 lg:col-span-6 md:col-span-10 col-span-full lg:col-start-4 md:col-start-2 xl:space-y-8 md:space-y-6">
            <div className="md:w-[351px] w-[320px] h-[200px] mx-auto flex items-end">
              <Image
                width={351}
                height={200}
                src="/images/homePage/status-404.png"
                alt="Trang không tìm thấy"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="font-medium text-center text-gray-200 title-2">
              <span>Oops! Có vẻ như bạn đang đi nhầm hướng. Liên hệ Jungle Boss qua hotline </span>
              <a href="tel:+84917800805" className="lg:hover:text-primary lg:duration-150">
                (+84) 917 800 805
              </a>
              <span> hoặc </span>
              <a href="tel:+84859100222" className="lg:hover:text-primary lg:duration-150">
                (+84) 859 100 222
              </a>
              <span> để chúng tôi giúp bạn tìm đường.</span>
            </div>
            <div className="flex justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
