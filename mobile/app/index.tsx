// mobile/app/index.tsx
// Entry point: redirect based on auth state
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import useAuthStore from "../store/useAuthStore";
import { COLORS } from "../constants/theme";

export default function Index() {
  const { token } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Brief wait to let loadFromStorage() finish in _layout.tsx
    const timer = setTimeout(() => setChecking(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return token ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
