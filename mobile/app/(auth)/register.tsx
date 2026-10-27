// mobile/app/(auth)/register.tsx
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import useAuthStore from "../../store/useAuthStore";
import { validateEmail, validatePassword, validateRequired } from "../../utils/validators";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from "../../constants/theme";

export default function RegisterScreen() {
  const { register, isLoading } = useAuthStore();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleRegister = async () => {
    if (validateRequired(form.firstName, "First name")) return Toast.show({ type: "error", text1: "First name is required" });
    if (validateRequired(form.lastName, "Last name")) return Toast.show({ type: "error", text1: "Last name is required" });
    if (!validateEmail(form.email)) return Toast.show({ type: "error", text1: "Invalid email address" });
    const pwError = validatePassword(form.password);
    if (pwError) return Toast.show({ type: "error", text1: pwError });

    try {
      await register(form);
      router.replace("/(tabs)");
    } catch (err: any) {
      Toast.show({ type: "error", text1: "Registration failed", text2: err.message });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Join Classifed today</Text>

        {[
          { key: "firstName", placeholder: "First name" },
          { key: "lastName", placeholder: "Last name" },
          { key: "email", placeholder: "Email address", keyboardType: "email-address" as const, autoCapitalize: "none" as const },
          { key: "password", placeholder: "Password", secure: true },
        ].map(({ key, placeholder, keyboardType, autoCapitalize, secure }) => (
          <TextInput
            key={key}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textSecondary}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize ?? "words"}
            secureTextEntry={secure}
            value={(form as any)[key]}
            onChangeText={(v) => set(key, v)}
          />
        ))}

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Account</Text>}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/(auth)/login" style={styles.linkText}>Sign in</Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundLight },
  inner: { flexGrow: 1, justifyContent: "center", padding: SPACING.lg },
  title: { fontSize: FONT_SIZES["3xl"], fontWeight: "700", color: COLORS.textPrimary, marginBottom: SPACING.xs },
  subtitle: { fontSize: FONT_SIZES.md, color: COLORS.textSecondary, marginBottom: SPACING.xl },
  input: {
    backgroundColor: "#F0F0F5",
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  button: { backgroundColor: COLORS.primary, padding: SPACING.md, borderRadius: BORDER_RADIUS.md, alignItems: "center", marginBottom: SPACING.lg },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: FONT_SIZES.md },
  footer: { flexDirection: "row", justifyContent: "center" },
  footerText: { color: COLORS.textSecondary },
  linkText: { color: COLORS.primary, fontWeight: "600" },
});
