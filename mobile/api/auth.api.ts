// mobile/api/auth.api.ts
import client from "./client";
import { LoginPayload, RegisterPayload, AuthResponse } from "../types/user.types";

export const loginUser = (payload: LoginPayload) =>
  client.post<AuthResponse>("/api/user/login", payload);

export const registerUser = (payload: RegisterPayload) =>
  client.post<AuthResponse>("/api/user/register", payload);

export const forgotPassword = (email: string) =>
  client.post("/api/user/forgot-password", { email });

export const resetPassword = (token: string, password: string) =>
  client.post("/api/user/reset-password", { token, password });
