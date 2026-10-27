// mobile/app/(auth)/forgot-password.tsx
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { forgotPassword } from "../../api/auth.api";
import { validateEmail } from "../../utils/validators";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from "../../constants/theme";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!validateEmail(email)) return Toast.show({ type: "error", text1: "Enter a valid email" });
    setLoading(true);
    try {
      await forgotPassword(email);
      Toast.show({ type: "success", text1: "Reset link sent!", text2: "Check your inbox." });
      router.back();
    } catch (err: any) {
      Toast.show({ type: "error", text1: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password?</Text>
      <Text style={styles.subtitle}>Enter your email and we'll send a reset link.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor={COLORS.textSecondary}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send Reset Link</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: SPACING.lg, backgroundColor: COLORS.backgroundLight },
  title: { fontSize: FONT_SIZES["2xl"], fontWeight: "700", color: COLORS.textPrimary, marginBottom: SPACING.xs },
  subtitle: { fontSize: FONT_SIZES.md, color: COLORS.textSecondary, marginBottom: SPACING.xl },
  input: { backgroundColor: "#F0F0F5", borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.md, fontSize: FONT_SIZES.md, color: COLORS.textPrimary },
  button: { backgroundColor: COLORS.primary, padding: SPACING.md, borderRadius: BORDER_RADIUS.md, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: FONT_SIZES.md },
});
