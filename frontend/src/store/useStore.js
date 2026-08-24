import { create } from "zustand";
import axios from "axios";

const url = "https://classifed-247market.onrender.com";

const useStore = create((set, get) => ({
  url,

  showLogin: false,
  setShowLogin: (showLogin) => set({ showLogin }),

  user: localStorage.getItem("user") || "",
  setUser: (user) => set({ user }),

  userDetails: null,
  setUserDetails: (userDetails) => set({ userDetails }),

  category: "All",
  setCategory: (category) => set({ category }),

  theme: localStorage.getItem("theme") || "light",
  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
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
