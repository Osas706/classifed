// mobile/types/user.types.ts
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  displayImage?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  bookmarkedAds: Ad[];
  status: "submitted" | "verified";
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  userInfo: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// avoid circular dep — import Ad from ad.types
import { Ad } from "../types/ad.types";
