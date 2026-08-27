import type { Metadata } from "next";
import Home, { type MarketplaceStats } from "./Home";

const API_URL = "https://classifed-247market.onrender.com";

async function getMarketplaceStats(): Promise<MarketplaceStats | null> {
  try {
    const res = await fetch(`${API_URL}/api/ads/stats`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    console.log("Failed to fetch marketplace stats", error);
    return null;
  }
}

export const metadata: Metadata = {
  title: { absolute: "247Market — Nigeria's Marketplace, Open Around the Clock" },
  description:
    "247Market is where you buy and sell in Nigeria — cars, phones, apartments, jobs and more, open around the clock. Post an ad in minutes or browse thousands of listings near you.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "247Market",
  url: "https://247market.org",
  logo: "https://247market.org/icon.svg",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "247Market",
  url: "https://247market.org",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://247market.org/app/search?searchTerm={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default async function Page() {
  const stats = await getMarketplaceStats();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <Home stats={stats} />
    </>
  );
}
