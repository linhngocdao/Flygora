import { uploadImages, uploadSingleImage, uploadVideo } from "@/config/upload/upload.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUploadSingleImage = () => {
  return useMutation({
    mutationFn: (file: File) => uploadSingleImage(file),
    onSuccess: (data) => {
      console.log("Upload single image success:", data);
    },
    onError: (error) => {
      console.error("Upload single image error:", error);
    },
  });
};

export const useUploadMultipleImages = () => {
  return useMutation({
    mutationFn: (files: File[]) => uploadImages(files),
    onSuccess: (data) => {
      toast.success("Upload multiple images success");
      return data;
    },
    onError: (error) => {
      console.error("Upload multiple images error:", error);
    },
  });
};

export const useUploadVideo = () => {
  return useMutation({
    mutationFn: (file: File) => uploadVideo(file),
    onSuccess: (data) => {
      console.log("Upload video success:", data);
    },
    onError: (error) => {
      console.error("Upload video error:", error);
    },
  });
};
