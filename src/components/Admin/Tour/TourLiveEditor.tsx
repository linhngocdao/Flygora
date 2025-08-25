"use client";

import React, { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { z } from "zod";
import { TourFormSchema } from "@/lib/validations/tour.validation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit } from "lucide-react";
import TourForm, { TourFormRef } from "./TourForm";
import TourPreview from "./TourPreview";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  initialData?: any; // Dữ liệu ban đầu cho việc edit
}

const TourLiveEditor = forwardRef<TourLiveEditorRef, TourLiveEditorProps>(
  ({ onSubmit, initialData }, ref) => {
    const [viewMode, setViewMode] = useState<"split" | "form">("form");
    const [formData, setFormData] = useState<Partial<TourFormValues>>({});

    const tourFormRef = useRef<TourFormRef>(null);

    // Handle form data changes for real-time preview
    const handleFormDataChange = React.useCallback((data: TourFormValues) => {
      setFormData(data);
    }, []);

    // Tạo TourForm component một lần duy nhất để tránh mất state
    const tourFormComponent = React.useMemo(
      () => (
        <TourForm
          key="persistent-tour-form"
          ref={tourFormRef}
          onSubmit={onSubmit}
          onChange={handleFormDataChange}
          initialData={initialData}
        />
      ),
      [onSubmit, handleFormDataChange, initialData]
    );

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

    return (
      <TooltipProvider>
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "split" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("split")}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Chia đôi
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Khuyến nghị sử dụng với màn hình từ 27 inch trở lên</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="h-[calc(100%-80px)]">
            {viewMode === "form" && (
              // Form only view
              <div className="h-full overflow-auto">{tourFormComponent}</div>
            )}

            {viewMode === "split" && (
              // Split view
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
                      {tourFormComponent}
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
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-80px)] overflow-auto p-0 bg-gray-50">
                      <div className="h-full w-full">
                        <TourPreview data={formData} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </TooltipProvider>
    );
  }
);

TourLiveEditor.displayName = "TourLiveEditor";

export default TourLiveEditor;
