// mobile/app/(auth)/reset-password.tsx
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import Toast from "react-native-toast-message";
import { resetPassword } from "../../api/auth.api";
import { validatePassword } from "../../utils/validators";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from "../../constants/theme";

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    const err = validatePassword(password);
    if (err) return Toast.show({ type: "error", text1: err });
    if (!token) return Toast.show({ type: "error", text1: "Invalid reset link" });

    setLoading(true);
    try {
      await resetPassword(token, password);
      Toast.show({ type: "success", text1: "Password reset!", text2: "You can now sign in." });
      router.replace("/(auth)/login");
    } catch (err: any) {
      Toast.show({ type: "error", text1: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.subtitle}>Enter your new password below.</Text>
      <TextInput
        style={styles.input}
        placeholder="New password"
        placeholderTextColor={COLORS.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Reset Password</Text>}
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
