import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,
  FlatList, ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { searchAds } from "../../api/ads.api";
import { Ad } from "../../types/ad.types";
import { useTheme } from "../../hooks/useTheme";
import { AD_CATEGORIES, SEARCH_LOCATIONS } from "../../constants/categories";
import { SPACING, FONT_SIZES, COLORS } from "../../constants/theme";
import AdCard from "../../components/AdCard";
import Pagination from "../../components/Pagination";
import OptionPicker from "../../components/OptionPicker";

const PAGE_SIZE = 8;

export default function SearchScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ searchTerm?: string; searchLocation?: string; searchCategory?: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [results, setResults] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [label, setLabel] = useState("");

  const runSearch = async (next?: { searchTerm?: string; searchLocation?: string; searchCategory?: string }) => {
    const term = next?.searchTerm ?? searchTerm;
    const location = next?.searchLocation ?? searchLocation;
    const category = next?.searchCategory ?? searchCategory;
    setLoading(true);
    setPage(1);
    setLabel(term || location || category || "all ads");
    try {
      const { data } = await searchAds({ searchTerm: term, searchLocation: location, searchCategory: category });
      setResults(data?.data || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const term = String(params.searchTerm || "");
    const location = String(params.searchLocation || "");
    const category = String(params.searchCategory || "");
    setSearchTerm(term);
    setSearchLocation(location);
    setSearchCategory(category);
    runSearch({ searchTerm: term, searchLocation: location, searchCategory: category });
  }, [params.searchTerm, params.searchLocation, params.searchCategory]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pageItems = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={loading ? [] : pageItems}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Search result for "{label}"</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
              placeholder="What are you looking for?"
              placeholderTextColor={COLORS.textSecondary}
              value={searchTerm}
              onChangeText={setSearchTerm}
              returnKeyType="search"
              onSubmitEditing={() => runSearch()}
            />
            <View style={styles.filters}>
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
            </View>
            <TouchableOpacity style={styles.button} onPress={() => runSearch()}>
              <Text style={styles.buttonText}>Search Now</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator color={COLORS.primary} style={{ marginTop: 24 }} />}
          </View>
        }
        renderItem={({ item }) => <AdCard ad={item} onPress={() => router.push(`/listing/${item._id}`)} />}
        ListEmptyComponent={!loading ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>There are currently no results for this search</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/post")}>
              <Text style={styles.buttonText}>Post an Ad</Text>
            </TouchableOpacity>
          </View>
        ) : undefined}
        
        ListFooterComponent={!loading && results.length > 0 ? <Pagination page={page} total={totalPages} onChange={setPage} /> : undefined}
      />
    </SafeAreaView>
  );
};

// Styling
const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: SPACING.md, paddingBottom: SPACING.xl },
  title: { fontSize: FONT_SIZES.xl, fontWeight: "700", marginBottom: SPACING.md },
  input: { borderWidth: 1, borderRadius: 10, padding: SPACING.md, fontSize: FONT_SIZES.md, marginBottom: SPACING.sm },
  filters: { gap: SPACING.sm },
  button: { backgroundColor: COLORS.primary, borderRadius: 10, padding: 12, alignItems: "center", marginTop: SPACING.sm, marginBottom: SPACING.md },
  buttonText: { color: "#fff", fontWeight: "700" },
  empty: { alignItems: "center", gap: SPACING.sm, marginTop: 20 },
  emptyTitle: { textAlign: "center", fontSize: FONT_SIZES.md },
});
