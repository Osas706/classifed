// mobile/api/auth.api.ts
import client from "./client";
import { LoginPayload, RegisterPayload, AuthResponse } from "../types/user.types";

// export const loginUser = (payload: LoginPayload) =>
//   client.post<AuthResponse>("/api/user/login", payload);

export const loginUser = (payload: LoginPayload) => {
  const formData = new FormData();

  formData.append("email", payload.email);
  formData.append("password", payload.password);

  return client.post("/api/user/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// export const registerUser = (payload: RegisterPayload) =>
//   client.post<AuthResponse>("/api/user/register", payload);

export const registerUser = (payload: RegisterPayload) => {
  const formData = new FormData();

  formData.append("firstName", payload.firstName);
  formData.append("lastName", payload.lastName);
  formData.append("email", payload.email);
  formData.append("password", payload.password);

  return client.post("/api/user/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const forgotPassword = (email: string) =>
  client.post("/api/user/forgot-password", { email });

export const resetPassword = (token: string, password: string) =>
  client.post("/api/user/reset-password", { token, password });
