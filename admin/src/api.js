import axios from "axios";

export const API_URL = "https://classifed-247market.onrender.com";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const key = localStorage.getItem("admin_key");
  if (key) {
    config.headers["x-admin-key"] = key;
  }
  return config;
});

export default api;
