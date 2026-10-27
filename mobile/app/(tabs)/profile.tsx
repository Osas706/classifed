// mobile/app/(tabs)/profile.tsx
import {
  View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import useSettingsStore from "../../store/useSettingsStore";
import { SPACING, FONT_SIZES, BORDER_RADIUS, COLORS } from "../../constants/theme";

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useAuth();
  const { colors } = useTheme();
  const { theme, toggleTheme, displayCurrency, setDisplayCurrency } = useSettingsStore();

  if (!isAuthenticated) {
    return (
      <View style={styles.authWall}>
        <Ionicons name="person-outline" size={48} color={COLORS.textSecondary} />
        <Text style={styles.authWallText}>Sign in to view your profile</Text>
        <TouchableOpacity style={styles.signInBtn} onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.signInBtnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: async () => { await logout(); router.replace("/(auth)/login"); } },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          {user?.displayImage ? (
            <Image source={{ uri: user.displayImage }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarFallback, { backgroundColor: COLORS.primaryLight }]}>
              <Text style={styles.avatarInitial}>{user?.firstName?.[0]?.toUpperCase()}</Text>
            </View>
          )}
          <Text style={[styles.name, { color: colors.text }]}>{user?.firstName} {user?.lastName}</Text>
          <Text style={[styles.email, { color: colors.subText }]}>{user?.email}</Text>
          <View style={[styles.badge, { backgroundColor: user?.status === "verified" ? COLORS.success : COLORS.warning }]}>
            <Text style={styles.badgeText}>{user?.status}</Text>
          </View>
        </View>

        {/* Menu Items */}
        {[
          { icon: "list-outline" as const, label: "My Ads", onPress: () => {} },
          { icon: "moon-outline" as const, label: `Theme: ${theme}`, onPress: toggleTheme },
          { icon: "cash-outline" as const, label: `Currency: ${displayCurrency}`, onPress: () => {} },
        ].map(({ icon, label, onPress }) => (
          <TouchableOpacity key={label} style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={onPress}>
            <Ionicons name={icon} size={20} color={COLORS.primary} />
            <Text style={[styles.menuLabel, { color: colors.text }]}>{label}</Text>
            <Ionicons name="chevron-forward-outline" size={16} color={colors.subText} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: SPACING.md },
  avatarSection: { alignItems: "center", marginBottom: SPACING.xl },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: SPACING.sm },
  avatarFallback: { width: 90, height: 90, borderRadius: 45, alignItems: "center", justifyContent: "center", marginBottom: SPACING.sm },
  avatarInitial: { fontSize: FONT_SIZES["3xl"], fontWeight: "700", color: "#fff" },
  name: { fontSize: FONT_SIZES.xl, fontWeight: "700", marginBottom: 2 },
  email: { fontSize: FONT_SIZES.sm, marginBottom: SPACING.sm },
  badge: { paddingHorizontal: SPACING.md, paddingVertical: 3, borderRadius: BORDER_RADIUS.full },
  badgeText: { color: "#fff", fontSize: FONT_SIZES.xs, fontWeight: "700", textTransform: "capitalize" },
  menuItem: {
    flexDirection: "row", alignItems: "center", gap: SPACING.sm,
    padding: SPACING.md, borderRadius: BORDER_RADIUS.md,
    borderWidth: 1, marginBottom: SPACING.sm,
  },
  menuLabel: { flex: 1, fontSize: FONT_SIZES.md },
  logoutBtn: { flexDirection: "row", alignItems: "center", gap: SPACING.sm, marginTop: SPACING.md, padding: SPACING.md },
  logoutText: { color: COLORS.error, fontSize: FONT_SIZES.md, fontWeight: "600" },
  authWall: { flex: 1, alignItems: "center", justifyContent: "center", gap: SPACING.md },
  authWallText: { fontSize: FONT_SIZES.lg, color: COLORS.textSecondary },
  signInBtn: { backgroundColor: COLORS.primary, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.xl, borderRadius: BORDER_RADIUS.md },
  signInBtnText: { color: "#fff", fontWeight: "700" },
});
