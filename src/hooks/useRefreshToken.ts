import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { refreshToken } from "@/config/auth/auth.api";

export function useRefreshToken() {
  const setToken = useAuthStore((state) => state.setToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: refreshToken,
    onSuccess: (data) => {
      if (data.access_token) {
        setToken(data.access_token);
      }
    },
    onError: () => {
      // Nếu refresh thất bại, clear auth state
      clearAuth();
    },
  });
}
