"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Eye } from "lucide-react";
import { useUploadSingleImage } from "@/hooks/useUpload";

interface IconUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export const IconUpload: React.FC<IconUploadProps> = ({ value, onChange, placeholder }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadSingleImage();

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
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Icon class hoặc URL"}
        className="flex-1"
      />
      <Button
        type="button"
        variant="outline"
        onClick={openFileDialog}
        disabled={uploadMutation.isPending}
        size="sm"
      >
        <Upload className="h-4 w-4" />
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value && value.startsWith("http") && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => window.open(value, "_blank")}
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}

      {uploadMutation.isError && (
        <p className="text-red-500 text-sm">Lỗi upload: {uploadMutation.error?.message}</p>
      )}
    </div>
  );
};
