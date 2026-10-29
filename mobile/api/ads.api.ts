// mobile/api/ads.api.ts
import client from "./client";
import { Ad } from "../types/ad.types";

export const listAds = () =>
  client.get<{ data: Ad[] }>("/api/ads/list");

export const getAd = (id: string) =>
  client.get<{ data: Ad }>(`/api/ads/${id}`);

export const searchAds = (query: string) =>
  client.get<{ data: Ad[] }>(`/api/ads/search?q=${query}`);

export const discoverAds = () =>
  client.get<{ data: Ad[] }>("/api/ads/discover");

export const getAdStats = () =>
  client.get<{ data: any }>("/api/ads/stats");

export const getMyAds = (userId: string) =>
  client.get<{ data: Ad[] }>(`/api/ads/my-ads/${userId}`);

export const addAd = (formData: FormData) =>
  client.post("/api/ads/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteAd = (id: string) =>
  client.delete(`/api/ads/delete/${id}`);
