"use client";

import { CategoryModal } from "@/components/Admin/Categories";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TableFlygora from "@/components/ui/TableFlygora";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Interface Category chuẩn hóa theo backend
interface Category {
  id: string;
  name: string;
  description?: string;
  status: "active" | "inactive";
  created_at?: string;
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Tour Biển",
    description: "Các tour du lịch biển hấp dẫn.",
    status: "active",
    created_at: "2024-07-01",
  },
  {
    id: "2",
    name: "Tour Núi",
    description: "Khám phá núi rừng Việt Nam.",
    status: "inactive",
    created_at: "2024-07-02",
  },
  {
    id: "3",
    name: "Tour Văn Hóa",
    description: "Tour tìm hiểu văn hóa các vùng miền.",
    status: "active",
    created_at: "2024-07-03",
  },
  {
    id: "4",
    name: "Tour Mạo Hiểm",
    description: "Các tour mạo hiểm đầy thử thách.",
    status: "active",
    created_at: "2024-07-04",
  },
  {
    id: "5",
    name: "Tour Ẩm Thực",
    description: "Khám phá ẩm thực các vùng miền.",
    status: "inactive",
    created_at: "2024-07-05",
  },
  {
    id: "6",
    name: "Tour Nghỉ Dưỡng",
    description: "Các tour nghỉ dưỡng thư giãn.",
    status: "active",
    created_at: "2024-07-06",
  },
  {
    id: "7",
    name: "Tour Giáo Dục",
    description: "Tour giáo dục và học tập.",
    status: "active",
    created_at: "2024-07-07",
  },
  {
    id: "8",
    name: "Tour Thám Hiểm",
    description: "Khám phá các địa điểm mới lạ.",
    status: "inactive",
    created_at: "2024-07-08",
  },
];

const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState("");

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    setCategories((prev) => prev.filter((c) => c.id !== category.id));
  };

  // Hàm xử lý lưu category (thêm/sửa)
  const handleSave = (data: { name: string; description?: string }) => {
    if (selectedCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === selectedCategory.id
            ? { ...c, name: data.name, description: data.description }
            : c
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          name: data.name,
          description: data.description,
          status: "active",
          created_at: new Date().toISOString().slice(0, 10),
        },
      ]);
    }
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  // Định nghĩa các cột cho bảng category
  const columns = [
    {
      key: "name",
      title: "Tên danh mục",
      render: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      key: "description",
      title: "Mô tả",
      render: (value: string) => (
        <span className="text-sm text-gray-700">{value || "Không có mô tả"}</span>
      ),
    },
    {
      key: "status",
      title: "Trạng thái",
      render: (value: string) => (
        <Badge
          variant="secondary"
          className={
            value === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }
        >
          {value === "active" ? "Hoạt động" : "Vô hiệu hóa"}
        </Badge>
      ),
    },
    {
      key: "created_at",
      title: "Ngày tạo",
      render: (value: string) => <span className="text-sm text-gray-500">{value}</span>,
    },
    {
      key: "actions",
      title: "Hành động",
      align: "right" as const,
      render: (_: any, record: Category) => (
        // DropdownMenu cho các action
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(record)}>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(record)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Lọc theo tên hoặc mô tả
  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quản lý danh mục</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Quản lý các danh mục tour trong hệ thống
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
          Thêm danh mục
        </Button>
      </div>

      <Card className="p-6">
        <Input
          placeholder="Tìm kiếm danh mục"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </Card>

      <TableFlygora
        columns={columns}
        data={filteredCategories}
        loading={false}
        emptyText="Không có danh mục nào"
        rowKey="id"
      />

      {/* Modal thêm/sửa danh mục */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
        onSave={handleSave}
        initialName={selectedCategory?.name}
        initialDescription={selectedCategory?.description}
      />
    </div>
  );
};

export default CategoryManager;
