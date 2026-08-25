import type { Metadata } from "next";
import { Suspense } from "react";
import DashboardHomeClient from "./DashboardHomeClient";

export const metadata: Metadata = {
  title: "Marketplace",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DashboardHomeClient />
    </Suspense>
  );
}
