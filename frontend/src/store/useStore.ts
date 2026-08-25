import { create } from "zustand";
import axios from "axios";

const url = "https://classifed-247market.onrender.com";

const isBrowser = typeof window !== "undefined";

interface StoreState {
  url: string;
  showLogin: boolean;
  setShowLogin: (v: boolean) => void;
  user: string;
  setUser: (v: string) => void;
  userDetails: any;
  setUserDetails: (v: any) => void;
  category: string;
  setCategory: (v: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  bookmarks: any[];
  setBookmarks: (v: any[]) => void;
  fetchBookmarks: () => Promise<void>;
}

const useStore = create<StoreState>((set, get) => ({
  url,

  showLogin: false,
  setShowLogin: (showLogin) => set({ showLogin }),

  user: isBrowser ? localStorage.getItem("user") || "" : "",
  setUser: (user) => set({ user }),

  userDetails: null,
  setUserDetails: (userDetails) => set({ userDetails }),

  category: "All",
  setCategory: (category) => set({ category }),

  theme: (isBrowser ? (localStorage.getItem("theme") as "light" | "dark") : null) || "light",
  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    if (isBrowser) {
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    }
    set({ theme: next });
  },

  bookmarks: [],
  setBookmarks: (bookmarks) => set({ bookmarks }),

  fetchBookmarks: async () => {
    const { user, bookmarks } = get();
    if (!user) return;

    try {
      const res = await axios.get(`${url}/api/user/get-bookmarks/${user}`);

      if (JSON.stringify(bookmarks) !== JSON.stringify(res?.data?.bookmarkedAds)) {
        set({ bookmarks: res?.data?.bookmarkedAds });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useStore;
