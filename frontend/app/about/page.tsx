import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FaStore } from "react-icons/fa6";
import { HiOutlineArrowRight } from "react-icons/hi2";
import {
  RiShieldCheckLine,
  RiWallet3Line,
  RiGlobalLine,
  RiHandCoinLine,
} from "react-icons/ri";
import Footer from "../../src/components/footer/Footer";

const SITE_URL = "https://247market.org";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "247Market is Nigeria's marketplace, open around the clock — helping buyers and sellers across Africa trade directly, with verified sellers and no middlemen.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About 247Market",
    description:
      "Nigeria's marketplace, open around the clock — buy, sell and discover across Africa with verified sellers and no middlemen.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

const VALUES = [
  {
    icon: RiGlobalLine,
    title: "Always open",
    text: "Great deals don't keep office hours. 247Market runs around the clock, for every city we serve.",
  },
  {
    icon: RiShieldCheckLine,
    title: "Trust by design",
    text: "Verified seller accounts and transparent listings, so you know who you're dealing with before you commit.",
  },
  {
    icon: RiHandCoinLine,
    title: "No middlemen",
    text: "Buyers and sellers connect directly. We stay out of the way and let people trade on their own terms.",
  },
  {
    icon: RiWallet3Line,
    title: "Built for Africa",
    text: "From Lagos to Accra and beyond, 247Market is built around how people actually buy and sell across the continent.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About 247Market",
    url: `${SITE_URL}/about`,
    description: metadata.description,
  };

  return (
    <div className="w-full min-h-screen bg-sand text-navy-ink font-outfit">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="w-[90%] max-w-[1100px] mx-auto px-5 py-4 sm:py-6 flex flex-wrap sm:flex-nowrap justify-between items-center gap-3">
        <Link href="/" className="font-sora text-lg sm:text-[22px] font-extrabold text-navy flex items-center shrink-0">
          247
          <span className="text-navy-ink ml-px flex items-center gap-1">
            Market <FaStore />
          </span>
        </Link>

        <Link
          href="/app"
          className="w-full sm:w-auto justify-center bg-navy text-white px-4 sm:px-[22px] py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-[15px] flex items-center gap-2 transition-[0.25s] hover:bg-navy-deep"
        >
          Go to Marketplace <HiOutlineArrowRight />
        </Link>
      </header>

      <section className="w-[90%] max-w-[780px] mx-auto text-center px-5 pt-5 pb-[40px]">
        <span className="inline-block text-[13px] font-bold tracking-[0.06em] uppercase text-accent mb-3.5">
          About 247Market
        </span>
        <h1 className="font-sora text-[36px] font-extrabold text-navy mb-4 leading-[1.2] max-md:text-[26px]">
          A marketplace that never closes.
        </h1>
        <p className="text-muted text-base leading-[1.7]">
          247Market started with a simple observation: great deals don&apos;t keep office hours.
          Whether it&apos;s a car listed at midnight or an apartment someone finds at dawn, the
          best marketplaces are the ones that are always open — for everyone, in every city.
        </p>
      </section>

      <section className="w-[90%] max-w-[1100px] mx-auto px-4 lg:px-5 pb-[70px]">
        <div className="relative w-full h-[220px] sm:h-[320px] lg:h-[400px] rounded-[24px] overflow-hidden bg-[#f3ecdd] shadow-[0_30px_60px_-20px_rgba(7,19,40,0.25)]">
          <Image
            src="/about-us.jpeg"
            alt="Illustration of the 247Market community buying and selling directly with each other, no middlemen"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 1100px"
            className="object-cover"
          />
        </div>
      </section>

      <section className="w-[90%] max-w-[900px] mx-auto pb-[70px] grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div
          className="rounded-[24px] bg-[radial-gradient(circle_at_30%_20%,#1a3b66_0%,#0d2140_45%,#071328_100%)] shadow-[0_30px_60px_-20px_rgba(7,19,40,0.45)] w-full h-[240px] lg:h-[300px] flex items-center justify-center text-white font-sora font-extrabold text-[64px]"
          aria-hidden="true"
        >
          <span>24</span>
          <span className="opacity-60 mx-0.5">/</span>
          <span>7</span>
        </div>
        <div>
          <h2 className="font-sora text-2xl text-navy mb-4 font-extrabold">Our story</h2>
          <p className="text-muted text-base leading-[1.7] mb-4">
            We built 247Market to bring Nigeria&apos;s informal buying and selling online, with
            the trust and structure it deserves. What began as a way to make it easier to sell a
            car or find an apartment in Lagos has grown into a marketplace live across multiple
            African countries — connecting buyers and sellers over cars, phones, apartments,
            jobs and more.
          </p>
          <p className="text-muted text-base leading-[1.7]">
            Every listing on 247Market is posted directly by the person selling it — no agents
            inflating prices, no middlemen slowing things down. Just people trading directly,
            with verified accounts and transparent listings to back it up, and a built-in wallet
            so you can fund your account and pay for what you want without ever leaving the app.
          </p>
        </div>
      </section>

      <section className="w-[90%] max-w-[1100px] mx-auto px-4 lg:px-5 pt-10 pb-[90px]">
        <div className="text-center max-w-[620px] mx-auto mb-10">
          <span className="inline-block text-[13px] font-bold tracking-[0.06em] uppercase text-accent mb-3.5">
            What we stand for
          </span>
          <h2 className="text-2xl lg:text-[32px] text-navy font-extrabold">
            The principles behind every listing
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="bg-white border border-[#e7e2d8] rounded-2xl px-6 py-[30px] text-left transition-[0.25s] hover:-translate-y-1 hover:shadow-[0_20px_34px_-18px_rgba(7,19,40,0.25)] hover:border-transparent"
            >
              <v.icon className="text-[30px] text-accent mb-4 bg-accent-soft p-2.5 rounded-xl box-content" />
              <h3 className="text-lg mb-2 text-navy font-bold">{v.title}</h3>
              <p className="text-sm text-muted leading-[1.6]">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#0d2140_0%,#071328_100%)] text-white text-center px-4 lg:px-5 py-[60px] lg:py-[90px]">
        <h2 className="text-[28px] lg:text-[32px] mb-3 font-extrabold">Join the marketplace</h2>
        <p className="text-base opacity-85 mb-[30px]">
          Buy, sell and discover cars, phones, apartments, jobs and more — today.
        </p>
        <Link
          href="/app"
          className="px-6 py-3.5 lg:px-[30px] lg:py-[15px] rounded-full font-bold text-base transition-[0.25s] inline-flex items-center gap-2 bg-accent text-navy-deep shadow-[0_14px_30px_-10px_rgba(18,184,134,0.6)] hover:bg-[#0fa374]"
        >
          Get Started <HiOutlineArrowRight />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
