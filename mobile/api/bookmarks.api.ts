import client, { postForm } from "./client";
import { Ad } from "../types/ad.types";

export const getBookmarks = (userId: string) =>
  client.get<{ bookmarkedAds: Ad[] }>(`/api/user/get-bookmarks/${userId}`);

const bookmarkForm = (userId: string, ad: Ad) => {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("bookmarkedAd", JSON.stringify(ad));
  return formData;
};

export const addToBookmark = (userId: string, ad: Ad) =>
  postForm("/api/user/add-to-bookmark", bookmarkForm(userId, ad));

export const removeFromBookmark = (userId: string, ad: Ad) =>
  postForm("/api/user/remove-from-bookmark", bookmarkForm(userId, ad));

export const emptyBookmarks = (userId: string) =>
  client.delete(`/api/user/empty-bookmarks/${userId}`);
