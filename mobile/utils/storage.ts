// mobile/utils/storage.ts
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as SecureStore from "expo-secure-store";

// // ── Secure storage (JWT tokens, sensitive data) ──────────────────────────────
// export const secureSet = (key: string, value: string) =>
//   SecureStore.setItemAsync(key, value);

// export const secureGet = (key: string) =>
//   SecureStore.getItemAsync(key);

// export const secureDelete = (key: string) =>
//   SecureStore.deleteItemAsync(key);

// // ── Regular storage (preferences, non-sensitive) ─────────────────────────────
// export const storageSet = (key: string, value: string) =>
//   AsyncStorage.setItem(key, value);

// export const storageGet = (key: string) =>
//   AsyncStorage.getItem(key);

// export const storageDelete = (key: string) =>
//   AsyncStorage.removeItem(key);


// mobile/utils/storage.ts
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

// ── Secure storage (JWT tokens, sensitive data) ──────────────────────────────
export const secureSet = async (key: string, value: string) => {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
    return;
  }
  return SecureStore.setItemAsync(key, value);
};

export const secureGet = async (key: string) => {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
};

export const secureDelete = async (key: string) => {
  if (Platform.OS === "web") {
    localStorage.removeItem(key);
    return;
  }
  return SecureStore.deleteItemAsync(key);
};

// ── Regular storage (preferences, non-sensitive) ─────────────────────────────
export const storageSet = (key: string, value: string) =>
  AsyncStorage.setItem(key, value);

export const storageGet = (key: string) =>
  AsyncStorage.getItem(key);

export const storageDelete = (key: string) =>
  AsyncStorage.removeItem(key);