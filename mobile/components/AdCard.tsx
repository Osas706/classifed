import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { Ad } from "../types/ad.types";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import useSettingsStore from "../store/useSettingsStore";
import { formatPrice } from "../utils/formatPrice";
import { SPACING, FONT_SIZES, COLORS } from "../constants/theme";

interface Props {
  ad: Ad;
  onPress: () => void;
  showRemove?: boolean;
}

export default function AdCard({ ad, onPress, showRemove }: Props) {
  const { colors, isDark } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { displayCurrency, bookmarks, addBookmark, removeBookmark } = useSettingsStore();
  const saved = bookmarks.some((item) => item._id === ad._id);

  const toggleSave = async () => {
    if (!isAuthenticated || !user) {
      Toast.show({ type: "info", text1: "Sign in to save an ad" });
      router.push("/(auth)/login");
      return;
    }
    try {
      if (saved) await removeBookmark(user._id, ad);
      else await addBookmark(user._id, ad);
    } catch (err: any) {
      Toast.show({ type: "error", text1: "Could not update saved ads", text2: err.message });
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View>
        {ad.adImage?.startsWith("http") ? (
          <Image source={{ uri: ad.adImage }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholder, { backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f5f5f5" }]}>
            <Ionicons name="image-outline" size={32} color={COLORS.textSecondary} />
          </View>
        )}

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: isDark ? "rgba(7,19,40,0.9)" : "rgba(255,255,255,0.92)" }]} onPress={toggleSave}>
          <Ionicons name={saved ? "bookmark" : "bookmark-outline"} size={18} color={saved ? COLORS.accent : colors.text} />
        </TouchableOpacity>

        {!!ad.terms && (
          <View style={styles.terms}>
            <Text style={styles.termsText}>{ad.terms}</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{ad.title}</Text>
        <Text style={[styles.desc, { color: isDark ? "rgba(255,255,255,0.6)" : "rgba(10,17,40,0.7)" }]} numberOfLines={2}>
          {ad.description || " "}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.meta}>
            <Ionicons name="location-outline" size={13} color={COLORS.accent} />
            <Text style={[styles.metaText, { color: colors.subText }]} numberOfLines={1}>{ad.state || "—"}</Text>
          </View>
          <View style={styles.meta}>
            <Ionicons name="pricetag-outline" size={13} color={COLORS.accent} />
            <Text style={[styles.metaText, { color: colors.subText }]} numberOfLines={1}>{ad.condition || "—"}</Text>
          </View>
        </View>

        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <Text style={[styles.price, { color: colors.text }]}>{formatPrice(ad.price, displayCurrency)}</Text>
          <View style={styles.actions}>
            {showRemove && (
              <TouchableOpacity style={styles.removeBtn} onPress={toggleSave}>
                <Ionicons name="trash-outline" size={16} color={COLORS.error} />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.viewBtn} onPress={onPress}>
              <Text style={styles.viewText}>View</Text>
              <Ionicons name="arrow-forward" size={12} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: SPACING.md,
  },
  image: { width: "100%", height: 200 },
  placeholder: { alignItems: "center", justifyContent: "center" },
  saveBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  terms: {
    position: "absolute",
    left: 12,
    bottom: 12,
    backgroundColor: "rgba(13,33,64,0.85)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  termsText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  body: { padding: SPACING.md },
  title: { fontSize: FONT_SIZES.md, fontWeight: "600" },
  desc: { fontSize: FONT_SIZES.xs, marginTop: 6, minHeight: 32, lineHeight: 16 },
  metaRow: { flexDirection: "row", gap: SPACING.md, marginTop: SPACING.sm },
  meta: { flexDirection: "row", alignItems: "center", gap: 4, flexShrink: 1 },
  metaText: { fontSize: 11 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
  },
  price: { fontSize: FONT_SIZES.lg, fontWeight: "800", flex: 1 },
  actions: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  removeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.error,
    alignItems: "center",
    justifyContent: "center",
  },
  viewBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  viewText: { color: "#fff", fontSize: FONT_SIZES.sm, fontWeight: "600" },
});
