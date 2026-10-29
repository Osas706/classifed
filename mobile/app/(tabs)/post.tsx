// mobile/app/(tabs)/post.tsx
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,
  ScrollView, Image, ActivityIndicator, Alert,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { addAd } from "../../api/ads.api";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { CATEGORIES } from "../../constants/categories";
import { SPACING, FONT_SIZES, BORDER_RADIUS, COLORS } from "../../constants/theme";

export default function PostAdScreen() {
  const { isAuthenticated, user } = useAuth();
  const { colors } = useTheme();

  const [form, setForm] = useState({
    title: "", description: "", price: "", category: "Others", condition: "Used", country: "", state: "",
  });
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setField = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  if (!isAuthenticated) {
    return (
      <View style={styles.authWall}>
        <Ionicons name="lock-closed-outline" size={48} color={COLORS.textSecondary} />
        <Text style={styles.authWallText}>Sign in to post an ad</Text>
        <TouchableOpacity style={styles.signInBtn} onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.signInBtnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) return Toast.show({ type: "error", text1: "Title is required" });

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("category", form.category);
    fd.append("condition", form.condition);
    fd.append("country", form.country);
    fd.append("state", form.state);
    fd.append("user", user!._id);
    fd.append("firstName", user!.firstName);
    fd.append("lastName", user!.lastName);
    fd.append("email", user!.email);
    if (image) {
      const filename = image.split("/").pop()!;
      fd.append("adImage", { uri: image, name: filename, type: "image/jpeg" } as any);
    }

    setLoading(true);
    try {
      await addAd(fd);
      Toast.show({ type: "success", text1: "Ad posted!", text2: "Your ad is now live." });
      router.replace("/(tabs)");
    } catch (err: any) {
      Toast.show({ type: "error", text1: "Failed to post ad", text2: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={[styles.title, { color: colors.text }]}>Post an Ad</Text>

        {/* Image Picker */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.pickedImage} />
          ) : (
            <>
              <Ionicons name="camera-outline" size={36} color={COLORS.textSecondary} />
              <Text style={styles.imagePickerText}>Add Photo</Text>
            </>
          )}
        </TouchableOpacity>

        {[
          { key: "title", label: "Title *" },
          { key: "description", label: "Description", multiline: true },
          { key: "price", label: "Price (NGN)", keyboardType: "numeric" as const },
          { key: "country", label: "Country" },
          { key: "state", label: "State / City" },
        ].map(({ key, label, multiline, keyboardType }) => (
          <View key={key} style={styles.field}>
            <Text style={[styles.label, { color: colors.subText }]}>{label}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }, multiline && { height: 100 }]}
              value={(form as any)[key]}
              onChangeText={(v) => setField(key, v)}
              multiline={multiline}
              keyboardType={keyboardType}
              textAlignVertical={multiline ? "top" : "auto"}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Post Ad</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: SPACING.md },
  title: { fontSize: FONT_SIZES["2xl"], fontWeight: "700", marginBottom: SPACING.md },
  imagePicker: {
    height: 160, borderRadius: BORDER_RADIUS.lg,
    backgroundColor: "#F0F0F5", alignItems: "center", justifyContent: "center",
    marginBottom: SPACING.md, overflow: "hidden",
  },
  pickedImage: { width: "100%", height: "100%", resizeMode: "cover" },
  imagePickerText: { color: COLORS.textSecondary, marginTop: SPACING.xs },
  field: { marginBottom: SPACING.md },
  label: { fontSize: FONT_SIZES.sm, fontWeight: "600", marginBottom: 4 },
  input: { borderWidth: 1, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, fontSize: FONT_SIZES.md },
  submitBtn: { backgroundColor: COLORS.primary, padding: SPACING.md, borderRadius: BORDER_RADIUS.md, alignItems: "center", marginTop: SPACING.sm },
  submitBtnText: { color: "#fff", fontWeight: "700", fontSize: FONT_SIZES.md },
  authWall: { flex: 1, alignItems: "center", justifyContent: "center", gap: SPACING.md },
  authWallText: { fontSize: FONT_SIZES.lg, color: COLORS.textSecondary },
  signInBtn: { backgroundColor: COLORS.primary, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.xl, borderRadius: BORDER_RADIUS.md },
  signInBtnText: { color: "#fff", fontWeight: "700" },
});
