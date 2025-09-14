import ButtonPrimary from "@/components/Clients/ui/buttonPrimary";
import { useTranslations } from "next-intl";
import Image from "next/image";

const EmptyPage = () => {
  const t = useTranslations("common");
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
            <div className="text-center text-gray-200 text-[1rem] md:text-[1rem] lg:text-[1.2rem] font-bold">
              <span>
                Oops! Có vẻ như bạn đang đi nhầm hướng. Liên hệ Flygora Travel qua hotline
              </span>
              <a href="tel:+84793946789" className="lg:hover:text-primary lg:duration-150">
                (+84) 793 946 789
              </a>
              <span> hoặc </span>
              <a href="tel:+84397897222" className="lg:hover:text-primary lg:duration-150">
                (+84) 397 897 222
              </a>
              <span> để chúng tôi giúp bạn tìm đường.</span>
            </div>
            <div className="flex justify-center">
              <ButtonPrimary name={t("backtoHome")} href="/" className="p-20" fullWidth />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmptyPage;
