import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { login, LoginPayload } from "@/config/auth/auth.api";

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      // data đã được extract từ response.data.data trong auth.api
      if (data.access_token && data.user) {
        setAuth(data.access_token, data.user);
      }
    },
  });
}
