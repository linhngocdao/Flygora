import { create } from "zustand";
import { Category, QueryGetCategories } from "@/types/categories.type";
import * as categoryAPI from "@/config/categoryTour/categoryTour.api";

interface CategoryState {
  // Current state
  categories: Category[];
  currentCategory: Category | null;
  loading: boolean;
  error: string | null;

  // Filters & pagination
  filters: QueryGetCategories;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  // Search & filter states
  searchQuery: string;
  selectedStatus: "active" | "inactive" | "";

  // Modal states
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isViewModalOpen: boolean;

  // Actions
  setCategories: (categories: Category[]) => void;
  setCurrentCategory: (category: Category | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Filter actions
  setFilters: (filters: Partial<QueryGetCategories>) => void;
  setPagination: (pagination: Partial<CategoryState["pagination"]>) => void;
  setSearchQuery: (query: string) => void;
  setSelectedStatus: (status: "active" | "inactive" | "") => void;

  // Modal actions
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: () => void;
  closeEditModal: () => void;
  openViewModal: () => void;
  closeViewModal: () => void;

  // Data actions
  addCategory: (category: Category) => void;
  updateCategory: (id: string, data: any) => void;
  removeCategory: (categoryId: string) => void;

  // API actions
  fetchCategories: () => Promise<void>;
  createCategory: (data: any) => Promise<void>;
  updateCategoryById: (id: string, data: any) => Promise<void>;
  deleteCategoryById: (id: string) => Promise<void>;

  // Reset actions
  resetFilters: () => void;
  resetState: () => void;
}

const initialFilters: QueryGetCategories = {
  page: 1,
  limit: 10,
  query: undefined,
  status: undefined,
};

const initialPagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

export const useCategoryStore = create<CategoryState>((set, get) => ({
  // Initial state
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,

  filters: initialFilters,
  pagination: initialPagination,

  searchQuery: "",
  selectedStatus: "",

  isCreateModalOpen: false,
  isEditModalOpen: false,
  isViewModalOpen: false,

  // Basic actions
  setCategories: (categories) => set({ categories }),
  setCurrentCategory: (category) => set({ currentCategory: category }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Filter actions
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  setPagination: (newPagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...newPagination },
    })),

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    const { setFilters } = get();
    setFilters({ query, page: 1 });
  },

  setSelectedStatus: (status) => {
    set({ selectedStatus: status });
    const { setFilters } = get();
    setFilters({ status: status || undefined, page: 1 });
  },

  // Modal actions
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),

  openEditModal: () => set({ isEditModalOpen: true }),
  closeEditModal: () =>
    set({
      isEditModalOpen: false,
      currentCategory: null,
    }),

  openViewModal: () => set({ isViewModalOpen: true }),
  closeViewModal: () =>
    set({
      isViewModalOpen: false,
      currentCategory: null,
    }),

  // Data actions
  addCategory: (category) =>
    set((state) => ({
      categories: [category, ...state.categories],
      pagination: {
        ...state.pagination,
        total: state.pagination.total + 1,
      },
    })),

  updateCategory: (id, data) =>
    set((state) => {
      const updatedCategory = { ...state.currentCategory, ...data, id };
      return {
        categories: state.categories.map((category) =>
          category.id === id ? updatedCategory : category
        ),
        currentCategory: state.currentCategory?.id === id ? updatedCategory : state.currentCategory,
      };
    }),

  removeCategory: (categoryId) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== categoryId),
      currentCategory: state.currentCategory?.id === categoryId ? null : state.currentCategory,
      pagination: {
        ...state.pagination,
        total: state.pagination.total - 1,
      },
    })),

  // API actions
  fetchCategories: async () => {
    const { setLoading, setError, setCategories, setPagination, filters } = get();

    try {
      setLoading(true);
      setError(null);

      const response: any = await categoryAPI.getCategory(filters);

      if (response.success && response.data) {
        // Response.data luôn là array theo API structure
        setCategories(response.data);

        // Cập nhật pagination từ response
        if (response.pagination) {
          setPagination({
            page: response.pagination.page,
            limit: response.pagination.limit,
            total: response.pagination.total,
            totalPages: response.pagination.totalPages,
          });
        }
      } else {
        throw new Error(response.message || "Failed to fetch categories");
      }
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      setError(error.message || "Có lỗi xảy ra khi tải danh mục");
    } finally {
      setLoading(false);
    }
  },

  createCategory: async (data) => {
    const { setLoading, setError, addCategory, closeCreateModal } = get();

    try {
      setLoading(true);
      setError(null);

      const response: any = await categoryAPI.createCategory(data);

      if (response.success && response.data) {
        addCategory(response.data);
        closeCreateModal();
      } else {
        throw new Error(response.message || "Failed to create category");
      }
    } catch (error: any) {
      console.error("Error creating category:", error);
      setError(error.message || "Có lỗi xảy ra khi tạo danh mục");
    } finally {
      setLoading(false);
    }
  },

  updateCategoryById: async (id, data) => {
    const { setLoading, setError, updateCategory, closeEditModal } = get();

    try {
      setLoading(true);
      setError(null);

      const response: any = await categoryAPI.updateCategory(id, data);

      if (response.success && response.data) {
        updateCategory(id, response.data);
        closeEditModal();
      } else {
        throw new Error(response.message || "Failed to update category");
      }
    } catch (error: any) {
      console.error("Error updating category:", error);
      setError(error.message || "Có lỗi xảy ra khi cập nhật danh mục");
    } finally {
      setLoading(false);
    }
  },

  deleteCategoryById: async (id) => {
    const { setLoading, setError, removeCategory } = get();

    try {
      setLoading(true);
      setError(null);

      const response: any = await categoryAPI.deleteCategory(id);

      if (response.success) {
        removeCategory(id);
      } else {
        throw new Error(response.message || "Failed to delete category");
      }
    } catch (error: any) {
      console.error("Error deleting category:", error);
      setError(error.message || "Có lỗi xảy ra khi xóa danh mục");
    } finally {
      setLoading(false);
    }
  },

  // Reset actions
  resetFilters: () =>
    set({
      filters: initialFilters,
      searchQuery: "",
      selectedStatus: "",
      pagination: { ...initialPagination },
    }),

  resetState: () =>
    set({
      categories: [],
      currentCategory: null,
      loading: false,
      error: null,
      filters: initialFilters,
      pagination: initialPagination,
      searchQuery: "",
      selectedStatus: "",
      isCreateModalOpen: false,
      isEditModalOpen: false,
      isViewModalOpen: false,
    }),
}));
