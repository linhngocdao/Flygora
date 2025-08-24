"use client";

import { ChevronLeft, Save, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TourLiveEditor, { TourLiveEditorRef } from "@/components/Admin/Tour/TourLiveEditor";
import { useTourStore } from "@/store/tour.store";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTour } from "@/config/tour/tour.api";

const CreateTourPage = () => {
  const locale = useLocale();
  const router = useRouter();
  const tourFormRef = useRef<TourLiveEditorRef>(null);
  const [currentStep, setCurrentStep] = useState("basic");
  const queryClient = useQueryClient();

  const { resetState } = useTourStore();

  React.useEffect(() => {
    resetState();
  }, [resetState]);

  // Mutation
  const createMutation = useMutation({
    mutationFn: createTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["private-tours"] });
      toast.success("Thêm tour thành công");
      // Redirect sau khi thành công
      router.push(`/${locale}/admin/tours`);
    },
    onError: (error: any) => {
      console.log(error.response.data.errors);
    },
  });

  const handleTourSubmit = async (data: any) => {
    console.log("handleTourSubmit called with data:", data);
    createMutation.mutate(data);
    // Router.push sẽ được gọi trong onSuccess của mutation
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/${locale}/admin/tours`}>
            <ChevronLeft size="29" />
          </Link>
          <div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Tạo mới tour</span>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Điền thông tin để tạo tour mới</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Hủy
          </Button>
          <Button type="button" onClick={handleNext} disabled={createMutation.isPending}>
            {isLastStep ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                {createMutation.isPending ? "Đang lưu..." : "Lưu tour"}
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
          <TourLiveEditor ref={tourFormRef} onSubmit={handleTourSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTourPage;
