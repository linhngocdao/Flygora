"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// Types
interface TableColumn<T = any> {
  key: string;
  title: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  className?: string;
  sorter?: boolean;
  sortOrder?: "asc" | "desc" | null;
}

interface PaginationInfo {
  current: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  emptyText?: string;
  emptyIcon?: React.ReactNode;
  className?: string;
  rowKey?: string | ((record: T) => string);
  onRow?: (
    record: T,
    index: number
  ) => {
    onClick?: () => void;
    className?: string;
  };
  showPagination?: boolean;
  skeletonRows?: number;
  bordered?: boolean;
  size?: "small" | "middle" | "large";
  sticky?: boolean;
}

// Pagination component
const TablePagination: React.FC<{
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}> = ({ pagination, onPageChange }) => {
  const { current, pageSize, total, totalPages } = pagination;

  // Function to generate page numbers with ellipsis
  const generatePageNumbers = (currentPage: number, totalPages: number) => {
    const delta = 2;
    const range = [];
    const rangeWithDots: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        rangeWithDots.push(i);
      }
      return rangeWithDots;
    }

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = generatePageNumbers(current, totalPages);
  const startItem = (current - 1) * pageSize + 1;
  const endItem = Math.min(current * pageSize, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Results info */}
      <div className="text-sm text-gray-700 dark:text-gray-300 order-2 sm:order-1">
        Hiển thị <span className="font-medium text-gray-900 dark:text-white">{startItem}</span> đến{" "}
        <span className="font-medium text-gray-900 dark:text-white">{endItem}</span> trong tổng số{" "}
        <span className="font-medium text-gray-900 dark:text-white">{total}</span> kết quả
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1 order-1 sm:order-2">
        {/* First page button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={current === 1}
          className="flex items-center gap-1 px-2 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
          title="Trang đầu"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous page button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
          className="flex items-center gap-1 px-3 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Trước</span>
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-2">
          {pageNumbers.map((pageNumber, index) => {
            if (pageNumber === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-gray-500 dark:text-gray-400"
                >
                  ...
                </span>
              );
            }

            const isCurrentPage = pageNumber === current;

            return (
              <Button
                key={pageNumber}
                variant={isCurrentPage ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(Number(pageNumber))}
                className={`
                  min-w-[32px] h-8 px-2
                  ${
                    isCurrentPage
                      ? "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                      : "hover:bg-gray-50 hover:text-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
                  }
                `}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        {/* Next page button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(current + 1)}
          disabled={current === totalPages}
          className="flex items-center gap-1 px-3 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
        >
          <span className="hidden sm:inline">Sau</span>
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last page button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={current === totalPages}
          className="flex items-center gap-1 px-2 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
          title="Trang cuối"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Loading skeleton component
const TableSkeleton: React.FC<{
  columns: TableColumn[];
  rows: number;
  size?: "small" | "middle" | "large";
}> = ({ columns, rows, size = "middle" }) => {
  const getPadding = () => {
    switch (size) {
      case "small":
        return "px-4 py-2";
      case "large":
        return "px-8 py-6";
      default:
        return "px-6 py-4";
    }
  };

  return (
    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
          {columns.map((column, colIndex) => (
            <td key={colIndex} className={`${getPadding()} whitespace-nowrap`}>
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

// Empty state component
const EmptyState: React.FC<{
  emptyText: string;
  emptyIcon?: React.ReactNode;
  colSpan: number;
}> = ({ emptyText, emptyIcon, colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="text-center py-16 bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center space-y-4">
        {emptyIcon && (
          <div className="flex justify-center text-gray-400 dark:text-gray-600">{emptyIcon}</div>
        )}
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{emptyText}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Không có dữ liệu để hiển thị</p>
        </div>
      </div>
    </td>
  </tr>
);

// Main Table component
const TableFlygora = <T,>({
  columns,
  data,
  loading = false,
  pagination,
  onPageChange,
  emptyText = "Không có dữ liệu",
  emptyIcon,
  className = "",
  rowKey = "id",
  onRow,
  showPagination = true,
  skeletonRows = 5,
  bordered = false,
  size = "middle",
  sticky = false,
}: TableProps<T>) => {
  const getRowKey = (record: T, index: number): string => {
    // Nếu rowKey là function, lấy giá trị từ function, ngược lại lấy thuộc tính
    // Đảm bảo trả về string và luôn duy nhất bằng cách thêm index làm hậu tố.
    let baseKey: any;
    if (typeof rowKey === "function") {
      baseKey = (rowKey as (r: T) => string)(record);
    } else {
      baseKey = (record as any)[rowKey];
    }

    // Nếu không có baseKey hoặc baseKey là rỗng, dùng 'row' làm base
    const safeBase =
      baseKey === undefined || baseKey === null || baseKey === "" ? "row" : String(baseKey);

    // Thêm index để bảo đảm tính duy nhất ngay cả khi dữ liệu backend có id trùng lặp
    return `${safeBase}-${index}`;
  };

  const getColumnAlign = (align?: string) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const getPadding = () => {
    switch (size) {
      case "small":
        return "px-4 py-2";
      case "large":
        return "px-8 py-6";
      default:
        return "px-6 py-4";
    }
  };

  const getHeaderPadding = () => {
    switch (size) {
      case "small":
        return "px-4 py-3";
      case "large":
        return "px-8 py-5";
      default:
        return "px-6 py-4";
    }
  };

  const cardClassName = `
    ${className}
    ${bordered ? "border border-gray-200 dark:border-gray-700" : ""}
    bg-white dark:bg-gray-900
    shadow-sm dark:shadow-gray-900/20
    transition-colors duration-200
  `.trim();

  const tableClassName = `
    w-full
    ${sticky ? "table-auto" : ""}
  `.trim();

  return (
    <Card className={cardClassName}>
      <div className={`overflow-x-auto ${sticky ? "max-h-[600px] overflow-y-auto" : ""}`}>
        <table className={tableClassName}>
          <thead
            className={`
            bg-gray-50 dark:bg-gray-800
            ${sticky ? "sticky top-0 z-10" : ""}
            border-b border-gray-200 dark:border-gray-700
          `}
          >
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`
                    ${getHeaderPadding()}
                    text-xs font-semibold text-gray-600 dark:text-gray-300
                    uppercase tracking-wider
                    ${getColumnAlign(column.align)}
                    ${column.className || ""}
                    bg-gray-50 dark:bg-gray-800
                    border-b border-gray-200 dark:border-gray-700
                    ${bordered ? "border-r border-gray-200 dark:border-gray-700 last:border-r-0" : ""}
                  `}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.title}</span>
                    {column.sorter && (
                      <div className="flex flex-col">
                        <ChevronLeft
                          className={`
                          h-3 w-3 rotate-90
                          ${column.sortOrder === "asc" ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}
                        `}
                        />
                        <ChevronLeft
                          className={`
                          h-3 w-3 -rotate-90 -mt-1
                          ${column.sortOrder === "desc" ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}
                        `}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {loading ? (
            <TableSkeleton columns={columns} rows={skeletonRows} size={size} />
          ) : (
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {data.length === 0 ? (
                <EmptyState emptyText={emptyText} emptyIcon={emptyIcon} colSpan={columns.length} />
              ) : (
                data.map((record, index) => {
                  const rowProps = onRow?.(record, index) || {};
                  return (
                    <tr
                      key={getRowKey(record, index)}
                      className={`
                        hover:bg-gray-50 dark:hover:bg-gray-800/50
                        transition-colors duration-150
                        ${rowProps.onClick ? "cursor-pointer" : ""}
                        ${rowProps.className || ""}
                        ${index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/30 dark:bg-gray-800/30"}
                      `}
                      onClick={rowProps.onClick}
                    >
                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className={`
                            ${getPadding()}
                            ${getColumnAlign(column.align)}
                            ${column.className || ""}
                            text-gray-900 dark:text-gray-100
                            ${bordered ? "border-r border-gray-200 dark:border-gray-700 last:border-r-0" : ""}
                            ${size === "small" ? "text-sm" : size === "large" ? "text-base" : "text-sm"}
                          `}
                        >
                          <div className="min-h-[20px] flex items-center">
                            {column.render
                              ? column.render((record as any)[column.key], record, index)
                              : (record as any)[column.key] || "-"}
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination */}
      {showPagination && pagination && onPageChange && !loading && data.length > 0 && (
        <TablePagination pagination={pagination} onPageChange={onPageChange} />
      )}
    </Card>
  );
};

