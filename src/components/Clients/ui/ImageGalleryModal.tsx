"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  title?: string;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  title = "Thư viện ảnh tour",
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Reset index when modal opens - sử dụng useEffect để đồng bộ index
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      // Prevent body scroll on mobile khi modal mở
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      // Restore body scroll khi modal đóng
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }

    // Cleanup khi component unmount
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, initialIndex]);

  // Navigation functions - sử dụng useCallback để tránh re-render
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Touch handlers for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Keyboard navigation - xử lý điều hướng bằng phím
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToPrevious, goToNext, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[100vw] max-h-[100vh] md:max-w-6xl md:max-h-[95vh] p-0 overflow-hidden md:rounded-lg rounded-none"
        showCloseButton={false}
      >
        {/* Header với title và close button custom */}
        <DialogHeader className="p-3 md:p-6 border-b bg-white relative">
          <DialogTitle className="text-base md:text-xl font-semibold text-gray-900 pr-10">
            {title}
          </DialogTitle>
          {/* Custom close button cho mobile */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 md:right-6 md:top-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
            aria-label="Đóng modal"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </DialogHeader>

        {/* Container chính cho ảnh */}
        <div className="relative bg-black flex-1 min-h-[50vh] md:min-h-0">
          {/* Ảnh chính - với touch support cho mobile */}
          <div
            className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full touch-none select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={images[currentIndex]}
              alt={`Ảnh tour ${currentIndex + 1}`}
              fill
              className="object-contain pointer-events-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
              draggable={false}
            />

            {/* Swipe indicator overlay cho mobile */}
            <div className="md:hidden absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/20 to-transparent h-16 flex items-end justify-center pb-2">
              <div className="text-white/60 text-xs bg-black/40 px-2 py-1 rounded-full">
                ← Vuốt để chuyển ảnh →
              </div>
            </div>
          </div>

          {/* Navigation arrows - tối ưu cho mobile */}
          {images.length > 1 && (
            <>
              {/* Nút Previous */}
              <Button
                variant="secondary"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all hover:scale-105 md:hover:scale-110 z-10"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-700" />
              </Button>

              {/* Nút Next */}
              <Button
                variant="secondary"
                size="icon"
                onClick={goToNext}
                className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all hover:scale-105 md:hover:scale-110 z-10"
                aria-label="Ảnh tiếp theo"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-700" />
              </Button>
            </>
          )}

          {/* Counter hiển thị số thứ tự ảnh - tối ưu mobile */}
          {images.length > 1 && (
            <div className="absolute bottom-1 md:bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail navigation - responsive và mobile-friendly */}
        {images.length > 1 && (
          <div className="p-2 md:p-6 bg-gray-50 border-t max-h-[25vh] md:max-h-none overflow-hidden">
            <div className="flex gap-1 md:gap-2 overflow-x-auto pb-1 md:pb-2 scrollbar-hide scroll-smooth">
              {images.map((image, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`relative flex-shrink-0 w-12 h-8 md:w-20 md:h-16 p-0 rounded-md md:rounded-lg overflow-hidden border-2 transition-all touch-manipulation ${
                    index === currentIndex
                      ? "border-primary ring-1 md:ring-2 ring-primary/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Chuyển đến ảnh ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 48px, 80px"
                  />
                  {/* Active indicator for mobile */}
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-primary/10 md:bg-transparent" />
                  )}
                </Button>
              ))}
            </div>
            {/* Scroll hint for mobile */}
            <div className="md:hidden text-center mt-1">
              <div className="text-xs text-gray-500">Vuốt để xem thêm ảnh</div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageGalleryModal;
