// mobile/store/useAdStore.ts
import { create } from "zustand";
import { listAds, getAd, searchAds, discoverAds } from "../api/ads.api";
import { Ad } from "../types/ad.types";

interface AdState {
  ads: Ad[];
  discoverAds: Ad[];
  selectedAd: Ad | null;
  myAds: Ad[];
  isLoading: boolean;
  error: string | null;

  fetchAds: () => Promise<void>;
  fetchDiscover: () => Promise<void>;
  fetchAd: (id: string) => Promise<void>;
  searchAds: (query: string) => Promise<Ad[]>;
  setSelectedAd: (ad: Ad | null) => void;
  clearError: () => void;
}

const useAdStore = create<AdState>((set) => ({
  ads: [],
  discoverAds: [],
  selectedAd: null,
  myAds: [],
  isLoading: false,
  error: null,

  fetchAds: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await listAds();
      set({ ads: data.ads, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchDiscover: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await discoverAds();
      set({ discoverAds: data.ads, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchAd: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await getAd(id);
      set({ selectedAd: data.ad, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  searchAds: async (query) => {
    try {
      const { data } = await searchAds(query);
      return data.ads;
    } catch {
      return [];
    }
  },

  setSelectedAd: (ad) => set({ selectedAd: ad }),
  clearError: () => set({ error: null }),
}));

export default useAdStore;
