import type { Metadata } from "next";
import BookmarkClient from "./BookmarkClient";

export const metadata: Metadata = {
  title: "Your Bookmarks",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BookmarkClient />;
}
