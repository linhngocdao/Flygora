"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { z } from "zod";
import { TourFormSchema } from "@/lib/validations/tour.validation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Smartphone, Monitor, Tablet } from "lucide-react";
import TourForm, { TourFormRef } from "./TourForm";
import TourPreview from "./TourPreview";

type TourFormValues = z.infer<typeof TourFormSchema>;

export interface TourLiveEditorRef {
  submitForm: () => Promise<void>;
  getCurrentStep: () => string;
  goToNextStep: () => void;
  getFormData: () => TourFormValues;
  isFormValid: () => boolean;
}

interface TourLiveEditorProps {
  onSubmit?: (data: TourFormValues) => void;
}

const TourLiveEditor = forwardRef<TourLiveEditorRef, TourLiveEditorProps>(({ onSubmit }, ref) => {
  const [viewMode, setViewMode] = useState<"split" | "form" | "preview">("split");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [formData, setFormData] = useState<Partial<TourFormValues>>({});

  const tourFormRef = React.useRef<TourFormRef>(null);

  // Forward ref methods to parent
  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (tourFormRef.current) {
        return tourFormRef.current.submitForm();
      }
    },
    getCurrentStep: () => {
      if (tourFormRef.current) {
        return tourFormRef.current.getCurrentStep();
      }
      return "basic";
    },
    goToNextStep: () => {
      if (tourFormRef.current) {
        tourFormRef.current.goToNextStep();
      }
    },
    getFormData: () => {
      if (tourFormRef.current) {
        return tourFormRef.current.getFormData();
      }
      return {} as TourFormValues;
    },
    isFormValid: () => {
      if (tourFormRef.current) {
        return tourFormRef.current.isFormValid();
      }
      return false;
    },
  }));

  // Get device classes for preview
  const getDeviceClasses = () => {
    switch (deviceMode) {
      case "mobile":
        return "max-w-[375px] mx-auto";
      case "tablet":
        return "max-w-[768px] mx-auto";
      default:
        return "w-full";
    }
  };

  // Handle form data changes for real-time preview - memoized to prevent infinite re-renders
  const handleFormDataChange = React.useCallback((data: TourFormValues) => {
    setFormData(data);
  }, []);

  return (
    <div className="h-[calc(100vh-120px)] w-full">
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg">Tour Editor</h2>
          <Badge variant="secondary">Live Preview</Badge>
        </div>

        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === "form" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("form")}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Chỉ Form
            </Button>
            <Button
              variant={viewMode === "split" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("split")}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Chia đôi
            </Button>
            <Button
              variant={viewMode === "preview" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("preview")}
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              Chỉ Preview
            </Button>
          </div>

          {/* Device Mode (only show when preview is visible) */}
          {(viewMode === "preview" || viewMode === "split") && (
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={deviceMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDeviceMode("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={deviceMode === "tablet" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDeviceMode("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={deviceMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setDeviceMode("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="h-[calc(100%-80px)]">
        {viewMode === "form" && (
          // Form only view
          <div className="h-full overflow-auto">
            <TourForm ref={tourFormRef} onSubmit={onSubmit} onChange={handleFormDataChange} />
          </div>
        )}

        {viewMode === "preview" && (
          // Preview only view
          <div className="h-full overflow-auto bg-gray-50">
            <div className={`h-full ${getDeviceClasses()}`}>
              <TourPreview data={formData} deviceMode={deviceMode} />
            </div>
          </div>
        )}

        {viewMode === "split" && (
          // Split view - Simple side by side
          <div className="h-full flex">
            {/* Form Panel */}
            <div className="w-1/2 border-r">
              <Card className="h-full rounded-none border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Điền thông tin tour
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)] overflow-auto p-0">
                  <TourForm ref={tourFormRef} onSubmit={onSubmit} onChange={handleFormDataChange} />
                </CardContent>
              </Card>
            </div>

            {/* Preview Panel */}
            <div className="w-1/2">
              <Card className="h-full rounded-none border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Preview
                    <Badge variant="outline" className="ml-auto">
                      {deviceMode === "desktop" && "Desktop"}
                      {deviceMode === "tablet" && "Tablet"}
                      {deviceMode === "mobile" && "Mobile"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-80px)] overflow-auto p-0 bg-gray-50">
                  <div className={`h-full ${getDeviceClasses()}`}>
                    <TourPreview data={formData} deviceMode={deviceMode} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

TourLiveEditor.displayName = "TourLiveEditor";

export default TourLiveEditor;
