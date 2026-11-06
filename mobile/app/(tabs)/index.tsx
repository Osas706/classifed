import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,
  FlatList, ScrollView, ActivityIndicator, RefreshControl,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { listAds } from "../../api/ads.api";
import { Ad } from "../../types/ad.types";
import { useTheme } from "../../hooks/useTheme";
import { AD_CATEGORIES, SEARCH_LOCATIONS } from "../../constants/categories";
import { SPACING, FONT_SIZES, BORDER_RADIUS, COLORS } from "../../constants/theme";
import AdCard from "../../components/AdCard";
import Pagination from "../../components/Pagination";
import OptionPicker from "../../components/OptionPicker";

const PAGE_SIZE = 8;

export default function HomeScreen() {
  const { colors } = useTheme();
  const [ads, setAds] = useState<Ad[]>([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const fetchAds = async () => {
    try {
      const { data } = await listAds();
      setAds(data.data || []);
    } catch {
      setAds([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchAds(); }, []);

  const counts = useMemo(() => {
    return ads.reduce<Record<string, number>>((acc, ad) => {
      const key = (ad.category || "").toLowerCase();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [ads]);

  const filtered = useMemo(() => {
    if (category === "All") return ads;
    return ads.filter((ad) => (ad.category || "").toLowerCase() === category);
  }, [ads, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const runSearch = () => {
    router.push({
      pathname: "/(tabs)/search",
      params: { searchTerm, searchLocation, searchCategory },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={loading ? [] : pageItems}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchAds(); }} tintColor={COLORS.primary} />}
        ListHeaderComponent={
          <View>
            <Text style={[styles.logo, { color: COLORS.primary }]}>
              247<Text style={{ color: colors.text }}> Market</Text>
            </Text>

            <View style={styles.hero}>
              <Text style={styles.heroTitle}>Welcome to Nigeria's Largest Marketplace</Text>
              <Text style={styles.heroCopy}>Buy and sell cars, phones, property, jobs and more.</Text>
            </View>

            <View style={[styles.searchCard, { backgroundColor: colors.card }]}>
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="What are you looking for?"
                placeholderTextColor={COLORS.textSecondary}
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              <OptionPicker
                value={searchLocation}
                placeholder="Select location"
                options={SEARCH_LOCATIONS}
                onChange={setSearchLocation}
              />
              <OptionPicker
                value={searchCategory}
                placeholder="Select category"
                options={AD_CATEGORIES.map((item) => ({ label: item.label, value: item.key }))}
                onChange={setSearchCategory}
              />
              <TouchableOpacity style={styles.searchBtn} onPress={runSearch}>
                <Text style={styles.searchBtnText}>Search Now</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.section, { color: colors.text }]}>Ads By Category</Text>
            <Text style={[styles.sectionHint, { color: colors.subText }]}>Select to explore</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[{ key: "All", label: "All", icon: "grid-outline" as const }, ...AD_CATEGORIES]}
              keyExtractor={(item) => item.key}
              contentContainerStyle={{ paddingVertical: SPACING.sm }}
              renderItem={({ item }) => {
                const active = category === item.key;
                const count = item.key === "All" ? ads.length : counts[item.key] || 0;
                return (
                  <TouchableOpacity
                    style={[styles.cat, { backgroundColor: active ? COLORS.primary : colors.card, borderColor: active ? COLORS.primary : colors.border }]}
                    onPress={() => { setCategory(item.key); setPage(1); }}
                  >
                    {count > 0 && (
                      <View style={styles.count}><Text style={styles.countText}>{count}</Text></View>
                    )}
                    <Ionicons name={item.icon} size={22} color={active ? "#fff" : COLORS.primary} />
                    <Text style={[styles.catLabel, { color: active ? "#fff" : colors.text }]}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
            />

            <View style={styles.recentRow}>
              <Text style={[styles.section, { color: colors.text, marginTop: SPACING.md }]}>Recent ads for you</Text>
            </View>
            {loading && <ActivityIndicator size="large" color={COLORS.primary} style={{ marginVertical: 30 }} />}
          </View>
        }
        renderItem={({ item }) => <AdCard ad={item} onPress={() => router.push(`/listing/${item._id}`)} />}
        ListEmptyComponent={!loading ? <Text style={[styles.empty, { color: colors.subText }]}>No ads in this category yet</Text> : undefined}
        ListFooterComponent={<Pagination page={page} total={totalPages} onChange={setPage} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: SPACING.md, paddingBottom: SPACING.xl },
  logo: { fontSize: FONT_SIZES.xl, fontWeight: "800", marginBottom: SPACING.md },
  hero: {
    backgroundColor: COLORS.navyDeep,
    borderRadius: 16,
    minHeight: 150,
    padding: SPACING.lg,
    justifyContent: "flex-end",
  },
  heroTitle: { color: "#fff", fontSize: 22, fontWeight: "700", lineHeight: 28 },
  heroCopy: { color: "rgba(255,255,255,0.8)", marginTop: 6, fontSize: FONT_SIZES.sm },
  searchCard: {
    marginTop: -18,
    marginHorizontal: SPACING.sm,
    borderRadius: 16,
    padding: SPACING.sm,
    gap: SPACING.sm,
    shadowColor: "#071328",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  searchInput: { paddingHorizontal: SPACING.sm, paddingVertical: 12, fontSize: FONT_SIZES.sm },
  searchBtn: { backgroundColor: COLORS.primary, borderRadius: 999, paddingVertical: 12, alignItems: "center" },
  searchBtnText: { color: "#fff", fontWeight: "700" },
  section: { fontSize: FONT_SIZES.xl, fontWeight: "800", marginTop: SPACING.lg },
  sectionHint: { fontSize: FONT_SIZES.sm, marginTop: 2 },
  cat: {
    width: 104,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginRight: SPACING.sm,
    gap: 8,
  },
  catLabel: { fontSize: FONT_SIZES.xs, fontWeight: "700", textAlign: "center" },
  count: {
    position: "absolute",
    top: -6,
    right: -4,
    backgroundColor: "#dc2626",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  countText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  recentRow: { marginBottom: SPACING.sm },
  empty: { textAlign: "center", marginTop: 24, fontSize: FONT_SIZES.md },
});
