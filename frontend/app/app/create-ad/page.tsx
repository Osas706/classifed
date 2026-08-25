import type { Metadata } from "next";
import CreateAdClient from "./CreateAdClient";

export const metadata: Metadata = {
  title: "Post an Ad",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CreateAdClient />;
}
