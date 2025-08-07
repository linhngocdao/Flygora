import { useEffect } from "react";
import { useCategoryStore } from "@/store/category.store";
import { Category } from "@/types/categories.type";

/**
 * Custom hook để quản lý categories
 * Cung cấp interface dễ sử dụng cho components
 */
export const useCategory = () => {
  const {
    // State
    categories,
    currentCategory,
    loading,
    error,
    filters,
    pagination,
    searchQuery,
    selectedStatus,

    // Modal states
    isCreateModalOpen,
    isEditModalOpen,
    isViewModalOpen,

    // Actions
    setCurrentCategory,
    setSearchQuery,
    setSelectedStatus,
    setFilters,

    // Modal actions
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openViewModal,
    closeViewModal,

    // API actions từ store
    fetchCategories,
    createCategory,
    updateCategoryById,
    deleteCategoryById,

    // Reset actions
    resetFilters,
    resetState,
  } = useCategoryStore();

  // Auto fetch categories khi hook được mount
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch khi filters thay đổi
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  /**
   * Lấy danh sách categories active để sử dụng trong dropdown/select
   */
  const getActiveCategories = (): Category[] => {
    return categories.filter((category) => {
      return category.status === "active";
    });
  };

  /**
   * Tìm category theo ID
   */
  const getCategoryById = (id: string): Category | undefined => {
    return categories.find((category) => category.id === id);
  };

  /**
   * Tìm category theo tên
   */
  const getCategoryByName = (name: string): Category | undefined => {
    return categories.find((category) => category.name.toLowerCase().includes(name.toLowerCase()));
  };

  /**
   * Refresh danh sách categories
   */
  const refreshCategories = async () => {
    await fetchCategories();
  };

  /**
   * Tạo category mới
   */
  const handleCreateCategory = async (data: any) => {
    await createCategory(data);
  };

  /**
   * Cập nhật category
   */
  const handleUpdateCategory = async (id: string, data: any) => {
    await updateCategoryById(id, data);
  };

  /**
   * Xóa category
   */
  const handleDeleteCategory = async (id: string) => {
    await deleteCategoryById(id);
  };

  /**
   * Mở modal edit với category được chọn
   */
  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category);
    openEditModal();
  };

  /**
   * Mở modal view với category được chọn
   */
  const handleViewCategory = (category: Category) => {
    setCurrentCategory(category);
    openViewModal();
  };

  /**
   * Search categories
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  /**
   * Filter by status
   */
  const handleFilterByStatus = (status: "active" | "inactive" | "") => {
    setSelectedStatus(status);
  };

  /**
   * Thay đổi trang
   */
  const handlePageChange = (page: number) => {
    setFilters({ page });
  };

  /**
   * Thay đổi số lượng items per page
   */
  const handleLimitChange = (limit: number) => {
    setFilters({ limit, page: 1 });
  };

  return {
    // State
    categories,
    activeCategories: getActiveCategories(),
    currentCategory,
    loading,
    error,
    filters,
    pagination,
    searchQuery,
    selectedStatus,

    // Modal states
    isCreateModalOpen,
    isEditModalOpen,
    isViewModalOpen,

    // Utility functions
    getCategoryById,
    getCategoryByName,
    refreshCategories,

    // CRUD operations
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,

    // Modal operations
    handleEditCategory,
    handleViewCategory,
    openCreateModal,
    closeCreateModal,
    closeEditModal,
    closeViewModal,

    // Filter & search operations
    handleSearch,
    handleFilterByStatus,
    handlePageChange,
    handleLimitChange,

    // Reset operations
    resetFilters,
    resetState,
  };
};
