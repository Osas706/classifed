// mobile/store/useSettingsStore.ts
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ad } from "../types/ad.types";
import { getBookmarks, addToBookmark, removeFromBookmark } from "../api/bookmarks.api";

type Theme = "light" | "dark";

interface SettingsState {
  theme: Theme;
  displayCurrency: string;
  bookmarks: Ad[];

  toggleTheme: () => Promise<void>;
  setDisplayCurrency: (currency: string) => Promise<void>;
  loadSettings: () => Promise<void>;
  fetchBookmarks: (userId: string) => Promise<void>;
  addBookmark: (userId: string, adId: string) => Promise<void>;
  removeBookmark: (userId: string, adId: string) => Promise<void>;
}

const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: "light",
  displayCurrency: "NGN",
  bookmarks: [],

  loadSettings: async () => {
    const theme = (await AsyncStorage.getItem("theme")) as Theme | null;
    const currency = await AsyncStorage.getItem("displayCurrency");
    set({
      theme: theme || "light",
      displayCurrency: currency || "NGN",
    });
  },

  toggleTheme: async () => {
    const next = get().theme === "light" ? "dark" : "light";
    await AsyncStorage.setItem("theme", next);
    set({ theme: next });
  },

  setDisplayCurrency: async (currency) => {
    await AsyncStorage.setItem("displayCurrency", currency);
    set({ displayCurrency: currency });
  },

  fetchBookmarks: async (userId) => {
    try {
      const { data } = await getBookmarks(userId);
      set({ bookmarks: data.bookmarkedAds });
    } catch {
      // silently fail
    }
  },

  addBookmark: async (userId, adId) => {
    await addToBookmark(userId, adId);
    await get().fetchBookmarks(userId);
  },

  removeBookmark: async (userId, adId) => {
    await removeFromBookmark(userId, adId);
    await get().fetchBookmarks(userId);
  },
}));

export default useSettingsStore;
