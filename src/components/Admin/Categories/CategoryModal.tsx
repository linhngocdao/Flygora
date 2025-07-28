// components/Admin/CategoryModal.tsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Category, CategoryPayload } from "@/types/categories.type";

// Zod schema for validation
const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Tên danh mục là bắt buộc")
    .min(2, "Tên danh mục phải có ít nhất 2 ký tự")
    .max(100, "Tên danh mục không được vượt quá 100 ký tự")
    .trim(),
  description: z.string().max(500, "Mô tả không được vượt quá 500 ký tự").optional().default(""),
  status: z.enum(["active", "inactive"]).default("active"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  onSave: (data: CategoryPayload, editingCategory?: Category) => Promise<void>;
}

export interface CategoryModalRef {
  openModal: (category?: Category) => void;
  closeModal: () => void;
}

const CategoryModal = forwardRef<CategoryModalRef, CategoryModalProps>(({ onSave }, ref) => {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form setup with react-hook-form and zod
  const form = useForm<any>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      status: "active",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = form;

  // Expose methods through ref
  useImperativeHandle(ref, () => ({
    openModal: (category?: Category) => {
      if (category) {
        setEditingCategory(category);
        reset({
          name: category.name,
          description: category.description || "",
          status: category.status,
        });
      } else {
        setEditingCategory(undefined);
        reset({
          name: "",
          description: "",
          status: "active",
        });
      }
      setIsOpen(true);
    },
    closeModal: () => {
      handleClose();
    },
  }));

  // Close modal and reset form
  const handleClose = () => {
    if (isSubmitting) return; // Prevent closing while submitting

    setIsOpen(false);
    setEditingCategory(undefined);
    setIsSubmitting(false);
    reset();
  };

  // Submit handler
  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    try {
      const submitData: CategoryPayload = {
        name: data.name.trim(),
        description: data.description?.trim() || "",
        status: data.status,
      };

      await onSave(submitData, editingCategory);

      // Close modal on success
      handleClose();
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  // Watch description for character count
  const description = form.watch("description");

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle>{editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên danh mục <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tên danh mục..."
                      disabled={isSubmitting}
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập mô tả danh mục (không bắt buộc)..."
                      disabled={isSubmitting}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {description?.length || 0}/500 ký tự
                  </p>
                </FormItem>
              )}
            />

            {/* Status Field */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Vô hiệu hóa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Hủy
          </Button>
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isValid}
            className="min-w-[100px]"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {editingCategory ? "Đang lưu..." : "Đang thêm..."}
              </div>
            ) : editingCategory ? (
              "Lưu thay đổi"
            ) : (
              "Thêm danh mục"
            )}
          </Button>
        </DialogFooter>

        {/* Keyboard shortcut hint */}
        <div className="text-xs text-gray-500 text-center border-t pt-2 dark:text-gray-400 dark:border-gray-700">
          Nhấn{" "}
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            Ctrl + Enter
          </kbd>{" "}
          để lưu
        </div>
      </DialogContent>
    </Dialog>
  );
});

CategoryModal.displayName = "CategoryModal";

export { CategoryModal };
