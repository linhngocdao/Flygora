"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  ChevronDown,
  DollarSign,
  Filter,
  Search,
  Tag,
  X,
  Minus,
  Check,
} from "lucide-react";
import { useState } from "react";

// Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// APIs & Types
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getCategory } from "@/config/categoryTour/categoryTour.api";
import { useTourStore } from "@/store/tour.store";
import { formatCurrency } from "@/utilities/currency";
import { Category } from "@/types/categories.type";

const FilterComponent = () => {
  const { filters, setFilters, resetFilters, removeFilter, removeFilters } = useTourStore();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory({ limit: 100 }),
  });

  const categories: Category[] = Array.isArray(categoriesData?.data)
    ? categoriesData.data
    : categoriesData?.data
      ? [categoriesData.data]
      : [];

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

  // Clear individual filters - Sử dụng store method
  const clearFilter = (filterKey: keyof typeof filters) => {
    removeFilter(filterKey);
  };

  const clearFilters = (filterKeys: (keyof typeof filters)[]) => {
    removeFilters(filterKeys);
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
    <Card className="mb-4">
      <CardContent>
        <div className="space-y-2">
          {/* Header - Compact */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-base font-medium">Bộ lọc tìm kiếm</h3>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="h-5 text-xs px-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 px-2">
                <X className="h-3 w-3 mr-1" />
                <span className="text-xs">Xóa tất cả</span>
              </Button>
            )}
          </div>

          {/* Search - Always visible */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo tên tour..."
              value={filters.query || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-9"
            />
          </div>

          {/* Quick Filters - Compact row */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={filters.is_featured ? "default" : "outline"}
              size="sm"
              onClick={handleFeaturedToggle}
              className="h-7 px-3 text-xs"
            >
              Nổi bật
            </Button>
            <Button
              variant={filters.is_top ? "default" : "outline"}
              size="sm"
              onClick={handleTopToggle}
              className="h-7 px-3 text-xs"
            >
              TOP
            </Button>

            {/* Advanced toggle */}
            <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 px-3 text-xs ml-auto">
                  Lọc nâng cao
                  <ChevronDown
                    className={`h-3 w-3 ml-1 transition-transform ${isAdvancedOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-2 mt-2">
                {/* Advanced Filters Grid - More compact */}
                <div className="flex justify-center gap-6">
                  {/* Price Range */}
                  <div className="space-y-1">
                    <Label className="flex items-center gap-1.5 text-xs font-medium">
                      <DollarSign className="h-3 w-3 text-green-600" />
                      Khoảng giá
                    </Label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Từ"
                          value={filters.price_min || ""}
                          onChange={(e) => handlePriceChange("min", e.target.value)}
                          className="text-xs h-8 pl-7"
                        />
                      </div>
                      <div className="flex items-center justify-center w-4 h-8">
                        <Minus className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Đến"
                          value={filters.price_max || ""}
                          onChange={(e) => handlePriceChange("max", e.target.value)}
                          className="text-xs h-8 pl-7"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Duration Range */}
                  <div className="space-y-1">
                    <Label className="flex items-center gap-1.5 text-xs font-medium">
                      <Calendar className="h-3 w-3 text-blue-600" />
                      Số ngày
                    </Label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Từ"
                          value={filters.duration_min || ""}
                          onChange={(e) => handleDurationChange("min", e.target.value)}
                          className="text-xs h-8 pl-7"
                        />
                      </div>
                      <div className="flex items-center justify-center w-4 h-8">
                        <Minus className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div className="relative flex-1">
                        <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Đến"
                          value={filters.duration_max || ""}
                          onChange={(e) => handleDurationChange("max", e.target.value)}
                          className="text-xs h-8 pl-7"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-1">
                    <Label className="flex items-center gap-1.5 text-xs font-medium">
                      <Tag className="h-3 w-3 text-purple-600" />
                      Danh mục
                    </Label>
                    <Select
                      value={filters.category_id || "all"}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả danh mục</SelectItem>
                        {categories.map((category: Category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">
                      <Check className="h-3 w-3 text-muted-foreground" />
                      Trạng thái
                    </Label>
                    <Select value={filters.status || "all"} onValueChange={handleStatusChange}>
                      <SelectTrigger className="h-8 text-xs">
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
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Active Filters Tags - Only show when filters are active */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-border/50">
              {filters.query && (
                <Badge
                  onClick={() => {
                    console.log("Clicked query badge to remove filter");
                    clearFilter("query");
                  }}
                  variant="outline"
                  className="h-6 text-xs px-2 gap-1 cursor-pointer hover:bg-destructive/10 transition-all duration-200"
                >
                  <Search className="h-3 w-3 text-gray-600" />
                  &ldquo;{filters.query}&rdquo;
                  <X className="h-3 w-3 hover:text-destructive transition-colors" />
                </Badge>
              )}

              {(filters.price_min || filters.price_max) && (
                <Badge
                  onClick={() => {
                    console.log("Clicked price badge to remove filter");
                    clearFilters(["price_min", "price_max"]);
                  }}
                  variant="outline"
                  className="h-6 text-xs px-2 gap-1 cursor-pointer hover:bg-destructive/10 transition-all duration-200"
                >
                  <DollarSign className="h-3 w-3 text-green-600" />
                  {formatCurrency(filters.price_min || 0)} -{" "}
                  {formatCurrency(filters.price_max || 10000000)}
                  <X className="h-3 w-3 hover:text-destructive transition-colors" />
                </Badge>
              )}

              {(filters.duration_min || filters.duration_max) && (
                <Badge
                  variant="outline"
                  className="h-6 text-xs px-2 gap-1 cursor-pointer hover:bg-destructive/10 transition-all duration-200"
                  onClick={() => {
                    console.log("Clicked duration badge to remove filter");
                    clearFilters(["duration_min", "duration_max"]);
                  }}
                >
                  <Calendar className="h-3 w-3 text-blue-600" />
                  {filters.duration_min || 1} - {filters.duration_max || 30} ngày
                  <X className="h-3 w-3 hover:text-destructive transition-colors" />
                </Badge>
              )}

              {filters.category_id && (
                <Badge
                  variant="outline"
                  className="h-6 text-xs px-2 gap-1 cursor-pointer hover:bg-destructive/10 transition-all duration-200"
                  onClick={() => {
                    console.log("Clicked category badge to remove filter");
                    clearFilter("category_id");
                  }}
                >
                  <Tag className="h-3 w-3 text-purple-600" />
                  {categories.find((c: Category) => c.id === filters.category_id)?.name || "N/A"}
                  <X className="h-3 w-3 hover:text-destructive transition-colors" />
                </Badge>
              )}

              {filters.status && (
                <Badge
                  variant="outline"
                  className="h-6 text-xs px-2 gap-1 cursor-pointer hover:bg-destructive/10 transition-all duration-200"
                  onClick={() => {
                    console.log("Clicked status badge to remove filter");
                    clearFilter("status");
                  }}
                >
                  {filters.status === "published" ? "Đã xuất bản" : "Nháp"}
                  <X className="h-3 w-3 hover:text-destructive transition-colors" />
                </Badge>
              )}

              {filters.is_featured && (
                <Badge
                  variant="outline"
                  className="h-6 text-xs px-2 gap-1 cursor-pointer hover:bg-destructive/10 transition-all duration-200"
                  onClick={() => {
                    console.log("Clicked featured badge to remove filter");
                    clearFilter("is_featured");
                  }}
                >
                  Nổi bật
                  <X className="h-3 w-3 hover:text-destructive transition-colors" />
                </Badge>
              )}

              {filters.is_top && (
                <Badge
                  variant="outline"
                  className="h-6 text-xs px-2 gap-1 cursor-pointer hover:bg-destructive/10 transition-all duration-200"
                  onClick={() => {
                    console.log("Clicked top badge to remove filter");
                    clearFilter("is_top");
                  }}
                >
                  TOP
                  <X className="h-3 w-3 hover:text-destructive transition-colors" />
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
