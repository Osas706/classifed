import client, { postForm } from "./client";
import { Ad } from "../types/ad.types";

export const listAds = () =>
  client.get<{ data: Ad[] }>("/api/ads/list");

export const getAd = (id: string) =>
  client.get<{ ad: Ad }>(`/api/ads/${id}`);

export interface SearchParams {
  searchTerm?: string;
  searchLocation?: string;
  searchCategory?: string;
}

export const searchAds = (query: string | SearchParams) => {
  const params = typeof query === "string" ? { searchTerm: query } : query;
  const search = new URLSearchParams();
  search.set("searchTerm", params.searchTerm || "");
  search.set("searchLocation", params.searchLocation || "");
  search.set("searchCategory", params.searchCategory || "");
  return client.get<{ data: Ad[] }>(`/api/ads/search?${search.toString()}`);
};

export const discoverAds = () =>
  client.get<{ data: Ad[] }>("/api/ads/discover");

export const getAdStats = () =>
  client.get<{ data: any }>("/api/ads/stats");

export const getMyAds = (userId: string) =>
  client.get<{ data: Ad[] }>(`/api/ads/my-ads/${userId}`);

export const addAd = (formData: FormData) =>
  postForm<{ success: boolean; message: string; ad: Ad }>("/api/ads/add", formData);

export const deleteAd = (id: string) =>
  client.delete(`/api/ads/delete/${id}`);
