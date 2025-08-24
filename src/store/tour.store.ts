import { create } from "zustand";
import { Tour, QueryGetTours } from "@/types/tour.type";

interface TourState {
  // Current state
  tours: Tour[];
  currentTour: Tour | null;
  loading: boolean;
  error: string | null;

  // Filters & pagination
  filters: QueryGetTours;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  // Search & filter states
  searchQuery: string;
  selectedCategory: string;
  selectedStatus: "published" | "unpublished" | "";

  // Modal states
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isViewModalOpen: boolean;

  // Actions
  setTours: (tours: Tour[]) => void;
  setCurrentTour: (tour: Tour | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Filter actions
  setFilters: (filters: Partial<QueryGetTours>) => void;
  removeFilter: (filterKey: keyof QueryGetTours) => void;
  removeFilters: (filterKeys: (keyof QueryGetTours)[]) => void;
  setPagination: (pagination: Partial<TourState["pagination"]>) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedStatus: (status: "published" | "unpublished" | "") => void;

  // Modal actions
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: () => void;
  closeEditModal: () => void;
  openViewModal: () => void;
  closeViewModal: () => void;

  // Data actions
  addTour: (tour: Tour) => void;
  updateTour: (id: string, data: any) => void;
  removeTour: (tourId: string) => void;

  // Reset actions
  resetFilters: () => void;
  resetState: () => void;
}

const initialFilters: QueryGetTours = {
  page: 1,
  limit: 10,
  query: "",
  status: undefined,
  is_featured: undefined,
  is_top: undefined,
};

const initialPagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

export const useTourStore = create<TourState>((set, get) => ({
  // Initial state
  tours: [],
  currentTour: null,
  loading: false,
  error: null,

  filters: initialFilters,
  pagination: initialPagination,

  searchQuery: "",
  selectedCategory: "",
  selectedStatus: "",

  isCreateModalOpen: false,
  isEditModalOpen: false,
  isViewModalOpen: false,

  // Basic actions
  setTours: (tours) => set({ tours }),
  setCurrentTour: (tour) => set({ currentTour: tour }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Filter actions
  setFilters: (newFilters) =>
    set((state) => {
      // Tạo filters mới và loại bỏ các thuộc tính undefined
      const updatedFilters = { ...state.filters, ...newFilters };

      // Xóa các thuộc tính có giá trị undefined
      Object.keys(updatedFilters).forEach((key) => {
        if (updatedFilters[key as keyof QueryGetTours] === undefined) {
          delete updatedFilters[key as keyof QueryGetTours];
        }
      });
      return {
        filters: updatedFilters,
      };
    }),

  removeFilter: (filterKey) =>
    set((state) => {
      const newFilters = { ...state.filters };
      delete newFilters[filterKey];
      return {
        filters: { ...newFilters, page: 1 },
      };
    }),

  removeFilters: (filterKeys) =>
    set((state) => {
      const newFilters = { ...state.filters };
      filterKeys.forEach((key) => delete newFilters[key]);
      return {
        filters: { ...newFilters, page: 1 },
      };
    }),

  setPagination: (newPagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...newPagination },
    })),

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    // Cập nhật filters khi search
    const { setFilters } = get();
    setFilters({ query, page: 1 });
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    const { setFilters } = get();
    setFilters({ category_id: category || undefined, page: 1 });
  },

  setSelectedStatus: (status) => {
    set({ selectedStatus: status });
    const { setFilters } = get();
    setFilters({ status: status || undefined, page: 1 });
  },

  // Modal actions
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),

  openEditModal: () =>
    set({
      isEditModalOpen: true,
    }),
  closeEditModal: () =>
    set({
      isEditModalOpen: false,
      currentTour: null,
    }),

  openViewModal: () =>
    set({
      isViewModalOpen: true,
    }),
  closeViewModal: () =>
    set({
      isViewModalOpen: false,
      currentTour: null,
    }),

  // Data actions
  addTour: (tour) =>
    set((state) => ({
      tours: [tour, ...state.tours],
      pagination: {
        ...state.pagination,
        total: state.pagination.total + 1,
      },
    })),

  updateTour: (id, data) =>
    set((state) => {
      const updatedTour = { ...state.currentTour, ...data, id };
      return {
        tours: state.tours.map((tour) => (tour.id === id ? updatedTour : tour)),
        currentTour: state.currentTour?.id === id ? updatedTour : state.currentTour,
      };
    }),

  removeTour: (tourId) =>
    set((state) => ({
      tours: state.tours.filter((tour) => tour.id !== tourId),
      currentTour: state.currentTour?.id === tourId ? null : state.currentTour,
      pagination: {
        ...state.pagination,
        total: state.pagination.total - 1,
      },
    })),

  // Reset actions
  resetFilters: () =>
    set({
      filters: initialFilters,
      searchQuery: "",
      selectedCategory: "",
      selectedStatus: "",
      pagination: { ...initialPagination },
    }),

  resetState: () =>
    set({
      tours: [],
      currentTour: null,
      loading: false,
      error: null,
      filters: initialFilters,
      pagination: initialPagination,
      searchQuery: "",
      selectedCategory: "",
      selectedStatus: "",
      isCreateModalOpen: false,
      isEditModalOpen: false,
      isViewModalOpen: false,
    }),
}));
