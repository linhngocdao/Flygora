"use client";

import { ChevronLeft, Save, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import React, { useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TourLiveEditor, { TourLiveEditorRef } from "@/components/Admin/Tour/TourLiveEditor";
import { useTourStore } from "@/store/tour.store";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateTour, getTourById } from "@/config/tour/tour.api";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/lib/utils";

const EditTourPage = () => {
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const tourId = params.id as string;

  const tourFormRef = useRef<TourLiveEditorRef>(null);
  const [currentStep, setCurrentStep] = useState("basic");
  const queryClient = useQueryClient();

  const { resetState } = useTourStore();

  // Load tour data
  const {
    data: tourData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: () => getTourById(tourId),
    enabled: !!tourId,
  });
  console.log("dữ liệu chi tiết", tourData);

  React.useEffect(() => {
    resetState();
  }, [resetState]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: any) => updateTour(tourId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["private-tours"] });
      queryClient.invalidateQueries({ queryKey: ["tour", tourId] });
      toast.success("Cập nhật tour thành công");
      router.push(`/${locale}/admin/tours`);
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error, "Có lỗi xảy ra khi cập nhật tour");
      toast.error(errorMessage);
    },
  });

  const handleTourSubmit = async (data: any) => {
    console.log("handleTourSubmit called with data:", data);
    updateMutation.mutate(data);
  };

  const handleNext = async () => {
    if (tourFormRef.current) {
      if (isLastStep) {
        // Last step - submit form
        await tourFormRef.current.submitForm();
      } else {
        // Go to next step
        tourFormRef.current.goToNextStep();
        const newStep = tourFormRef.current.getCurrentStep();
        setCurrentStep(newStep);
      }
    }
  };

  // Sync currentStep with form
  React.useEffect(() => {
    if (tourFormRef.current) {
      const formStep = tourFormRef.current.getCurrentStep();
      if (formStep !== currentStep) {
        setCurrentStep(formStep);
      }
    }
  }, [currentStep]);

  const handleCancel = () => {
    router.push(`/${locale}/admin/tours`);
  };

  const isLastStep = currentStep === "settings";

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <Card>
          <CardContent className="p-8">
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href={`/${locale}/admin/tours`}>
            <ChevronLeft size="29" />
          </Link>
          <div>
            <span className="text-2xl font-bold text-gray-900">Lỗi</span>
            <p className="text-red-600 mt-1">Không thể tải thông tin tour</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/${locale}/admin/tours`}>
            <ChevronLeft size="29" />
          </Link>
          <div>
            <span className="text-2xl font-bold text-gray-900">Chỉnh sửa tour</span>
            <p className="text-gray-600 mt-1">
              Cập nhật thông tin tour: {tourData?.data?.tour?.title || "Đang tải..."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Hủy
          </Button>
          <Button type="button" onClick={handleNext} disabled={updateMutation.isPending}>
            {isLastStep ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                {updateMutation.isPending ? "Đang lưu..." : "Cập nhật tour"}
              </>
            ) : (
              <>
                <ArrowRight className="mr-2 h-4 w-4" />
                Tiếp theo
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardContent>
          <TourLiveEditor
            ref={tourFormRef}
            onSubmit={handleTourSubmit}
            initialData={tourData?.data?.tour}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditTourPage;
