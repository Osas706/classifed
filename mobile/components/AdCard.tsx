// mobile/components/AdCard.tsx
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Ad } from "../types/ad.types";
import { useTheme } from "../hooks/useTheme";
import useSettingsStore from "../store/useSettingsStore";
import { formatPrice } from "../utils/formatPrice";
import { SPACING, FONT_SIZES, BORDER_RADIUS, COLORS } from "../constants/theme";

const CARD_WIDTH = (Dimensions.get("window").width - SPACING.md * 2 - SPACING.sm) / 2;

interface Props {
  ad: Ad;
  onPress: () => void;
}

export default function AdCard({ ad, onPress }: Props) {
  const { colors } = useTheme();
  const { displayCurrency } = useSettingsStore();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {ad.adImage ? (
        <Image source={{ uri: ad.adImage }} style={styles.image} />
      ) : (
        <View style={[styles.imagePlaceholder, { backgroundColor: colors.background }]}>
          <Ionicons name="image-outline" size={32} color={COLORS.textSecondary}  />
        </View>
      )}

      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{ad.title}</Text>
        <Text style={[styles.desc, { color: colors.text }]} numberOfLines={4}>{ad.description}</Text>
        <Text style={styles.price}>{formatPrice(ad.price, displayCurrency)}</Text>
        
        {(ad.state || ad.country) && (
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={11} color={COLORS.textSecondary} />
            <Text style={[styles.location, { color: colors.subText }]} numberOfLines={1}>
              {ad.state}{ad.country ? `, ${ad.country}` : ""}
            </Text>
          </View>
        )}

        {(ad.condition) && (
          <View style={styles.locationRow}>
            <Ionicons name="information-circle" size={11} color={COLORS.textSecondary} />
            <Text style={[styles.location, { color: colors.subText }]} numberOfLines={1}>
              {ad.condition}
            </Text>
          </View>
        )}

     
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    overflow: "hidden",
    flex: 1,
  },
  image: { width: "100%", height: 130, resizeMode: "cover" },
  imagePlaceholder: { width: "100%", height: 130, alignItems: "center", justifyContent: "center" },
  info: { padding: SPACING.sm },
  title: { fontSize: FONT_SIZES.sm, fontWeight: "600", marginBottom: 3 },
  desc: { fontSize: FONT_SIZES.xs, fontWeight: "400", marginBottom: 4, maxHeight: 70 },
  price: { fontSize: FONT_SIZES.md, fontWeight: "800", color: COLORS.primary, marginBottom: 4},
  locationRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  location: { fontSize: FONT_SIZES.xs },
});
