import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,
  ScrollView, Image, ActivityIndicator, Platform,
} from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { addAd } from "../../api/ads.api";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { AD_CATEGORIES, CONDITIONS } from "../../constants/categories";
import { SPACING, FONT_SIZES, BORDER_RADIUS, COLORS } from "../../constants/theme";
import OptionPicker from "../../components/OptionPicker";

const STEPS = ["Ad Details", "Location", "Your Details", "Review"];

type LocalImage = { uri: string; name: string; type: string };

const imagePart = (image: LocalImage) => ({
  uri: image.uri,
  name: image.name,
  type: image.type,
} as any);

async function appendImage(fd: FormData, field: string, image: LocalImage) {
  if (Platform.OS === "web") {
    const response = await fetch(image.uri);
    const blob = await response.blob();
    fd.append(field, blob, image.name);
    return;
  }
  fd.append(field, imagePart(image));
}

export default function PostAdScreen() {
  const { isAuthenticated, user } = useAuth();
  const { colors } = useTheme();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [adImage, setAdImage] = useState<LocalImage | null>(null);
  const [displayImage, setDisplayImage] = useState<LocalImage | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    terms: "Negotiable",
    lat: "",
    long: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
  });

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      firstName: prev.firstName || user.firstName || "",
      lastName: prev.lastName || user.lastName || "",
      email: prev.email || user.email || "",
      phoneNumber: prev.phoneNumber || user.phoneNumber || "",
      country: prev.country || user.country || "",
      state: prev.state || user.state || "",
    }));
  }, [user]);

  const setField = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

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

  const pickImage = async (target: "ad" | "profile") => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Toast.show({ type: "error", text1: "Allow photo access to upload an image" });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });
    if (result.canceled) return;
    const asset = result.assets[0];
    const type = asset.mimeType || "image/jpeg";
    const ext = type.includes("png") ? "png" : type.includes("webp") ? "webp" : "jpg";
    const file: LocalImage = {
      uri: asset.uri,
      name: asset.fileName || `${target}-${Date.now()}.${ext}`,
      type,
    };
    if (target === "ad") setAdImage(file);
    else setDisplayImage(file);
  };

  const goNext = () => {
    if (step === 0 && (!form.title.trim() || !form.category || !form.condition)) {
      Toast.show({ type: "error", text1: "Please fill in title, category and condition" });
      return;
    }
    if (step === 2 && (!form.firstName || !form.lastName || !form.email || !form.phoneNumber)) {
      Toast.show({ type: "error", text1: "Please fill in your name, email and phone number" });
      return;
    }
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const handleSubmit = async () => {
    if (!agreed) {
      Toast.show({ type: "error", text1: "Please agree to the terms to continue" });
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("category", form.category);
    fd.append("condition", form.condition);
    fd.append("price", form.price || "0");
    fd.append("terms", form.terms);
    fd.append("firstName", form.firstName);
    fd.append("lastName", form.lastName);
    fd.append("email", form.email);
    fd.append("phoneNumber", form.phoneNumber);
    fd.append("state", form.state);
    fd.append("country", form.country);
    fd.append("lat", form.lat);
    fd.append("long", form.long);
    fd.append("user", user!._id);
    if (adImage) await appendImage(fd, "adImage", adImage);
    if (displayImage) await appendImage(fd, "displayImage", displayImage);

    setLoading(true);
    try {
      const data = await addAd(fd);
      Toast.show({ type: "success", text1: "Ad posted!", text2: "Your ad is now live." });
      if (data?.ad?._id) router.replace(`/listing/${data.ad._id}`);
      else router.replace("/(tabs)");
    } catch (err: any) {
      Toast.show({ type: "error", text1: "Failed to post ad", text2: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={[styles.title, { color: colors.text }]}>Create Your Ad</Text>
        <Text style={[styles.subtitle, { color: colors.subText }]}>What can we advertise for you today?</Text>

        <View style={styles.steps}>
          {STEPS.map((label, index) => (
            <View key={label} style={styles.stepItem}>
              <View style={[styles.stepDot, index <= step && styles.stepDotActive, index < step && styles.stepDotDone]}>
                <Text style={[styles.stepNum, index <= step && { color: "#fff" }]}>{index < step ? "✓" : index + 1}</Text>
              </View>
              <Text style={[styles.stepLabel, { color: index === step ? colors.text : colors.subText }]} numberOfLines={1}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {step === 0 && (
            <>
              <Field label="Title" value={form.title} onChangeText={(v) => setField("title", v)} placeholder="Enter your ad title..." colors={colors} />
              <Field label="Ad Description" value={form.description} onChangeText={(v) => setField("description", v)} placeholder="Describe your ad..." colors={colors} multiline />
              <OptionPicker label="Select Category" value={form.category} placeholder="Select category for your ad" options={AD_CATEGORIES.map((item) => ({ label: item.label, value: item.key }))} onChange={(v) => setField("category", v)} />
              <View style={{ height: SPACING.md }} />
              <OptionPicker label="Select Condition" value={form.condition} placeholder="Select Condition" options={CONDITIONS.map((item) => ({ label: item, value: item }))} onChange={(v) => setField("condition", v)} />
              <View style={{ height: SPACING.md }} />
              <Field label="Price (₦)" value={form.price} onChangeText={(v) => setField("price", v)} placeholder="0" colors={colors} keyboardType="numeric" />
              <Text style={[styles.label, { color: colors.text }]}>Your Terms</Text>
              <View style={styles.termsRow}>
                {["Fixed Price", "Negotiable"].map((term) => (
                  <TouchableOpacity key={term} style={styles.term} onPress={() => setField("terms", term)}>
                    <Ionicons name={form.terms === term ? "checkbox" : "square-outline"} size={20} color={COLORS.primary} />
                    <Text style={{ color: colors.text }}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={[styles.label, { color: colors.text }]}>Upload Ad Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage("ad")}>
                {adImage ? <Image source={{ uri: adImage.uri }} style={styles.pickedImage} /> : (
                  <>
                    <Ionicons name="cloud-upload-outline" size={32} color={COLORS.textSecondary} />
                    <Text style={styles.imagePickerText}>Tap to choose a photo</Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          )}

          {step === 1 && (
            <>
              <Text style={[styles.hint, { color: colors.subText }]}>
                Add latitude and longitude for the exact location of your ad.
              </Text>
              <Field label="Latitude" value={form.lat} onChangeText={(v) => setField("lat", v)} placeholder="e.g. 6.5244" colors={colors} keyboardType="numeric" />
              <Field label="Longitude" value={form.long} onChangeText={(v) => setField("long", v)} placeholder="e.g. 3.3792" colors={colors} keyboardType="numeric" />
            </>
          )}

          {step === 2 && (
            <>
              <Text style={[styles.label, { color: colors.text }]}>Your Photo</Text>
              <TouchableOpacity style={styles.avatarPicker} onPress={() => pickImage("profile")}>
                {displayImage ? <Image source={{ uri: displayImage.uri }} style={styles.avatar} /> : (
                  <Ionicons name="person-outline" size={32} color={COLORS.textSecondary} />
                )}
              </TouchableOpacity>
              <Field label="First Name" value={form.firstName} onChangeText={(v) => setField("firstName", v)} placeholder="Your first name" colors={colors} />
              <Field label="Last Name" value={form.lastName} onChangeText={(v) => setField("lastName", v)} placeholder="Your last name" colors={colors} />
              <Field label="Email" value={form.email} onChangeText={(v) => setField("email", v)} placeholder="Enter a valid email" colors={colors} keyboardType="email-address" />
              <Field label="Phone Number" value={form.phoneNumber} onChangeText={(v) => setField("phoneNumber", v)} placeholder="xxx-xxx-xxx-xxxx" colors={colors} keyboardType="phone-pad" />
              <Field label="Country" value={form.country} onChangeText={(v) => setField("country", v)} placeholder="Nigeria" colors={colors} />
              <Field label="State" value={form.state} onChangeText={(v) => setField("state", v)} placeholder="Lagos" colors={colors} />
            </>
          )}

          {step === 3 && (
            <>
              <View style={[styles.review, { backgroundColor: colors.background }]}>
                {adImage ? <Image source={{ uri: adImage.uri }} style={styles.reviewImage} /> : null}
                <View style={{ flex: 1 }}>
                  <Text style={[styles.reviewTitle, { color: colors.text }]}>{form.title || "Untitled ad"}</Text>
                  <Text style={{ color: colors.subText }}>{form.description || "No description provided"}</Text>
                  <Text style={[styles.reviewLine, { color: colors.text }]}>Category: {form.category || "—"}</Text>
                  <Text style={[styles.reviewLine, { color: colors.text }]}>Condition: {form.condition || "—"}</Text>
                  <Text style={[styles.reviewLine, { color: colors.text }]}>Price: ₦{Number(form.price || 0).toLocaleString()}</Text>
                  <Text style={[styles.reviewLine, { color: colors.text }]}>Terms: {form.terms}</Text>
                  <Text style={[styles.reviewLine, { color: colors.text }]}>Location: {form.state || "—"}, {form.country || "—"}</Text>
                </View>
              </View>
              <View style={[styles.review, { backgroundColor: colors.background }]}>
                <Text style={[styles.reviewTitle, { color: colors.text }]}>{form.firstName} {form.lastName}</Text>
                <Text style={[styles.reviewLine, { color: colors.text }]}>Email: {form.email || "—"}</Text>
                <Text style={[styles.reviewLine, { color: colors.text }]}>Phone: {form.phoneNumber || "—"}</Text>
              </View>
              <TouchableOpacity style={styles.term} onPress={() => setAgreed((value) => !value)}>
                <Ionicons name={agreed ? "checkbox" : "square-outline"} size={20} color={COLORS.primary} />
                <Text style={{ color: colors.text, flex: 1 }}>By continuing, I agree to the terms of use & privacy policy.</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.nav}>
          {step > 0 && (
            <TouchableOpacity style={[styles.backBtn, { borderColor: colors.border }]} onPress={() => setStep((current) => current - 1)}>
              <Text style={{ color: colors.text, fontWeight: "700" }}>Back</Text>
            </TouchableOpacity>
          )}
          {step < STEPS.length - 1 ? (
            <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.nextBtn} onPress={handleSubmit} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.nextText}>Post Ad</Text>}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({ label, colors, multiline, ...props }: any) {
  return (
    <View style={{ marginBottom: SPACING.md }}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }, multiline && { height: 110, textAlignVertical: "top" }]}
        placeholderTextColor={COLORS.textSecondary}
        multiline={multiline}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: SPACING.md, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: "800", textAlign: "center" },
  subtitle: { textAlign: "center", marginTop: 4, marginBottom: SPACING.md },
  steps: { flexDirection: "row", justifyContent: "space-between", marginBottom: SPACING.md },
  stepItem: { alignItems: "center", flex: 1 },
  stepDot: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: "#c9c9c9", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  stepDotActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  stepDotDone: { borderColor: COLORS.accent, backgroundColor: COLORS.accent },
  stepNum: { fontWeight: "700", color: "#808080", fontSize: 12 },
  stepLabel: { fontSize: 10, marginTop: 4, fontWeight: "600" },
  card: { borderWidth: 1, borderRadius: 18, padding: SPACING.md },
  label: { fontSize: FONT_SIZES.sm, fontWeight: "700", marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: BORDER_RADIUS.md, padding: 12, fontSize: FONT_SIZES.md },
  termsRow: { flexDirection: "row", gap: SPACING.lg, marginBottom: SPACING.md },
  term: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: SPACING.sm },
  imagePicker: { height: 180, borderRadius: 12, borderWidth: 1, borderStyle: "dashed", borderColor: "#b6b6b6", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: "#f7faf9" },
  pickedImage: { width: "100%", height: "100%" },
  imagePickerText: { color: COLORS.textSecondary, marginTop: 6 },
  hint: { marginBottom: SPACING.md, lineHeight: 20 },
  avatarPicker: { width: 96, height: 96, borderRadius: 48, borderWidth: 1, borderColor: COLORS.primary, alignSelf: "center", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: SPACING.md },
  avatar: { width: "100%", height: "100%" },
  review: { borderRadius: 16, padding: SPACING.md, marginBottom: SPACING.md, gap: 4 },
  reviewImage: { width: 100, height: 100, borderRadius: 10, marginBottom: SPACING.sm },
  reviewTitle: { fontSize: FONT_SIZES.lg, fontWeight: "700", marginBottom: 4 },
  reviewLine: { fontSize: FONT_SIZES.sm, marginTop: 2 },
  nav: { flexDirection: "row", gap: SPACING.sm, marginTop: SPACING.md },
  backBtn: { flex: 1, borderWidth: 2, borderRadius: 999, alignItems: "center", padding: 14 },
  nextBtn: { flex: 1, backgroundColor: COLORS.primary, borderRadius: 999, alignItems: "center", padding: 14 },
  nextText: { color: "#fff", fontWeight: "700" },
  authWall: { flex: 1, alignItems: "center", justifyContent: "center", gap: SPACING.md },
  authWallText: { fontSize: FONT_SIZES.lg, color: COLORS.textSecondary },
  signInBtn: { backgroundColor: COLORS.primary, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.xl, borderRadius: BORDER_RADIUS.md },
  signInBtnText: { color: "#fff", fontWeight: "700" },
});
