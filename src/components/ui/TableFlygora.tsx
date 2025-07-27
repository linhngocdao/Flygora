"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Types
interface TableColumn<T = any> {
  key: string;
  title: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  className?: string;
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
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
      {/* Results info */}
      <div className="text-sm text-gray-700 dark:text-gray-300">
        Hiển thị <span className="font-medium">{startItem}</span> đến{" "}
        <span className="font-medium">{endItem}</span> trong tổng số{" "}
        <span className="font-medium">{total}</span> kết quả
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
          className="flex items-center gap-1 px-3"
        >
          <ChevronLeft className="h-4 w-4" />
          Trước
        </Button>

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
                  min-w-[30px] h-8
                  ${
                    isCurrentPage
                      ? "bg-primary text-white"
                      : "hover:bg-gray-50 hover:text-gray-800 dark:hover:bg-gray-800"
                  }
                `}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(current + 1)}
          disabled={current === totalPages}
          className="flex items-center gap-1 px-3"
        >
          Sau
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

// Loading skeleton component
const TableSkeleton: React.FC<{ columns: TableColumn[]; rows: number }> = ({ columns, rows }) => (
  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
    {[...Array(rows)].map((_, rowIndex) => (
      <tr key={rowIndex}>
        {columns.map((column, colIndex) => (
          <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
            <Skeleton className="h-4 w-full" />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
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
}: TableProps<T>) => {
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === "function") {
      return rowKey(record);
    }
    return (record as any)[rowKey] || index.toString();
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

  return (
    <Card className={className}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${getColumnAlign(
                    column.align
                  )} ${column.className || ""}`}
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          {loading ? (
            <TableSkeleton columns={columns} rows={skeletonRows} />
          ) : (
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-12">
                    {emptyIcon && <div className="mb-4 flex justify-center">{emptyIcon}</div>}
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {emptyText}
                    </h3>
                  </td>
                </tr>
              ) : (
                data.map((record, index) => {
                  const rowProps = onRow?.(record, index) || {};
                  return (
                    <tr
                      key={getRowKey(record, index)}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        rowProps.className || ""
                      }`}
                      onClick={rowProps.onClick}
                    >
                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className={`px-6 py-4 whitespace-nowrap ${getColumnAlign(
                            column.align
                          )} ${column.className || ""}`}
                        >
                          {column.render
                            ? column.render((record as any)[column.key], record, index)
                            : (record as any)[column.key]}
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