export default TableFlygora;

/* // Example usage component
export const TableExample: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  // Sample data
  const users = [
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "admin", status: "active" },
    { id: 2, name: "Trần Thị B", email: "b@example.com", role: "user", status: "inactive" },
    { id: 3, name: "Lê Văn C", email: "c@example.com", role: "user", status: "active" },
  ];

  const columns: TableColumn[] = [
    {
      key: "name",
      title: "Tên",
      render: (value, record) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium mr-3">
            {value.charAt(0)}
          </div>
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "role",
      title: "Vai trò",
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            value === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
          }`}
        >
          {value === "admin" ? "Quản trị" : "Người dùng"}
        </span>
      ),
    },
    {
      key: "status",
      title: "Trạng thái",
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            value === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value === "active" ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Sửa
          </Button>
          <Button size="sm" variant="outline">
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const pagination = {
    current: currentPage,
    pageSize: 10,
    total: 100,
    totalPages: 10,
  };

  const handlePageChange = (page: number) => {
    setLoading(true);
    setCurrentPage(page);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Danh sách người dùng</h1>

      <Table
        columns={columns}
        data={users}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        emptyText="Không tìm thấy người dùng nào"
        onRow={(record) => ({
          onClick: () => console.log("Clicked row:", record),
          className: "cursor-pointer",
        })}
      />
    </div>
  );
}; */
