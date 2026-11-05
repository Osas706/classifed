import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from "../constants/theme";

interface Props {
  page: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, total, onChange }: Props) {
  if (total <= 1) return null;

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.btn, page === 1 && styles.disabled]}
        disabled={page === 1}
        onPress={() => onChange(page - 1)}
      >
        <Ionicons name="arrow-back" size={14} color={COLORS.primary} />
        <Text style={styles.btnText}>Prev</Text>
      </TouchableOpacity>

      <View style={styles.page}>
        <Text style={styles.pageText}>Page {page} of {total}</Text>
      </View>

      <TouchableOpacity
        style={[styles.btn, page === total && styles.disabled]}
        disabled={page === total}
        onPress={() => onChange(page + 1)}
      >
        <Text style={styles.btnText}>Next</Text>
        <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  disabled: { opacity: 0.4 },
  btnText: { color: COLORS.primary, fontSize: FONT_SIZES.sm, fontWeight: "600" },
  page: {
    borderWidth: 1,
    borderColor: "rgba(13,33,64,0.3)",
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  pageText: { color: COLORS.primary, fontSize: FONT_SIZES.sm, fontWeight: "600" },
});
