// mobile/store/useAuthStore.ts
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { loginUser, registerUser } from "../api/auth.api";
import { getMe } from "../api/user.api";
import { User, LoginPayload, RegisterPayload } from "../types/user.types";
import { secureDelete, secureGet, secureSet } from "@/utils/storage";

interface AuthState {
  user: User | null;
  userId: string | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userId: null,
  token: null,
  isLoading: false,
  error: null,

  // login: async (payload) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const { data } = await loginUser(payload);
  //     await SecureStore.setItemAsync("token", data.token);
  //     await SecureStore.setItemAsync("userId", data.user._id);
  //     set({ user: data.user, token: data.token, userId: data.user._id, isLoading: false });
  //   } catch (err: any) {
  //     set({ error: err.message, isLoading: false });
  //     throw err;
  //   }
  // },

login: async (payload) => {
  set({ isLoading: true, error: null });

  try {
    const { data } = await loginUser(payload);

    const { token, userInfo } = data;

    await secureSet("token", token);
    await secureSet("userId", userInfo._id);

    set({
      user: userInfo,
      token,
      userId: userInfo._id,
      isLoading: false,
    });
  } catch (err: any) {
    set({
      error: err.message,
      isLoading: false,
    });

    throw err;
  }
},

  register: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await registerUser(payload);
      await SecureStore.setItemAsync("token", data.token);
      await SecureStore.setItemAsync("userId", data.user._id);
      set({ user: data.user, token: data.token, userId: data.user._id, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // logout: async () => {
  //   await SecureStore.deleteItemAsync("token");
  //   await SecureStore.deleteItemAsync("userId");
  //   set({ user: null, token: null, userId: null });
  // },

  logout: async () => {
    await secureDelete("token");
    await secureDelete("userId");
    set({ user: null, token: null, userId: null });
  },

  // loadFromStorage: async () => {
  //   const token = await SecureStore.getItemAsync("token");
  //   const userId = await SecureStore.getItemAsync("userId");
  //   if (token && userId) {
  //     set({ token, userId });
  //     // Fetch full user data
  //     try {
  //       const { data } = await getMe(userId);
  //       set({ user: data.user });
  //     } catch {
  //       // Token may be expired — force logout
  //       await SecureStore.deleteItemAsync("token");
  //       await SecureStore.deleteItemAsync("userId");
  //       set({ token: null, userId: null });
  //     }
  //   }
  // },

  loadFromStorage: async () => {
    const token = await secureGet("token");
    const userId = await secureGet("userId");
    if (token && userId) {
      set({ token, userId });
      try {
        const { data } = await getMe(userId);
        set({ user: data.user });
      } catch {
        await secureDelete("token");
        await secureDelete("userId");
        set({ token: null, userId: null });
      }
    }
  },

  refreshUser: async () => {
    const { userId } = get();
    if (!userId) return;
    try {
      const { data } = await getMe(userId);
      set({ user: data.user });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
