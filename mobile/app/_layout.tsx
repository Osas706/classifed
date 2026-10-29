// mobile/app/_layout.tsx
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import useAuthStore from "../store/useAuthStore";
import useSettingsStore from "../store/useSettingsStore";
import { useTheme } from "../hooks/useTheme";

export default function RootLayout() {
  const { loadFromStorage } = useAuthStore();
  const { loadSettings } = useSettingsStore();
  const { isDark } = useTheme();

  useEffect(() => {
    loadSettings();
    loadFromStorage();
  }, []);

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="listing/[id]"
          options={{ headerShown: true, title: "Ad Details", headerBackTitle: "Back" }}
        />
      </Stack>
      <Toast />
    </>
  );
}
