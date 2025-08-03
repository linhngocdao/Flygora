import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getTours,
  getPrivateTours,
  getFeaturedTours,
  getToursByCategory,
  getTourById,
  createTour,
  updateTour,
  updateTourStatus,
  deleteTour,
  uploadTourImage,
} from "@/config/tour/tour.api";
import { QueryGetTours, TourPayload } from "@/types/tour.type";

// Query keys
export const tourKeys = {
  all: ["tours"] as const,
  lists: () => [...tourKeys.all, "list"] as const,
  list: (filters: QueryGetTours) => [...tourKeys.lists(), { filters }] as const,
  details: () => [...tourKeys.all, "detail"] as const,
  detail: (id: string) => [...tourKeys.details(), id] as const,
  private: () => [...tourKeys.all, "private"] as const,
  privateList: (filters: QueryGetTours) => [...tourKeys.private(), { filters }] as const,
  featured: () => [...tourKeys.all, "featured"] as const,
  category: (categoryId: string) => [...tourKeys.all, "category", categoryId] as const,
};

// Hook để lấy danh sách tours public
export function useTours(params?: QueryGetTours) {
  return useQuery({
    queryKey: tourKeys.list(params || {}),
    queryFn: () => getTours(params || {}),
    staleTime: 5 * 60 * 1000, // 5 phút
  });
}

// Hook để lấy danh sách tours private (admin)
export function usePrivateTours(params?: QueryGetTours) {
  return useQuery({
    queryKey: tourKeys.privateList(params || {}),
    queryFn: () => getPrivateTours(params || {}),
    staleTime: 2 * 60 * 1000, // 2 phút
  });
}

// Hook để lấy tours nổi bật
export function useFeaturedTours(params?: QueryGetTours) {
  return useQuery({
    queryKey: tourKeys.featured(),
    queryFn: () => getFeaturedTours(params),
    staleTime: 10 * 60 * 1000, // 10 phút
  });
}

// Hook để lấy tours theo category
export function useToursByCategory(categoryId: string, params?: QueryGetTours) {
  return useQuery({
    queryKey: tourKeys.category(categoryId),
    queryFn: () => getToursByCategory(categoryId, params),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook để lấy chi tiết tour
export function useTour(id: string) {
  return useQuery({
    queryKey: tourKeys.detail(id),
    queryFn: () => getTourById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

// Hook để tạo tour mới
export function useCreateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TourPayload) => createTour(data),
    onSuccess: (response) => {
      // Invalidate và refetch tours lists
      queryClient.invalidateQueries({ queryKey: tourKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tourKeys.private() });

      toast.success("Tạo tour thành công!");
      return response;
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error.message || "Lỗi khi tạo tour";
      toast.error(message);
    },
  });
}

// Hook để cập nhật tour
export function useUpdateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TourPayload> }) => updateTour(id, data),
    onSuccess: (response, { id }) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: tourKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tourKeys.private() });
      queryClient.invalidateQueries({ queryKey: tourKeys.detail(id) });

      toast.success("Cập nhật tour thành công!");
      return response;
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error.message || "Lỗi khi cập nhật tour";
      toast.error(message);
    },
  });
}

// Hook để cập nhật trạng thái tour
export function useUpdateTourStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "published" | "unpublished" }) =>
      updateTourStatus(id, status),
    onSuccess: (response, { id }) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: tourKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tourKeys.private() });
      queryClient.invalidateQueries({ queryKey: tourKeys.detail(id) });

      toast.success("Cập nhật trạng thái tour thành công!");
      return response;
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || error.message || "Lỗi khi cập nhật trạng thái";
      toast.error(message);
    },
  });
}

// Hook để xóa tour
export function useDeleteTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTour(id),
    onSuccess: (response, id) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: tourKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tourKeys.private() });
      queryClient.removeQueries({ queryKey: tourKeys.detail(id) });

      toast.success("Xóa tour thành công!");
      return response;
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error.message || "Lỗi khi xóa tour";
      toast.error(message);
    },
  });
}

// Hook để upload hình ảnh tour
export function useUploadTourImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tourId, file, caption }: { tourId: string; file: File; caption?: string }) =>
      uploadTourImage(tourId, file, caption),
    onSuccess: (response, { tourId }) => {
      // Invalidate tour detail để refetch images
      queryClient.invalidateQueries({ queryKey: tourKeys.detail(tourId) });

      toast.success("Upload hình ảnh thành công!");
      return response;
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error.message || "Lỗi khi upload hình ảnh";
      toast.error(message);
    },
  });
}
