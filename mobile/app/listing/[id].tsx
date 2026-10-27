// mobile/app/listing/[id].tsx
import {
  View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,
  ActivityIndicator, Linking,
} from "react-native";
import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";
import useAdStore from "../../store/useAdStore";
import useAuthStore from "../../store/useAuthStore";
import useSettingsStore from "../../store/useSettingsStore";
import { formatPrice } from "../../utils/formatPrice";
import { SPACING, FONT_SIZES, BORDER_RADIUS, COLORS } from "../../constants/theme";

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { selectedAd, isLoading, fetchAd } = useAdStore();
  const { user } = useAuthStore();
  const { displayCurrency, bookmarks, addBookmark, removeBookmark } = useSettingsStore();

  useEffect(() => { if (id) fetchAd(id); }, [id]);

  const isBookmarked = bookmarks.some((b) => b._id === id);

  const toggleBookmark = async () => {
    if (!user) return;
    isBookmarked
      ? await removeBookmark(user._id, id!)
      : await addBookmark(user._id, id!);
  };

  if (isLoading || !selectedAd) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const ad = selectedAd;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        {ad.displayImage ? (
          <Image source={{ uri: ad.displayImage }} style={styles.image} />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: colors.card }]}>
            <Ionicons name="image-outline" size={64} color={COLORS.textSecondary} />
          </View>
        )}

        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={[styles.title, { color: colors.text }]}>{ad.title}</Text>
            <TouchableOpacity onPress={toggleBookmark}>
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={24}
                color={isBookmarked ? COLORS.primary : COLORS.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>{formatPrice(ad.price, displayCurrency)}</Text>

          <View style={styles.tags}>
            {ad.category && <View style={styles.tag}><Text style={styles.tagText}>{ad.category}</Text></View>}
            {ad.condition && <View style={styles.tag}><Text style={styles.tagText}>{ad.condition}</Text></View>}
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
          <Text style={[styles.description, { color: colors.subText }]}>{ad.description || "No description provided."}</Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Location</Text>
          <Text style={[styles.meta, { color: colors.subText }]}>
            <Ionicons name="location-outline" size={14} /> {ad.state}{ad.country ? `, ${ad.country}` : ""}
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Seller</Text>
          <Text style={[styles.meta, { color: colors.subText }]}>{ad.firstName} {ad.lastName}</Text>

          <View style={styles.contactRow}>
            {ad.phoneNumber && (
              <TouchableOpacity
                style={styles.contactBtn}
                onPress={() => Linking.openURL(`tel:${ad.phoneNumber}`)}
              >
                <Ionicons name="call-outline" size={18} color="#fff" />
                <Text style={styles.contactBtnText}>Call</Text>
              </TouchableOpacity>
            )}
            {ad.email && (
              <TouchableOpacity
                style={[styles.contactBtn, { backgroundColor: COLORS.secondary }]}
                onPress={() => Linking.openURL(`mailto:${ad.email}`)}
              >
                <Ionicons name="mail-outline" size={18} color="#fff" />
                <Text style={styles.contactBtnText}>Email</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 280, resizeMode: "cover" },
  imagePlaceholder: { width: "100%", height: 280, alignItems: "center", justifyContent: "center" },
  body: { padding: SPACING.md },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: SPACING.xs },
  title: { flex: 1, fontSize: FONT_SIZES.xl, fontWeight: "700", marginRight: SPACING.sm },
  price: { fontSize: FONT_SIZES["2xl"], fontWeight: "800", color: COLORS.primary, marginBottom: SPACING.sm },
  tags: { flexDirection: "row", gap: SPACING.xs, marginBottom: SPACING.md },
  tag: { backgroundColor: COLORS.primaryLight + "30", paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: BORDER_RADIUS.full },
  tagText: { color: COLORS.primary, fontSize: FONT_SIZES.xs, fontWeight: "600" },
  sectionTitle: { fontSize: FONT_SIZES.md, fontWeight: "700", marginTop: SPACING.md, marginBottom: SPACING.xs },
  description: { fontSize: FONT_SIZES.md, lineHeight: 22 },
  meta: { fontSize: FONT_SIZES.sm },
  contactRow: { flexDirection: "row", gap: SPACING.sm, marginTop: SPACING.lg },
  contactBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: SPACING.xs, backgroundColor: COLORS.primary,
    padding: SPACING.md, borderRadius: BORDER_RADIUS.md,
  },
  contactBtnText: { color: "#fff", fontWeight: "700", fontSize: FONT_SIZES.md },
});
