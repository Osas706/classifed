import { Ionicons } from "@expo/vector-icons";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

export const AD_CATEGORIES: { key: string; label: string; icon: IoniconsName }[] = [
  { key: "cars", label: "Cars", icon: "car-outline" },
  { key: "electronics", label: "Electronics", icon: "tv-outline" },
  { key: "mobiles", label: "Mobiles", icon: "phone-portrait-outline" },
  { key: "furnitures", label: "Furnitures", icon: "bed-outline" },
  { key: "fashion", label: "Fashion", icon: "shirt-outline" },
  { key: "jobs", label: "Jobs", icon: "briefcase-outline" },
  { key: "apartment", label: "Apartment", icon: "home-outline" },
  { key: "animals", label: "Animals", icon: "paw-outline" },
  { key: "computer", label: "Computer", icon: "laptop-outline" },
  { key: "services", label: "Services", icon: "construct-outline" },
  { key: "personals", label: "Personals", icon: "heart-outline" },
];

export const CONDITIONS = ["Old", "Fairly Used", "Slightly New", "Brand New"];

export const SEARCH_LOCATIONS = [
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "edo", label: "Edo" },
  { value: "warri", label: "Warri" },
  { value: "ogun", label: "Ogun" },
];

export const CATEGORIES = ["all", ...AD_CATEGORIES.map((c) => c.key)];
