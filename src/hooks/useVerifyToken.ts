import { verifyToken } from "@/config/auth/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useVerifyToken(enabled = true) {
  const clearToken = useAuthStore((state) => state.clearToken);

  const query = useQuery({
    queryKey: ["verify-token"],
    queryFn: verifyToken,
    enabled,
    retry: false,
  });

  // Xử lý error với useEffect thay vì onError
  useEffect(() => {
    if (query.error) {
      clearToken();
    }
  }, [query.error, clearToken]);

  return query;
}
