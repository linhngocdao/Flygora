import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadMultipleImages } from "@/hooks/useUpload";
import { Eye, Upload } from "lucide-react";
import React, { useRef } from "react";

interface MultipleImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  value,
  onChange,
  placeholder,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadMultipleImages();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    try {
      const response = await uploadMutation.mutateAsync(files);
      if (response.status && response.data) {
        const uploadedData = Array.isArray(response.data) ? response.data[0] : response.data;
        const uploadedUrl = (uploadedData as any).url;
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
        value={value || ""}
        {...props}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "URL hình ảnh"}
        className="flex-1"
      />
      <Button
        type="button"
        variant="outline"
        onClick={openFileDialog}
        disabled={uploadMutation.isPending}
        size="default"
      >
        <Upload className="h-4 w-4" />
        chọn file
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value && (
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
