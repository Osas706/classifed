import type { Metadata } from "next";
import Home from "./Home";

export const metadata: Metadata = {
  title: "247Market — Nigeria's Marketplace, Open Around the Clock",
  description:
    "Buy, sell and discover cars, phones, apartments, jobs and more on 247Market — Nigeria's marketplace open around the clock. Post an ad in minutes or browse thousands of listings near you.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "247Market",
  url: "https://247market.vercel.app",
  logo: "https://247market.vercel.app/icon.svg",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "247Market",
  url: "https://247market.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://247market.vercel.app/app/search?searchTerm={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <Home />
    </>
  );
}
