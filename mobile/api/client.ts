// mobile/api/client.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://classifed-247market.onrender.com";

const client = axios.create({
  baseURL: BASE_URL,
  // timeout: 15000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Attach stored JWT token to every request automatically
client.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // token fetch failed — proceed without auth header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response error handler
client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API URL:", error.config?.baseURL);
    console.log("Request:", error.config?.url);
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("Error:", error.message);

    return Promise.reject(error);
  }
);

export default client;
