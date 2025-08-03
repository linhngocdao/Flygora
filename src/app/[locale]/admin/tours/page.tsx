"use client";

import TourManager from "@/components/Admin/Tour/TourManager";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import FilterComponent from "@/components/Admin/Tour/filterComponent";

export default function ToursManagement() {
  const t = useTranslations("admin.tours");
  const locale = useLocale();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{t("subtitle")}</p>
        </div>
        <Link href={`/${locale}/admin/tours/add`}>
          <Button className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Tạo mới tour
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <FilterComponent />

      {/* Tours Table */}
      <TourManager />
    </div>
  );
}
