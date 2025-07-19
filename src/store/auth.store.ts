import { create } from "zustand";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  // Backward compatibility
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: Cookies.get("access_token") || null,
  user: null, // User sẽ được set khi đăng nhập thành công

  // Phương thức chính để set cả token và user
  setAuth: (token: string, user: User) => {
    // Lưu access_token vào httpOnly cookie (an toàn hơn)
    // Nhưng do cần client-side access, sẽ lưu vào secure cookie
    Cookies.set("access_token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: 1, // 1 ngày
      httpOnly: false, // Client cần access để gửi API
    });

    // Chỉ lưu thông tin user vào state, KHÔNG lưu token vào localStorage
    set({ token, user });
  },

  // Phương thức để clear toàn bộ auth state
  clearAuth: () => {
    Cookies.remove("access_token");
    set({ token: null, user: null });
  },

  // Backward compatibility methods
  setToken: (token: string) => {
    Cookies.set("access_token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: 1,
    });
    set({ token });
  },
  clearToken: () => {
    Cookies.remove("access_token");
    set({ token: null });
  },
}));
