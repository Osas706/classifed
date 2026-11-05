// mobile/hooks/useAuth.ts
import { router } from "expo-router";
import useAuthStore from "../store/useAuthStore";

export function useAuth() {
  const { user, userId, token, isLoading, error, logout, clearError, refreshUser } = useAuthStore();

  const isAuthenticated = !!token;

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.replace("/(auth)/login");
    }
  };

  return { user, userId, token, isAuthenticated, isLoading, error, logout, requireAuth, clearError, refreshUser };
}
