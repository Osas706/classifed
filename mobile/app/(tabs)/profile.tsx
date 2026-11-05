import {
  View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Modal, ActivityIndicator,
} from "react-native";
import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import useSettingsStore from "../../store/useSettingsStore";
import { CURRENCIES } from "../../constants/currencies";
import { SPACING, FONT_SIZES, BORDER_RADIUS, COLORS } from "../../constants/theme";

export default function ProfileScreen() {
  const { user, isAuthenticated, logout, refreshUser } = useAuth();
  const { colors } = useTheme();
  const { theme, toggleTheme, displayCurrency, setDisplayCurrency } = useSettingsStore();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(useCallback(() => {
    let active = true;
    if (isAuthenticated) {
      setRefreshing(true);
      refreshUser().finally(() => { if (active) setRefreshing(false); });
    }
    return () => { active = false; };
  }, [isAuthenticated]));

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
      { text: "Log Out", style: "destructive", onPress: async () => { await logout(); router.replace("/"); } },
    ]);
  };

  const currency = CURRENCIES.find((item) => item.code === displayCurrency) || CURRENCIES[0];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.avatarSection}>
          {refreshing && !user?.firstName ? <ActivityIndicator color={COLORS.primary} style={{ marginBottom: SPACING.sm }} /> : null}
          {user?.displayImage ? (
            <Image source={{ uri: user.displayImage }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarFallback, { backgroundColor: COLORS.primary }]}>
              <Text style={styles.avatarInitial}>{user?.firstName?.[0]?.toUpperCase() || "?"}</Text>
            </View>
          )}
          <Text style={[styles.name, { color: colors.text }]}>{user?.firstName || "—"} {user?.lastName || ""}</Text>
          <Text style={[styles.email, { color: colors.subText }]}>{user?.email || "Loading your details..."}</Text>
          {!!user?.phoneNumber && <Text style={[styles.email, { color: colors.subText }]}>{user.phoneNumber}</Text>}
          {!!(user?.state || user?.country) && (
            <Text style={[styles.email, { color: colors.subText }]}>{[user?.state, user?.country].filter(Boolean).join(", ")}</Text>
          )}
          {!!user?.status && (
            <View style={[styles.badge, { backgroundColor: user.status === "verified" ? COLORS.success : COLORS.warning }]}>
              <Text style={styles.badgeText}>{user.status}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => router.push("/my-ads")}>
          <Ionicons name="list-outline" size={20} color={COLORS.primary} />
          <Text style={[styles.menuLabel, { color: colors.text }]}>My Ads</Text>
          <Ionicons name="chevron-forward-outline" size={16} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={toggleTheme}>
          <Ionicons name="moon-outline" size={20} color={COLORS.primary} />
          <Text style={[styles.menuLabel, { color: colors.text }]}>Theme: {theme}</Text>
          <Ionicons name="chevron-forward-outline" size={16} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]} onPress={() => setCurrencyOpen(true)}>
          <Ionicons name="cash-outline" size={20} color={COLORS.primary} />
          <Text style={[styles.menuLabel, { color: colors.text }]}>Currency: {currency.flag} {currency.code}</Text>
          <Ionicons name="chevron-forward-outline" size={16} color={colors.subText} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={currencyOpen} transparent animationType="fade" onRequestClose={() => setCurrencyOpen(false)}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setCurrencyOpen(false)}>
          <View style={[styles.sheet, { backgroundColor: colors.card }]}>
            <Text style={[styles.sheetTitle, { color: colors.text }]}>Display currency</Text>
            <ScrollView>
              {CURRENCIES.map((item) => (
                <TouchableOpacity
                  key={item.code}
                  style={styles.currencyRow}
                  onPress={async () => {
                    await setDisplayCurrency(item.code);
                    setCurrencyOpen(false);
                  }}
                >
                  <Text style={{ color: colors.text, fontSize: FONT_SIZES.md }}>
                    {item.flag}  {item.label} ({item.code})
                  </Text>
                  {item.code === displayCurrency && <Ionicons name="checkmark" size={18} color={COLORS.accent} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
  email: { fontSize: FONT_SIZES.sm, marginBottom: 2 },
  badge: { paddingHorizontal: SPACING.md, paddingVertical: 3, borderRadius: BORDER_RADIUS.full, marginTop: SPACING.sm },
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
  backdrop: { flex: 1, backgroundColor: "rgba(7,19,40,0.45)", justifyContent: "flex-end" },
  sheet: { maxHeight: "75%", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: SPACING.md },
  sheetTitle: { fontSize: FONT_SIZES.lg, fontWeight: "700", marginBottom: SPACING.sm },
  currencyRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "rgba(13,33,64,0.12)" },
});
