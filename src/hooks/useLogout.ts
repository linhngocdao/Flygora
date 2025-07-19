import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { logout } from "@/config/auth/auth.api";

export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear auth state - refresh_token cookie sẽ được backend clear
      clearAuth();
    },
    onError: () => {
      // Ngay cả khi logout API fail, vẫn clear local auth state
      clearAuth();
    },
  });
}
