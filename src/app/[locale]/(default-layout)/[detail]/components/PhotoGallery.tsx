import React, { useState } from "react";
import { X } from "lucide-react";
import { TourImage } from "@/types/tour";

interface PhotoGalleryProps {
  images: TourImage[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg lg:p-6 md:p-4 p-3 lg:space-y-8 md:space-y-6 space-y-4 bg-white">
      <div className="uppercase text-2xl font-bold text-gray-800">Hình ảnh</div>

      <div className="grid grid-cols-6 gap-1 md:gap-4 cursor-pointer">
        {/* Main image */}
        {images[0] && (
          <div
            className="rounded-lg overflow-hidden relative col-span-6 aspect-[2/1]"
            onClick={() => openLightbox(images[0].image_url)}
          >
            <img
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              src={images[0].image_url}
              alt={images[0].caption}
              onError={(e) => {
                e.currentTarget.src = "/api/placeholder/800/400";
              }}
            />
          </div>
        )}

        {/* Thumbnail images */}
        {images.slice(1, 7).map((image, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden relative col-span-2 aspect-[3/2]"
            onClick={() => openLightbox(image.image_url)}
          >
            <img
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              src={image.image_url}
              alt={image.caption}
              onError={(e) => {
                e.currentTarget.src = "/api/placeholder/400/300";
              }}
            />
          </div>
        ))}

        {/* Show more button if there are more than 6 images */}
        {images.length > 6 && (
          <div className="rounded-lg overflow-hidden relative col-span-2 aspect-[3/2] bg-gray-900/80 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">+{images.length - 6} ảnh</span>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/api/placeholder/800/600";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
