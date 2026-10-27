// mobile/app/(tabs)/search.tsx
import {
  View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, TextInput,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { searchAds } from "../../api/ads.api";
import { Ad } from "../../types/ad.types";
import { useTheme } from "../../hooks/useTheme";
import { SPACING, FONT_SIZES, BORDER_RADIUS, COLORS } from "../../constants/theme";
import AdCard from "../../components/AdCard";

export default function SearchScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const { data } = await searchAds(query.trim());
      setResults(data.ads);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Search Ads</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
          placeholder="Search for anything..."
          placeholderTextColor={COLORS.textSecondary}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>

      {loading && <ActivityIndicator color={COLORS.primary} style={{ marginTop: 40 }} />}
      {!loading && searched && (
        <FlatList
          data={results}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={{ gap: SPACING.sm }}
          ItemSeparatorComponent={() => <View style={{ height: SPACING.sm }} />}
          renderItem={({ item }) => <AdCard ad={item} onPress={() => router.push(`/listing/${item._id}`)} />}
          ListEmptyComponent={<Text style={[styles.empty, { color: colors.subText }]}>No results for "{query}"</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: FONT_SIZES["2xl"], fontWeight: "700", margin: SPACING.md },
  searchRow: { paddingHorizontal: SPACING.md, marginBottom: SPACING.md },
  input: {
    borderWidth: 1, borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md, fontSize: FONT_SIZES.md,
  },
  grid: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
  empty: { textAlign: "center", marginTop: 60, fontSize: FONT_SIZES.md },
});
