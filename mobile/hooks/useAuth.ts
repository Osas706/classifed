// mobile/hooks/useAuth.ts
import { useEffect } from "react";
import { router } from "expo-router";
import useAuthStore from "../store/useAuthStore";

export function useAuth() {
  const { user, token, isLoading, error, logout, clearError } = useAuthStore();

  const isAuthenticated = !!token;

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.replace("/(auth)/login");
    }
  };

  return { user, token, isAuthenticated, isLoading, error, logout, requireAuth, clearError };
}
