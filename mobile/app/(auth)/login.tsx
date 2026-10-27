// mobile/app/(auth)/login.tsx
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import Toast from "react-native-toast-message";
import useAuthStore from "../../store/useAuthStore";
import { validateEmail, validateRequired } from "../../utils/validators";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from "../../constants/theme";

export default function LoginScreen() {
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!validateEmail(email)) return Toast.show({ type: "error", text1: "Invalid email address" });
    if (validateRequired(password, "Password")) return Toast.show({ type: "error", text1: "Password is required" });

    try {
      await login({ email, password });
      router.replace("/(tabs)");
    } catch (err: any) {
      Toast.show({ type: "error", text1: "Login failed", text2: err.message });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to your Classifed account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor={COLORS.textSecondary}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={COLORS.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Link href="/(auth)/forgot-password" style={styles.forgotLink}>
          Forgot password?
        </Link>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/(auth)/register" style={styles.linkText}>Sign up</Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundLight },
  inner: { flex: 1, justifyContent: "center", padding: SPACING.lg },
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
  forgotLink: { alignSelf: "flex-end", color: COLORS.primary, marginBottom: SPACING.lg, fontSize: FONT_SIZES.sm },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: FONT_SIZES.md },
  footer: { flexDirection: "row", justifyContent: "center" },
  footerText: { color: COLORS.textSecondary },
  linkText: { color: COLORS.primary, fontWeight: "600" },
});
