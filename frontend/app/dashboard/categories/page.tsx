import type { Metadata } from "next";
import CategoriesClient from "./CategoriesClient";

export const metadata: Metadata = {
  title: "Categories",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <CategoriesClient />;
}
