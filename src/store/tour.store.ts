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
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

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
