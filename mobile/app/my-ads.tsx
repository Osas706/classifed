import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { getMyAds } from "../api/ads.api";
import { Ad } from "../types/ad.types";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import AdCard from "../components/AdCard";
import Pagination from "../components/Pagination";
import { COLORS, FONT_SIZES, SPACING } from "../constants/theme";

const PAGE_SIZE = 8;

export default function MyAdsScreen() {
  const { user, userId, isAuthenticated } = useAuth();
  const { colors } = useTheme();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const id = user?._id || userId;

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    getMyAds(id)
      .then(({ data }) => setAds(data.data || []))
      .catch(() => setAds([]))
      .finally(() => setLoading(false));
  }, [id]);

  if (!isAuthenticated) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.text }}>Sign in to see your ads</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const totalPages = Math.max(1, Math.ceil(ads.length / PAGE_SIZE));
  const pageItems = ads.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={pageItems}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <AdCard ad={item} onPress={() => router.push(`/listing/${item._id}`)} />}
          ListEmptyComponent={<Text style={[styles.empty, { color: colors.subText }]}>You have not posted any ads yet</Text>}
          ListFooterComponent={ads.length > 0 ? <Pagination page={page} total={totalPages} onChange={setPage} /> : undefined}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: SPACING.md, paddingBottom: SPACING.xl },
  empty: { textAlign: "center", marginTop: 40, fontSize: FONT_SIZES.md },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  link: { color: COLORS.primary, fontWeight: "700" },
});
