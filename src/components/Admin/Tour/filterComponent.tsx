"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X, Filter, DollarSign, Calendar, Tag } from "lucide-react";

// Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// APIs & Types
import { getAllCategories } from "@/config/categoryTour/categoryTour.api";
import { formatCurrency } from "@/utilities/currency";
import { useTourStore } from "@/store/tour.store";

const FilterComponent = () => {
  const { filters, setFilters, resetFilters } = useTourStore();

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const categories = categoriesData?.data?.categories || [];

  // Handlers để cập nhật filters theo đúng interface QueryGetTours
  const handleSearchChange = (value: string) => {
    setFilters({ query: value || undefined, page: 1 });
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = parseInt(value) || undefined;
    if (type === "min") {
      setFilters({ price_min: numValue, page: 1 });
    } else {
      setFilters({ price_max: numValue, page: 1 });
    }
  };

  const handleDurationChange = (type: "min" | "max", value: string) => {
    const numValue = parseInt(value) || undefined;
    if (type === "min") {
      setFilters({ duration_min: numValue, page: 1 });
    } else {
      setFilters({ duration_max: numValue, page: 1 });
    }
  };

  const handleCategoryChange = (value: string) => {
    setFilters({ category_id: value === "all" ? undefined : value, page: 1 });
  };

  const handleStatusChange = (value: string) => {
    const status = value === "all" ? undefined : (value as "published" | "unpublished");
    setFilters({ status, page: 1 });
  };

  const handleFeaturedToggle = () => {
    setFilters({ is_featured: !filters.is_featured, page: 1 });
  };

  const handleTopToggle = () => {
    setFilters({ is_top: !filters.is_top, page: 1 });
  };

  // Clear individual filters
  const clearFilter = (filterKey: keyof typeof filters) => {
    setFilters({ [filterKey]: undefined, page: 1 });
  };

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.query) count++;
    if (filters.price_min || filters.price_max) count++;
    if (filters.duration_min || filters.duration_max) count++;
    if (filters.category_id) count++;
    if (filters.status) count++;
    if (filters.is_featured) count++;
    if (filters.is_top) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Bộ lọc tìm kiếm</h3>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary">{activeFiltersCount} bộ lọc</Badge>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <X className="h-4 w-4 mr-2" />
                Xóa tất cả
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo tên tour..."
              value={filters.query || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Price Range */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Khoảng giá
              </Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Từ"
                  value={filters.price_min || ""}
                  onChange={(e) => handlePriceChange("min", e.target.value)}
                  className="text-sm"
                />
                <Input
                  type="number"
                  placeholder="Đến"
                  value={filters.price_max || ""}
                  onChange={(e) => handlePriceChange("max", e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Duration Range */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Số ngày
              </Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Từ"
                  value={filters.duration_min || ""}
                  onChange={(e) => handleDurationChange("min", e.target.value)}
                  className="text-sm"
                />
                <Input
                  type="number"
                  placeholder="Đến"
                  value={filters.duration_max || ""}
                  onChange={(e) => handleDurationChange("max", e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Danh mục
              </Label>
              <Select value={filters.category_id || "all"} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select value={filters.status || "all"} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="published">Đã xuất bản</SelectItem>
                  <SelectItem value="unpublished">Nháp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex gap-4">
            <Button
              variant={filters.is_featured ? "default" : "outline"}
              size="sm"
              onClick={handleFeaturedToggle}
            >
              Nổi bật
            </Button>
            <Button
              variant={filters.is_top ? "default" : "outline"}
              size="sm"
              onClick={handleTopToggle}
            >
              TOP
            </Button>
          </div>

          {/* Active Filters Tags */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              {filters.query && (
                <Badge variant="outline" className="gap-1">
                  Tìm kiếm: &ldquo;{filters.query}&rdquo;
                  <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter("query")} />
                </Badge>
              )}

              {(filters.price_min || filters.price_max) && (
                <Badge variant="outline" className="gap-1">
                  Giá: {formatCurrency(filters.price_min || 0)} -{" "}
                  {formatCurrency(filters.price_max || 10000000)}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      clearFilter("price_min");
                      clearFilter("price_max");
                    }}
                  />
                </Badge>
              )}

              {(filters.duration_min || filters.duration_max) && (
                <Badge variant="outline" className="gap-1">
                  Thời gian: {filters.duration_min || 1} - {filters.duration_max || 30} ngày
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => {
                      clearFilter("duration_min");
                      clearFilter("duration_max");
                    }}
                  />
                </Badge>
              )}

              {filters.category_id && (
                <Badge variant="outline" className="gap-1">
                  Danh mục: {categories.find((c) => c.id === filters.category_id)?.name || "N/A"}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => clearFilter("category_id")}
                  />
                </Badge>
              )}

              {filters.status && (
                <Badge variant="outline" className="gap-1">
                  Trạng thái: {filters.status === "published" ? "Đã xuất bản" : "Nháp"}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter("status")} />
                </Badge>
              )}

              {filters.is_featured && (
                <Badge variant="outline" className="gap-1">
                  Nổi bật
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => clearFilter("is_featured")}
                  />
                </Badge>
              )}

              {filters.is_top && (
                <Badge variant="outline" className="gap-1">
                  TOP
                  <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter("is_top")} />
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterComponent;
