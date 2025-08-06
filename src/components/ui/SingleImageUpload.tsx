"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Eye } from "lucide-react";
import { useUploadSingleImage } from "@/hooks/useUpload";
import Image from "next/image";

interface SingleImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  required?: boolean;
}

export const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(value);
  const uploadMutation = useUploadSingleImage();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const response = await uploadMutation.mutateAsync(file);
      if (response.status && response.data) {
        const uploadedUrl = (response.data as any).url;
        onChange(uploadedUrl);
        setPreview(uploadedUrl);
        // Clean up local preview
        URL.revokeObjectURL(localPreview);
      }
    } catch (error: any) {
      console.log("Upload error:", error);
      setPreview(value);
      URL.revokeObjectURL(localPreview);
    }
  };

  const handleRemove = () => {
    onChange("");
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "URL hình ảnh"}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={openFileDialog}
          disabled={uploadMutation.isPending}
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploadMutation.isPending ? "Đang tải..." : "Chọn file"}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview && (
        <div className="relative inline-block">
          <Image
            fill
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border"
          />
          <div className="absolute top-1 right-1 flex gap-1">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => window.open(preview, "_blank")}
              className="h-6 w-6 p-0"
            >
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {uploadMutation.isError && (
        <p className="text-red-500 text-sm">Lỗi upload: {uploadMutation.error?.message}</p>
      )}
    </div>
  );
};
