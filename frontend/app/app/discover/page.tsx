import type { Metadata } from "next";
import { Suspense } from "react";
import DiscoverClient from "./DiscoverClient";

export const metadata: Metadata = {
  title: "Discover",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DiscoverClient />
    </Suspense>
  );
}
