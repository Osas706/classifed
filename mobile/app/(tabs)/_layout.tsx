// mobile/app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";
import { COLORS } from "../../constants/theme";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

function TabIcon({ name, focused }: { name: IoniconsName; focused: boolean }) {
  return <Ionicons name={name} size={24} color={focused ? COLORS.primary : COLORS.textSecondary} />;
}

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.tabBar, borderTopColor: colors.border },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: ({ focused }) => <TabIcon name={focused ? "home" : "home-outline"} focused={focused} /> }}
      />
      <Tabs.Screen
        name="search"
        options={{ title: "Search", tabBarIcon: ({ focused }) => <TabIcon name={focused ? "search" : "search-outline"} focused={focused} /> }}
      />
      <Tabs.Screen
        name="post"
        options={{ title: "Post Ad", tabBarIcon: ({ focused }) => <TabIcon name={focused ? "add-circle" : "add-circle-outline"} focused={focused} /> }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{ title: "Saved", tabBarIcon: ({ focused }) => <TabIcon name={focused ? "bookmark" : "bookmark-outline"} focused={focused} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: ({ focused }) => <TabIcon name={focused ? "person" : "person-outline"} focused={focused} /> }}
      />
    </Tabs>
  );
}
