import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://247market.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "247Market — Nigeria's Marketplace, Open Around the Clock",
    template: "%s | 247Market",
  },
  description:
    "Buy, sell and discover cars, phones, apartments, jobs and more on 247Market — Nigeria's marketplace open around the clock. Post an ad in minutes or browse thousands of listings near you.",
  icons: { icon: "/icon.svg" },
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
    <html lang="en">
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
