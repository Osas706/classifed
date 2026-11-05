import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Redirect, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../store/useAuthStore";
import { COLORS, SPACING, FONT_SIZES } from "../constants/theme";

export default function Index() {
  const { token, hasHydrated } = useAuthStore();

  if (!hasHydrated) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (token) return <Redirect href="/(tabs)" />;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.logo}>
        247<Text style={styles.logoRest}> Market</Text>
      </Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>24 / 7</Text>
      </View>

      <Text style={styles.kicker}>Nigeria's marketplace, open around the clock</Text>
      <Text style={styles.title}>Buy, sell & discover anything, anytime.</Text>
      <Text style={styles.copy}>
        Post an ad in minutes, or browse cars, phones, apartments, jobs and more. No account needed to look around.
      </Text>

      <TouchableOpacity style={styles.primary} onPress={() => router.replace("/(tabs)")}>
        <Text style={styles.primaryText}>Get Started</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondary} onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.secondaryText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.backgroundLight },
  screen: { flex: 1, backgroundColor: COLORS.backgroundLight },
  content: { paddingHorizontal: 24, paddingTop: 72, paddingBottom: 40 },
  logo: { fontSize: 28, fontWeight: "800", color: COLORS.primary },
  logoRest: { color: COLORS.navyInk, fontWeight: "700" },
  badge: {
    marginTop: 36,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  badgeText: { color: "#fff", fontSize: 28, fontWeight: "800" },
  kicker: {
    marginTop: 28,
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  title: { marginTop: 10, fontSize: 32, lineHeight: 38, fontWeight: "800", color: COLORS.primary },
  copy: { marginTop: 14, fontSize: FONT_SIZES.md, lineHeight: 24, color: COLORS.textSecondary },
  primary: {
    marginTop: 32,
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  primaryText: { color: "#fff", fontSize: FONT_SIZES.md, fontWeight: "700" },
  secondary: {
    marginTop: 12,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: "#fff",
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryText: { color: COLORS.primary, fontSize: FONT_SIZES.md, fontWeight: "700" },
});
