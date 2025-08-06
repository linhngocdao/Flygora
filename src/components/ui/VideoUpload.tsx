"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadVideo } from "@/hooks/useUpload";
import { Eye, Upload } from "lucide-react";
import React, { useRef } from "react";

interface VideoUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ value, onChange, placeholder }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadVideo();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const response = await uploadMutation.mutateAsync(file);
      if (response.status && response.data) {
        const uploadedUrl = (response.data as any).url;
        onChange(uploadedUrl);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "URL video"}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={openFileDialog}
          disabled={uploadMutation.isPending}
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploadMutation.isPending ? "Đang tải..." : "Chọn video"}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => window.open(value, "_blank")}
          >
            <Eye className="h-4 w-4 mr-1" />
            Xem video
          </Button>
          <video src={value} className="w-32 h-20 object-cover rounded border" controls />
        </div>
      )}

      {uploadMutation.isError && (
        <p className="text-red-500 text-sm">Lỗi upload: {uploadMutation.error?.message}</p>
      )}
    </div>
  );
};
