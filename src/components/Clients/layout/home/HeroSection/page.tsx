"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronDownIcon, UsersIcon, MapPinIcon } from "lucide-react";
import { format } from "date-fns";

const tours = [
  { id: "do-quyen-waterfall-zipline", name: "Do Quyen Waterfall Zipline Experience" },
  { id: "tra-ang-excursion", name: "Tra Ang Excursion 1D" },
  { id: "phong-huong-adventure", name: "Phong Huong Adventure 1D" },
  { id: "elephant-cave-ma-da-valley", name: "Elephant Cave & Ma Da Valley Jungle Trek 1D" },
  { id: "phong-huong-excursion-2d1n", name: "Phong Huong Excursion 2D1N" },
  { id: "phong-huong-adventure-2d1n", name: "Phong Huong Adventure 2D1N" },
  { id: "ma-da-valley-jungle-camping", name: "Ma Da Valley Jungle Camping 2D1N" },
  { id: "hang-pygmy-exploration", name: "Hang Pygmy Exploration 2D1N" },
  { id: "phi-lieng-exploration", name: "Phi Lieng Exploration 2D1N" },
  {
    id: "do-quyen-waterfall-top-adventure",
    name: "Do Quyen Waterfall Top Adventure Conquering 2D1N",
  },
];

const participantOptions = [
  { value: "1", label: "1 pax" },
  { value: "2", label: "2 pax" },
  { value: "3", label: "3 pax" },
  { value: "4", label: "4 pax" },
  { value: "5", label: "5 pax" },
  { value: "6", label: "6 pax" },
  { value: "7", label: "7 pax" },
  { value: "8", label: "8 pax" },
  { value: "9", label: "9 pax" },
  { value: "10", label: "10 pax" },
  { value: "11", label: "11 pax" },
  { value: "12", label: "12 pax" },
  { value: "13", label: "13 pax" },
  { value: "14", label: "14 pax" },
  { value: "15", label: "15 pax" },
  { value: "16", label: "16 pax" },
];

interface SearchFormProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ isMobile = false, onClose }) => {
  const t = useTranslations("common.heroSection");
  const [selectedTour, setSelectedTour] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedParticipants, setSelectedParticipants] = useState<string>("1");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSearch = () => {
    console.log({
      tour: selectedTour,
      date: selectedDate,
      participants: selectedParticipants,
    });
    if (isMobile && onClose) {
      onClose();
    }
  };

  const formContent = (
    <div
      className={cn(
        "bg-white rounded-2xl border-4 border-[rgb(214,226,80)] p-4",
        "shadow-[rgba(0,0,0,0.15)_0px_4px_8px_0px]",
        isMobile ? "w-full" : "xl:px-12 md:px-8"
      )}
    >
      {isMobile && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{t("findYourTrip")}</h2>
        </div>
      )}

      <div
        className={cn(
          "space-y-6",
          !isMobile && "md:flex md:items-center md:space-y-0 md:space-x-8"
        )}
      >
        {/* Tour Selection */}
        <div className="flex-1 space-y-2">
          <label className="block text-sm font-medium text-gray-900">{t("tour")}</label>
          <Select value={selectedTour} onValueChange={setSelectedTour}>
            <SelectTrigger className="w-full h-12 border-gray-200">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4 text-gray-500" />
                <SelectValue placeholder={t("chooseYourTour")} />
              </div>
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {tours.map((tour) => (
                <SelectItem key={tour.id} value={tour.id}>
                  {tour.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!isMobile && <div className="w-px h-8 bg-gray-200" />}

        {/* Date Selection */}
        <div className="flex-1 space-y-2">
          <label className="block text-sm font-medium text-gray-900">{t("bookingDate")}</label>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal border-gray-200",
                  !selectedDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : t("datePlaceholder")}
                <ChevronDownIcon className="ml-auto h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setIsCalendarOpen(false);
                }}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {!isMobile && <div className="w-px h-8 bg-gray-200" />}

        {/* Participant Selection */}
        <div className="flex-1 space-y-2">
          <label className="block text-sm font-medium text-gray-900">{t("participant")}</label>
          <Select value={selectedParticipants} onValueChange={setSelectedParticipants}>
            <SelectTrigger className="w-full h-12 border-gray-200">
              <div className="flex items-center space-x-2">
                <UsersIcon className="h-4 w-4 text-gray-500" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <div className="grid grid-cols-2 gap-1 p-2">
                {participantOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className={cn(isMobile ? "flex justify-center pt-4" : "flex-shrink-0")}>
          <Button
            onClick={handleSearch}
            disabled={!selectedTour || !selectedDate}
            className={cn(
              "bg-[#6c8a1f] hover:bg-[#5a7219] text-white rounded-full",
              "transition-all duration-300 ease-in-out",
              isMobile ? "w-full h-12" : "w-14 h-14"
            )}
          >
            <Image
              src="/images/homePage/ic-search.svg"
              width={25}
              height={25}
              alt="search icon"
              style={{
                filter:
                  "invert(83%) sepia(10%) saturate(241%) hue-rotate(47deg) brightness(97%) contrast(85%)",
              }}
            />
            {isMobile && "Search"}
          </Button>
        </div>
      </div>
    </div>
  );

  return formContent;
};

const HeroSection = () => {
  const t = useTranslations("common.heroSection");
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  return (
    <div>
      <section className="relative z-40 lg:h-[calc(100vh-68px)] md:h-[calc(100vh-160px)]">
        <div className="w-full h-full relative max-md:aspect-[16/9]">
          <Image
            src="/images/homePage/banner-home.webp"
            alt="home banner"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1439px) 100vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </div>

        {/* Search Form Container */}
        <div className="container z-[30] absolute bottom-0 -translate-x-1/2 md:translate-y-1/2 translate-y-[110%] left-1/2">
          {/* Mobile Search Form Trigger */}
          <div className="lg:hidden">
            <Dialog open={isMobileModalOpen} onOpenChange={setIsMobileModalOpen}>
              <DialogTrigger asChild>
                <div className="rounded-2xl border-4 border-[rgb(214,226,80)] bg-white px-8 py-4 cursor-pointer shadow-[rgba(0,0,0,0.15)_0px_4px_8px_0px]">
                  <div className="flex items-center justify-between">
                    <div className="pt-1 text-gray-700 uppercase font-semibold">
                      {t("findYourTrip")}
                    </div>
                    <div className="flex items-center justify-center duration-300 ease-in-out rounded-full bg-[#6c8a1f] w-10 h-10">
                      <Image
                        src="/images/homePage/ic-search.svg"
                        width={20}
                        height={20}
                        alt="search icon"
                        style={{
                          filter:
                            "invert(83%) sepia(10%) saturate(241%) hue-rotate(47deg) brightness(97%) contrast(85%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{t("findYourTrip")}</DialogTitle>
                </DialogHeader>
                <SearchForm isMobile={true} onClose={() => setIsMobileModalOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Desktop Search Form */}
          <div className="max-lg:hidden">
            <SearchForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
