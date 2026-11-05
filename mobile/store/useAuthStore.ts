// mobile/store/useAuthStore.ts
import { create } from "zustand";
import { loginUser, registerUser } from "../api/auth.api";
import { getMe } from "../api/user.api";
import { User, LoginPayload, RegisterPayload } from "../types/user.types";
import { secureDelete, secureGet, secureSet, storageDelete, storageGet, storageSet } from "../utils/storage";

interface AuthState {
  user: User | null;
  userId: string | null;
  token: string | null;
  isLoading: boolean;
  hasHydrated: boolean;
  error: string | null;

  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

const cacheUser = async (user: User, token: string) => {
  await secureSet("token", token);
  await secureSet("userId", user._id);
  await storageSet("user", JSON.stringify(user));
};

const unwrapUser = (data: any): User | null => {
  if (data?.user?._id) return data.user;
  if (data?._id) return data;
  return null;
};

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userId: null,
  token: null,
  isLoading: false,
  hasHydrated: false,
  error: null,

  login: async (payload) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await loginUser(payload);

      const { token, userInfo } = data;
      await cacheUser(userInfo, token);

      set({
        user: userInfo,
        token,
        userId: userInfo._id,
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || err.message,
        isLoading: false,
      });

      throw err;
    }
  },

  register: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await registerUser(payload);
      const user = data.userInfo || data.user;
      await cacheUser(user, data.token);
      set({
        user,
        token: data.token,
        userId: user._id,
        isLoading: false,
      });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || err.message, isLoading: false });
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
    await storageDelete("user");
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
    try {
      const token = await secureGet("token");
      const userId = await secureGet("userId");
      const cached = await storageGet("user");
      if (cached) {
        try {
          set({ user: JSON.parse(cached) });
        } catch {
          // ignore a corrupt cache and wait for the network profile
        }
      }
      if (token && userId) {
        set({ token, userId });
        try {
          const { data } = await getMe(userId);
          const user = unwrapUser(data);
          if (user) {
            await storageSet("user", JSON.stringify(user));
            set({ user });
          }
        } catch (err: any) {
          const status = err?.response?.status;
          if (status === 400 || status === 401 || status === 404) {
            await secureDelete("token");
            await secureDelete("userId");
            await storageDelete("user");
            set({ token: null, userId: null, user: null });
          }
        }
      }
    } finally {
      set({ hasHydrated: true });
    }
  },

  refreshUser: async () => {
    const { userId } = get();
    if (!userId) return;
    try {
      const { data } = await getMe(userId);
      const user = unwrapUser(data);
      if (user) {
        await storageSet("user", JSON.stringify(user));
        set({ user });
      }
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
