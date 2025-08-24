"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { TourFormSchema } from "@/lib/validations/tour.validation";

type TourFormValues = z.infer<typeof TourFormSchema>;

interface TourPreviewProps {
  data: Partial<TourFormValues>;
  deviceMode: "desktop" | "tablet" | "mobile";
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode | string;
  icon?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon && (
        <Image
          style={{ objectFit: "contain", color: "white" }}
          src={icon}
          alt={icon}
          className="brightness-0 invert"
          width={20}
          height={20}
        />
      )}
      <div className="text-gray-100 w-[120px] shrink-0">{label}</div>
      <div className="text-white font-semibold">{value || "Chưa điền"}</div>
    </div>
  );
}

function Feature({ iconUrl, text }: { iconUrl?: string; text: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-gray-700">
      <div className="relative w-12 h-12">
        {iconUrl ? (
          <Image src={iconUrl} alt="" fill className="object-contain" />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-400 text-xs">Icon</span>
          </div>
        )}
      </div>
      <div className="flex-1 font-semibold">{text}</div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[8px] bg-white p-3 md:p-4 lg:p-6 ${className}`}>{children}</div>;
}

// Accordion component for Tour Details
type AccordionItem = {
  title: string;
  content: React.ReactNode;
  id?: string;
};

function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((it, idx) => (
        <details
          key={it.title}
          id={`accordion-${idx}`}
          className="border-b border-gray-200 pb-3 group"
        >
          <summary className="flex items-center justify-between py-3 cursor-pointer text-gray-900 hover:text-primary outline-none list-none">
            <span className="uppercase text-lg font-semibold">{it.title}</span>
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              className="transition-transform group-open:rotate-180"
            >
              <path
                d="M15.1657 0.920372C10.6797 0.623372 6.19372 0.537373 1.70772 0.530373C0.862718 0.500373 0.383718 1.62637 1.01172 2.21137C3.24272 4.53637 5.63372 6.95437 7.93072 9.19837C8.28672 9.56037 8.87172 9.56037 9.22672 9.19837C11.3397 7.04937 13.4127 4.86137 15.4197 2.60637C15.7267 2.27337 15.7987 1.96637 15.7217 1.77437C16.2037 1.51237 16.0837 0.989372 15.1657 0.920372ZM8.62872 7.26737C7.12772 5.66737 5.56872 4.03937 4.01372 2.45137C7.55772 2.37137 11.1007 2.22737 14.6447 1.95537C12.5917 3.67937 10.5967 5.45937 8.62872 7.26737Z"
                fill="currentColor"
              />
            </svg>
          </summary>
          <div className="text-gray-700 text-sm">{it.content}</div>
        </details>
      ))}
    </div>
  );
}

export default function TourPreview({ data, deviceMode }: TourPreviewProps) {
  // Format giá tiền
  const formatPrice = (price?: number) => {
    if (!price) return "Chưa có giá";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Fallback values khi chưa có dữ liệu
  const tourTitle = data.title || "Tiêu đề tour sẽ hiển thị ở đây";
  const tourDescription = data.description || "Mô tả chi tiết tour sẽ hiển thị ở đây...";
  const coverImage = data.cover || "/images/homePage/banner-home.webp";
  const salePrice = data.sale_price || 0;
  const originalPrice = data.original_price || 0;
  const tourDays = data.tour_days || "Chưa điền";
  const tourNights = data.tour_nights || "Chưa điền";
  const participantMin = data.participant_min || "Chưa điền";
  const participantMax = data.participant_max || "Chưa điền";
  const location = data.location || "Chưa điền địa điểm";
  const ageRequirement = data.age_requirement || "Chưa điền";

  return (
    <main className="tour-detail-preview bg-white min-h-full pb-20 xl:pb-0">
      {/* Hero Banner */}
      <section>
        <div
          className={`tour-detail-banner relative w-full overflow-hidden ${
            deviceMode === "mobile" ? "h-[250px]" : "md:h-[500px] h-[300px]"
          }`}
        >
          <Image
            src={coverImage}
            alt={tourTitle}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute w-full h-full bottom-[-1px] left-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      </section>

      {/* Green Info Section */}
      <section className="bg-[#34430f] py-8 md:py-11 lg:py-16">
        <div className="container mx-auto grid grid-cols-12 md:gap-x-8">
          {/* Left content */}
          <div className="col-span-12 xl:col-span-8">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-2">
                <h1 className="text-white uppercase text-2xl md:text-3xl font-bold">{tourTitle}</h1>
                <div
                  className="text-gray-50"
                  dangerouslySetInnerHTML={{
                    __html:
                      tourDescription.length > 300
                        ? tourDescription.substring(0, 300) + "..."
                        : tourDescription,
                  }}
                />
              </div>

              <div className="h-px bg-primary/70" />

              <div className="md:flex lg:space-x-16 md:space-x-11 space-y-4 md:space-y-0">
                <div className="space-y-4 md:w-1/2">
                  <InfoRow
                    label="Duration"
                    value={`${tourDays} ngày ${tourNights} đêm`}
                    icon="/images/others/duration.svg"
                  />
                  <InfoRow
                    label="Participant"
                    value={`${participantMin} - ${participantMax} người`}
                    icon="/images/others/participant.svg"
                  />
                  <InfoRow
                    label="Departure Day"
                    value="Everyday"
                    icon="/images/others/departureDay.svg"
                  />
                </div>
                <div className="flex-grow space-y-4">
                  <InfoRow
                    label="Meeting point"
                    value={location}
                    icon="/images/others/meetingPoint.svg"
                  />
                  <InfoRow
                    label="Overall rating"
                    value={
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">4.9/5</span>
                        <span className="text-gray-50">(Preview)</span>
                      </div>
                    }
                    icon="/images/others/overating.svg"
                  />
                  <InfoRow label="Age" value={ageRequirement} icon="/images/others/age.svg" />
                </div>
              </div>

              <p className="md:w-1/2 text-gray-50">
                {tourDescription.length > 200
                  ? tourDescription.substring(0, 200) + "..."
                  : tourDescription}
              </p>
            </div>
          </div>

          {/* Right sidebar - desktop only */}
          <aside className="hidden xl:block col-span-4 xl:pt-0 xl:pl-8">
            <div className="sticky top-[84px] space-y-4">
              <Button
                variant="outline"
                className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-[#34430f]"
              >
                View Image
              </Button>
              <div className="p-6 rounded-[8px] bg-white xl:space-y-4 max-md:space-y-4 xl:block md:flex md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-700 text-sm">Price</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      {originalPrice > salePrice && salePrice > 0 && (
                        <div className="text-gray-400 line-through text-sm">
                          {formatPrice(originalPrice)}
                        </div>
                      )}
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(salePrice || originalPrice)}
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Book Tour</Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative bg-gray-100">
        <div className="container mx-auto grid grid-cols-12 md:gap-x-8">
          <div className="col-span-12 xl:col-span-8">
            <div className="">
              {/* Tour Highlights */}
              <section id="highlight" className="py-4">
                <Card className="space-y-4">
                  <h2 className="uppercase text-2xl font-bold text-gray-800 mb-4">Highlight</h2>
                  {data.tour_highlights && data.tour_highlights.length > 0 ? (
                    data.tour_highlights.map((highlight, index) => (
                      <Feature
                        key={index}
                        iconUrl={highlight.icon}
                        text={
                          <div>
                            <div className="font-semibold">{highlight.title}</div>
                            {highlight.description && (
                              <div className="text-sm text-gray-600 mt-1">
                                {highlight.description}
                              </div>
                            )}
                          </div>
                        }
                      />
                    ))
                  ) : (
                    <div className="text-gray-500 text-center py-8">
                      Điểm nổi bật sẽ hiển thị ở đây khi bạn thêm vào form
                    </div>
                  )}
                </Card>
              </section>

              {/* Tour Images */}
              {data.tour_images && data.tour_images.length > 0 && (
                <section id="photos" className="py-4">
                  <Card>
                    <h2 className="uppercase text-2xl font-bold text-gray-800 mb-4">Photos</h2>
                    <div className="grid grid-cols-6 gap-1 md:gap-4">
                      {/* Main large image */}
                      <div className="relative col-span-6 aspect-[2/1] overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity">
                        {data.tour_images[0]?.image_url ? (
                          <Image
                            src={data.tour_images[0].image_url}
                            alt={data.tour_images[0].caption || "Photo hero"}
                            fill
                            sizes="(min-width: 1024px) 1110px, 100vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">Ảnh chính</span>
                          </div>
                        )}
                      </div>

                      {/* Smaller images */}
                      {data.tour_images.slice(1, 4).map((img, i) => (
                        <div
                          key={i}
                          className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                        >
                          {img.image_url ? (
                            <Image
                              src={img.image_url}
                              alt={img.caption || `Photo ${i + 2}`}
                              fill
                              className="object-cover"
                              sizes="33vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">Ảnh {i + 2}</span>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Last two images with overlay */}
                      {data.tour_images.slice(4, 6).map((img, i) => (
                        <div
                          key={i + 4}
                          className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                        >
                          {img.image_url ? (
                            <Image
                              src={img.image_url}
                              alt={img.caption || `Photo ${i + 5}`}
                              fill
                              className="object-cover"
                              sizes="50vw"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">Ảnh {i + 5}</span>
                            </div>
                          )}
                          {i === 1 && data.tour_images && data.tour_images.length > 6 && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="text-white font-bold text-3xl md:text-4xl">
                                +{data.tour_images.length - 6}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </section>
              )}

              {/* Tour Details với Accordion */}
              <section id="tour-detail" className="py-4">
                <Card>
                  <h2 className="uppercase text-2xl font-bold text-gray-800 mb-4">Tour Details</h2>
                  <Accordion
                    items={[
                      {
                        title: "Duration & Schedule",
                        content: (
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span className="font-semibold">
                                {tourDays} ngày {tourNights} đêm
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Departure Day:</span>
                              <span className="font-semibold">Everyday</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Meeting Point:</span>
                              <span className="font-semibold">{location}</span>
                            </div>
                          </div>
                        ),
                      },
                      {
                        title: "Group Size",
                        content: (
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Minimum:</span>
                              <span className="font-semibold">{participantMin} người</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Maximum:</span>
                              <span className="font-semibold">{participantMax} người</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Age Requirement:</span>
                              <span className="font-semibold">{ageRequirement}</span>
                            </div>
                          </div>
                        ),
                      },
                    ].filter(Boolean)} // Chỉ hiển thị các item có dữ liệu
                  />
                </Card>
              </section>

              {/* Itinerary - chỉ hiển thị khi có dữ liệu */}
              {data.tour_intenerary && data.tour_intenerary.length > 0 && (
                <section id="itinerary" className="py-4">
                  <Card>
                    <h2 className="uppercase text-2xl font-bold text-gray-800 mb-4">Itinerary</h2>
                    <div className="space-y-4">
                      {data.tour_intenerary.map((item, index) => (
                        <div key={index} className="border-l-4 border-primary pl-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{item.session}</Badge>
                            <h3 className="font-semibold text-gray-800">{item.title}</h3>
                          </div>
                          {item.description && (
                            <div
                              className="text-gray-600 text-sm"
                              dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </section>
              )}

              {/* Inclusions - chỉ hiển thị khi có dữ liệu */}
              {data.tour_inclusions && data.tour_inclusions.length > 0 && (
                <section id="inclusions" className="py-4">
                  <Card>
                    <h2 className="uppercase text-2xl font-bold text-gray-800 mb-4">
                      What&apos;s Included
                    </h2>
                    <div className="space-y-4">
                      {data.tour_inclusions.map((inclusion, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{inclusion.title}</h4>
                            {inclusion.description && (
                              <div
                                className="text-gray-600 text-sm mt-1"
                                dangerouslySetInnerHTML={{ __html: inclusion.description }}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </section>
              )}

              {/* Videos - chỉ hiển thị khi có dữ liệu */}
              {data.videos && data.videos.length > 0 && (
                <section id="videos" className="py-4">
                  <Card>
                    <h2 className="uppercase text-2xl font-bold text-gray-800 mb-4">Videos</h2>
                    <div className="space-y-4">
                      {data.videos.map((video, index) => (
                        <div key={index} className="space-y-2">
                          <h3 className="font-semibold text-gray-800">{video.title}</h3>
                          {video.description && (
                            <p className="text-gray-600 text-sm">{video.description}</p>
                          )}
                          {video.url && (
                            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                              <div className="text-gray-500 text-center">
                                <div>Video: {video.title}</div>
                                <div className="text-xs mt-1">{video.url}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </section>
              )}
            </div>
          </div>

          {/* Sticky sidebar pricing - desktop */}
          <div className="hidden xl:block col-span-4">
            <div className="sticky top-[84px] mt-[18px] space-y-4">
              <div className="p-6 rounded-[8px] bg-white xl:space-y-4 max-md:space-y-4 xl:block md:flex md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-700 text-sm">Price</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      {originalPrice > salePrice && salePrice > 0 && (
                        <div className="text-gray-400 line-through text-sm">
                          {formatPrice(originalPrice)}
                        </div>
                      )}
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(salePrice || originalPrice)}
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Book Tour</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile fixed pricing */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-gray-700 text-sm">Price</div>
              <div className="text-xl font-semibold text-primary">
                {formatPrice(salePrice || originalPrice)}
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90">Book Tour</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
