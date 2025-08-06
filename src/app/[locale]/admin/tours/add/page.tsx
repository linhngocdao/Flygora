"use client";

import { ChevronLeft } from "lucide-react";
import { useLocale } from "next-intl";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TourForm from "@/components/Admin/Tour/TourForm";
import { useTourStore } from "@/store/tour.store";
import Link from "next/link";
import QuillExample from "@/components/examples/QuillExample";

const CreateTourPage = () => {
  const locale = useLocale();

  const { resetState } = useTourStore();

  React.useEffect(() => {
    resetState();
  }, [resetState]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <QuillExample />
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
      </div>
      {/* Form Card */}
      <Card>
        <CardContent>
          <TourForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTourPage;
