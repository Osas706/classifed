// mobile/api/bookmarks.api.ts
import client from "./client";
import { Ad } from "../types/ad.types";

export const getBookmarks = (userId: string) =>
  client.get<{ bookmarkedAds: Ad[] }>(`/api/user/get-bookmarks/${userId}`);

export const addToBookmark = (userId: string, adId: string) =>
  client.post("/api/user/add-to-bookmark", { userId, adId });

export const removeFromBookmark = (userId: string, adId: string) =>
  client.post("/api/user/remove-from-bookmark", { userId, adId });

export const emptyBookmarks = (userId: string) =>
  client.delete(`/api/user/empty-bookmarks/${userId}`);
