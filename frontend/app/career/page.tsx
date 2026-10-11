import type { Metadata } from "next";
import Link from "next/link";
import { FaStore } from "react-icons/fa6";
import { HiOutlineArrowRight } from "react-icons/hi2";
import Footer from "../../src/components/footer/Footer";
import CareerClient from "./CareerClient";

const SITE_URL = "https://247market.org";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at 247Market. Join our team across social media management, performance marketing, distribution, and engineering.",
  alternates: { canonical: "/career" },
  openGraph: {
    title: "Careers at 247Market — Build the Future of African Commerce",
    description:
      "Join our mission to empower millions of buyers and entrepreneurs across Africa. Open roles in marketing, distribution, and tech.",
    url: `${SITE_URL}/career`,
    type: "website",
  },
};

export default function CareerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Careers at 247Market",
    url: `${SITE_URL}/career`,
    description: metadata.description,
  };

  return (
    <div className="w-full min-h-screen bg-sand text-navy-ink font-outfit">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation Header */}
      <header className="w-[90%] max-w-[1100px] mx-auto px-5 py-4 sm:py-6 flex flex-wrap sm:flex-nowrap justify-between items-center gap-3">
        <Link
          href="/"
          className="font-sora text-lg sm:text-[22px] font-extrabold text-navy flex items-center shrink-0"
        >
          247
          <span className="text-navy-ink ml-px flex items-center gap-1">
            Market <FaStore />
          </span>
        </Link>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Link
            href="/about"
            className="hidden sm:inline-block text-navy/70 hover:text-navy font-semibold text-sm px-3 py-2 transition-[0.2s]"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="hidden sm:inline-block text-navy/70 hover:text-navy font-semibold text-sm px-3 py-2 transition-[0.2s]"
          >
            Contact
          </Link>
          <Link
            href="/app"
            className="w-full sm:w-auto justify-center bg-navy text-white px-4 sm:px-[22px] py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-[15px] flex items-center gap-2 transition-[0.25s] hover:bg-navy-deep"
          >
            Go to Marketplace <HiOutlineArrowRight />
          </Link>
        </div>
      </header>

      {/* Interactive Career Client Content */}
      <CareerClient />

      {/* Footer */}
      <Footer />
    </div>
  );
}
