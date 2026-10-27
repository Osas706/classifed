// mobile/api/user.api.ts
import client from "./client";
import { User } from "../types/user.types";

export const getMe = (userId: string) =>
  client.get<{ user: User }>(`/api/user/${userId}`);

export const updateMe = (userId: string, formData: FormData) =>
  client.post(`/api/user/update/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteAccount = (userId: string) =>
  client.delete(`/api/user/delete-account/${userId}`);
