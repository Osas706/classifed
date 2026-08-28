import type { Metadata } from "next";
import Script from "next/script";
import { Sora, Outfit } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const SITE_URL = "https://247market.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "247Market — Nigeria's Marketplace, Open Around the Clock",
    template: "%s | 247Market",
  },
  description:
    "Buy, sell and discover cars, phones, apartments, jobs and more on 247Market — Nigeria's marketplace open around the clock. Post an ad in minutes or browse thousands of listings near you.",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "247Market",
    title: "247Market — Nigeria's Marketplace, Open Around the Clock",
    description:
      "Buy, sell and discover cars, phones, apartments, jobs and more on 247Market — Nigeria's marketplace open around the clock.",
    url: SITE_URL,
    images: [`${SITE_URL}/og-image.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "247Market — Nigeria's Marketplace, Open Around the Clock",
    description:
      "Buy, sell and discover cars, phones, apartments, jobs and more on 247Market — Nigeria's marketplace open around the clock.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${outfit.variable}`}>
      <head>
        <meta name="theme-color" content="#0d2140" />
      </head>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try { if (localStorage.getItem('theme') === 'dark') { document.documentElement.classList.add('dark'); } } catch (e) {}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
