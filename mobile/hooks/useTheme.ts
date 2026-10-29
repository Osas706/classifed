// mobile/hooks/useTheme.ts
import useSettingsStore from "../store/useSettingsStore";
import { COLORS } from "../constants/theme";

export function useTheme() {
  const { theme, toggleTheme } = useSettingsStore();
  const isDark = theme === "dark";

  return {
    theme,
    isDark,
    toggleTheme,
    colors: {
      background: isDark ? COLORS.backgroundDark : COLORS.backgroundLight,
      card: isDark ? COLORS.cardDark : COLORS.cardLight,
      text: isDark ? COLORS.textInverse : COLORS.textPrimary,
      subText: COLORS.textSecondary,
      border: isDark ? COLORS.borderDark : COLORS.borderLight,
      tabBar: isDark ? COLORS.tabBarDark : COLORS.tabBarLight,
      primary: COLORS.primary,
      primaryLight: COLORS.primaryLight,
      accent: COLORS.accent,
      error: COLORS.error,
      success: COLORS.success,
    },
  };
}
