"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ArrowLeft, Plus } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Form Component
import TourForm from "@/components/Admin/Tour/TourForm";

const CreateTourPage = () => {
  const router = useRouter();
  const locale = useLocale();

  //   const { clearCurrentTour } = useTourStore();

  //   React.useEffect(() => {
  //     clearCurrentTour();
  //   }, [clearCurrentTour]);

  const handleBackToList = () => {
    router.push(`/${locale}/admin/tours`);
  };

  const handleSuccess = () => {
    router.push(`/${locale}/admin/tours`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleBackToList}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách tour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tạo mới tour</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Điền thông tin để tạo tour mới</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-green-600" />
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin tour mới</CardTitle>
        </CardHeader>
        <CardContent>
          <TourForm onSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTourPage;
