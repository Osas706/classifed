// mobile/app/(tabs)/index.tsx  — Home screen
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  ActivityIndicator, RefreshControl, TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { listAds } from "../../api/ads.api";
import { Ad } from "../../types/ad.types";
import { useTheme } from "../../hooks/useTheme";
import { CATEGORIES } from "../../constants/categories";
import { SPACING, FONT_SIZES, BORDER_RADIUS, COLORS } from "../../constants/theme";
import AdCard from "../../components/AdCard";

export default function HomeScreen() {
  const { colors } = useTheme();
  const [ads, setAds] = useState<Ad[]>([]);
  const [filtered, setFiltered] = useState<Ad[]>([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAds = async () => {
    try {
      const { data } = await listAds();
      setAds(data.data);
      setFiltered(data.data);
    } catch {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchAds(); }, []);

  useEffect(() => {
    setFiltered(category === "All" ? ads : ads?.filter((a) => a.category === category));
  }, [category, ads]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.logo, { color: colors.text }, { padding: 10 }]}>247Market</Text>
      </View>

      {/* Category Filter */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CATEGORIES.map((c) => c.charAt(0).toUpperCase() + c.slice(1))}
        keyExtractor={(item) => item}
        style={styles.categoryList}
        contentContainerStyle={{ paddingHorizontal: SPACING.md }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.chip, category === item && styles.chipActive]}
            onPress={() => setCategory(item)}
          >
            <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Ads Grid */}
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={{ gap: SPACING.sm }}
          ItemSeparatorComponent={() => <View style={{ height: SPACING.sm }} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAds(); }} />}
          renderItem={({ item }) => <AdCard ad={item} onPress={() => router.push(`/listing/${item._id}`)} />}
          ListEmptyComponent={<Text style={[styles.empty, { color: colors.subText }]}>No ads found</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  logo: { fontSize: FONT_SIZES["2xl"], fontWeight: "800", color: COLORS.primary },
  categoryList: { maxHeight: 50, marginBottom: SPACING.sm },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: "#F0F0F5",
    backgroundColor: "#F0F0F5",
    marginRight: SPACING.xs,
    alignSelf: "flex-start",
  },
  chipActive: { backgroundColor: COLORS.primary },
  chipText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontWeight: "600" },
  chipTextActive: { color: "#fff" },
  grid: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  empty: { textAlign: "center", marginTop: 60, fontSize: FONT_SIZES.md },
});
