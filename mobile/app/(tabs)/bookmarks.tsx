// mobile/app/(tabs)/bookmarks.tsx
import {
  View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import useSettingsStore from "../../store/useSettingsStore";
import AdCard from "../../components/AdCard";
import { SPACING, FONT_SIZES, BORDER_RADIUS, COLORS } from "../../constants/theme";

export default function BookmarksScreen() {
  const { isAuthenticated, user } = useAuth();
  const { colors } = useTheme();
  const { bookmarks, fetchBookmarks } = useSettingsStore();

  useEffect(() => {
    if (user?._id) fetchBookmarks(user._id);
  }, [user]);

  if (!isAuthenticated) {
    return (
      <View style={styles.authWall}>
        <Ionicons name="bookmark-outline" size={48} color={COLORS.textSecondary} />
        <Text style={styles.authWallText}>Sign in to see your saved ads</Text>
        <TouchableOpacity style={styles.signInBtn} onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.signInBtnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Saved Ads</Text>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ gap: SPACING.sm }}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.sm }} />}
        renderItem={({ item }) => <AdCard ad={item} onPress={() => router.push(`/listing/${item._id}`)} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="bookmark-outline" size={48} color={COLORS.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.subText }]}>No saved ads yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: FONT_SIZES["2xl"], fontWeight: "700", margin: SPACING.md },
  grid: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  empty: { alignItems: "center", marginTop: 60, gap: SPACING.sm },
  emptyText: { fontSize: FONT_SIZES.md },
  authWall: { flex: 1, alignItems: "center", justifyContent: "center", gap: SPACING.md },
  authWallText: { fontSize: FONT_SIZES.lg, color: COLORS.textSecondary },
  signInBtn: { backgroundColor: COLORS.primary, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.xl, borderRadius: BORDER_RADIUS.md },
  signInBtnText: { color: "#fff", fontWeight: "700" },
});
