import {
  View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import useSettingsStore from "../../store/useSettingsStore";
import AdCard from "../../components/AdCard";
import Pagination from "../../components/Pagination";
import { SPACING, FONT_SIZES, BORDER_RADIUS, COLORS } from "../../constants/theme";

const PAGE_SIZE = 9;

export default function BookmarksScreen() {
  const { isAuthenticated, user } = useAuth();
  const { colors } = useTheme();
  const { bookmarks, fetchBookmarks, clearBookmarks } = useSettingsStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user?._id) fetchBookmarks(user._id);
  }, [user?._id]);

  useEffect(() => { setPage(1); }, [bookmarks.length]);

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

  const totalPages = Math.max(1, Math.ceil(bookmarks.length / PAGE_SIZE));
  const pageItems = bookmarks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const emptyAll = () => {
    Alert.alert("Empty collection", "Remove every saved ad?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete all",
        style: "destructive",
        onPress: async () => {
          try {
            await clearBookmarks(user!._id);
            Toast.show({ type: "success", text1: "Bookmark collection cleared" });
          } catch (err: any) {
            Toast.show({ type: "error", text1: "Could not clear bookmarks", text2: err.message });
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={pageItems}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Ads in your Bookmark Collection</Text>
            {bookmarks.length > 0 && (
              <TouchableOpacity style={styles.emptyBtn} onPress={emptyAll}>
                <Text style={styles.emptyBtnText}>Empty Collection</Text>
                <Ionicons name="trash-outline" size={16} color={COLORS.error} />
              </TouchableOpacity>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <AdCard ad={item} showRemove onPress={() => router.push(`/listing/${item._id}`)} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="bookmark-outline" size={48} color={COLORS.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.subText }]}>You haven't bookmarked any ad</Text>
          </View>
        }
        ListFooterComponent={bookmarks.length > 0 ? <Pagination page={page} total={totalPages} onChange={setPage} /> : undefined}
      />
    </SafeAreaView>
  );
}

// Styling
const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: SPACING.md, paddingBottom: SPACING.xl },
  header: { marginBottom: SPACING.md, gap: SPACING.sm },
  title: { fontSize: FONT_SIZES.xl, fontWeight: "800" },
  emptyBtn: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.error,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  emptyBtnText: { color: COLORS.error, fontWeight: "600" },
  empty: { alignItems: "center", marginTop: 60, gap: SPACING.sm },
  emptyText: { fontSize: FONT_SIZES.md },
  authWall: { flex: 1, alignItems: "center", justifyContent: "center", gap: SPACING.md },
  authWallText: { fontSize: FONT_SIZES.lg, color: COLORS.textSecondary },
  signInBtn: { backgroundColor: COLORS.primary, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.xl, borderRadius: BORDER_RADIUS.md },
  signInBtnText: { color: "#fff", fontWeight: "700" },
});
