import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from "../constants/theme";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  value: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function OptionPicker({ label, value, placeholder, options, onChange }: Props) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <View style={styles.wrap}>
      {label ? <Text style={[styles.label, { color: colors.text }]}>{label}</Text> : null}
      <TouchableOpacity
        style={[styles.field, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => setOpen(true)}
      >
        <Text style={{ color: selected ? colors.text : COLORS.textSecondary, flex: 1 }} numberOfLines={1}>
          {selected?.label || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color={COLORS.textSecondary} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={[styles.sheet, { backgroundColor: colors.card }]} onPress={() => {}}>
            <Text style={[styles.sheetTitle, { color: colors.text }]}>{placeholder}</Text>
            <FlatList
              data={[{ label: placeholder, value: "" }, ...options]}
              keyExtractor={(item) => item.value || "empty"}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Text style={{ color: item.value === value ? COLORS.accent : colors.text, fontWeight: item.value === value ? "700" : "500" }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  label: { fontSize: FONT_SIZES.sm, fontWeight: "600", marginBottom: 6 },
  field: {
    minHeight: 46,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  backdrop: { flex: 1, backgroundColor: "rgba(7,19,40,0.45)", justifyContent: "flex-end" },
  sheet: { maxHeight: "70%", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: SPACING.md },
  sheetTitle: { fontSize: FONT_SIZES.lg, fontWeight: "700", marginBottom: SPACING.sm },
  option: { paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "rgba(13,33,64,0.12)" },
});
