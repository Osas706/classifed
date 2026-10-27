// mobile/api/ads.api.ts
import client from "./client";
import { Ad } from "../types/ad.types";

export const listAds = () =>
  client.get<{ ads: Ad[] }>("/api/ads/list");

export const getAd = (id: string) =>
  client.get<{ ad: Ad }>(`/api/ads/${id}`);

export const searchAds = (query: string) =>
  client.get<{ ads: Ad[] }>(`/api/ads/search?q=${query}`);

export const discoverAds = () =>
  client.get<{ ads: Ad[] }>("/api/ads/discover");

export const getAdStats = () =>
  client.get("/api/ads/stats");

export const getMyAds = (userId: string) =>
  client.get<{ ads: Ad[] }>(`/api/ads/my-ads/${userId}`);

export const addAd = (formData: FormData) =>
  client.post("/api/ads/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteAd = (id: string) =>
  client.delete(`/api/ads/delete/${id}`);
