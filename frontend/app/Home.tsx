"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaStore } from "react-icons/fa6";
import {
  RiCompassDiscoverLine,
  RiShieldCheckLine,
  RiWallet3Line,
  RiChat3Line,
} from "react-icons/ri";
import { MdOutlineSpeed } from "react-icons/md";
import { HiOutlineArrowRight } from "react-icons/hi2";
import countries from "../src/data/africanCountriesAds.json";

const STEPS = [
  {
    n: "01",
    title: "Create your listing",
    text: "Snap a few photos, set your price and post it — it takes less than two minutes.",
  },
  {
    n: "02",
    title: "Connect with buyers",
    text: "Interested buyers reach out directly. Chat, negotiate, and agree on the details.",
  },
  {
    n: "03",
    title: "Close the deal",
    text: "Meet up or arrange delivery, get paid, and mark your item as sold.",
  },
];

const INITIAL_COUNTRIES_SHOWN = 8;

export interface MarketplaceStats {
  totalAds: number;
  totalCountries: number;
  totalSellers: number;
}

const formatCount = (value: number) => {
  if (!value || value <= 0) return "0";
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K+`;
  }
  if (value >= 100) return `${value}+`;
  return `${value}`;
};

interface HomeProps {
  stats?: MarketplaceStats | null;
}

const eyebrow = "inline-block text-[13px] font-bold tracking-[0.06em] uppercase text-accent mb-3.5";
const btnPrimary =
  "px-6 py-3.5 sm:px-[30px] sm:py-[15px] rounded-full font-bold text-base transition-[0.25s] inline-flex items-center gap-2 bg-navy text-white shadow-[0_10px_24px_-8px_rgba(13,33,64,0.55)] hover:bg-navy-deep hover:-translate-y-0.5";
const btnSecondary =
  "px-6 py-3.5 sm:px-[30px] sm:py-[15px] rounded-full font-bold text-base transition-[0.25s] inline-flex items-center gap-2 bg-white text-navy border-2 border-navy hover:bg-accent-soft";
const sectionHeading = "text-center max-w-[620px] mx-auto mb-10 lg:mb-[50px]";
const sectionHeadingH2 = "text-2xl lg:text-[32px] text-navy font-extrabold";

const Home = ({ stats }: HomeProps) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);

  const displayStats = [
    { value: stats ? formatCount(stats.totalAds) : "—", label: "Active listings" },
    { value: stats ? formatCount(stats.totalCountries) : "—", label: "Countries covered" },
    { value: "24/7", label: "Always open" },
    { value: "0%", label: "Listing fees to start" },
  ];

  const visibleCountries = showAllCountries ? countries : countries.slice(0, INITIAL_COUNTRIES_SHOWN);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    toast.success("You're on the list — welcome to 247Market!");
    setEmail("");
  };

  return (
    <div className="w-full overflow-x-hidden text-navy-ink bg-sand">
      <header className="w-[90%] max-w-[1240px] mx-auto px-4 py-[18px] lg:px-5 lg:py-6 flex justify-between items-center sticky top-0 z-20 bg-sand/85 backdrop-blur-[10px]">
        <h2 className="font-sora text-[22px] text-navy font-extrabold flex items-center">
          247
          <span className="text-navy-ink ml-px flex items-center gap-1">
            Market <FaStore />
          </span>
        </h2>

        <Link
          href="/app"
          className="bg-navy text-white px-3 py-[9px] text-[12px] whitespace-nowrap sm:px-4 sm:text-[13px] lg:px-[22px] lg:py-3 lg:text-[15px] rounded-full font-semibold flex items-center gap-1.5 sm:gap-2 shrink-0 transition-[0.25s] hover:bg-navy-deep hover:-translate-y-px"
        >
          <span className="hidden sm:inline">Go to Marketplace</span>
          <span className="sm:hidden">Marketplace</span> <HiOutlineArrowRight />
        </Link>
      </header>

      <section className="w-[90%] max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-[60px] px-4 lg:px-5 pt-[30px] pb-[60px] lg:pt-[50px] lg:pb-[100px]">
        <div className="lg:flex-[1.15]">
          <span className={eyebrow}>Nigeria&apos;s marketplace, open around the clock</span>

          <h1 className="font-sora text-[28px] lg:text-[48px] font-extrabold leading-[1.15] text-navy mb-[22px]">
            Buy, sell &amp; discover <span className="text-accent">anything</span>, anytime.
          </h1>

          <p className="text-base lg:text-lg text-muted max-w-[520px] mb-[34px] leading-[1.6]">
            Cars, phones, apartments, jobs and more — post an ad in minutes, or browse thousands of
            listings near you. No middlemen, no waiting rooms, just people trading directly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-[50px]">
            <Link href="/app" className={btnPrimary}>
              Start Exploring <HiOutlineArrowRight />
            </Link>
            <Link href="/app/create-ad" className={btnSecondary}>
              Post an Ad
            </Link>
          </div>

          <div className="flex gap-[22px] lg:gap-9 flex-wrap">
            {displayStats.map((s) => (
              <div className="flex flex-col" key={s.label}>
                <strong className="font-sora text-[26px] font-extrabold text-navy">{s.value}</strong>
                <span className="text-[13px] text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="lg:flex-1 relative min-h-[260px] lg:min-h-[380px] rounded-[24px] bg-[radial-gradient(circle_at_30%_20%,#1a3b66_0%,#0d2140_45%,#071328_100%)] shadow-[0_30px_60px_-20px_rgba(7,19,40,0.45)] w-full overflow-hidden"
        >
          <Image
            src="/hero-illustration.png"
            alt="Illustration of buyers and sellers trading securely on 247Market across mobile, laptop and desktop"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-contain p-4 sm:p-6"
          />
        </div>
      </section>

      <section className="w-[90%] max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center text-center lg:text-left gap-10 lg:gap-[70px] px-4 lg:px-5 pt-[30px] lg:pt-10 pb-[70px] lg:pb-[110px]">
        <div
          className="shrink-0 w-[180px] h-[180px] lg:w-[260px] lg:h-[260px] rounded-full bg-[linear-gradient(135deg,#12b886_0%,#0aa06f_100%)] flex items-center justify-center text-white font-sora font-extrabold text-[44px] lg:text-[64px] shadow-[0_30px_50px_-18px_rgba(18,184,134,0.5)]"
          aria-hidden="true"
        >
          <span>24</span>
          <span className="opacity-60 mx-0.5">/</span>
          <span>7</span>
        </div>

        <div>
          <span className={eyebrow}>The idea behind 247Market</span>
          <h2 className="font-sora text-2xl lg:text-[34px] text-navy mb-[18px] font-extrabold">
            A marketplace that never closes.
          </h2>
          <p className="text-muted text-base leading-[1.7] mb-4 max-w-[620px] mx-auto lg:mx-0">
            247Market started with a simple observation: great deals don&apos;t keep office hours.
            Whether it&apos;s a car listed at midnight or an apartment someone finds at dawn, the best
            marketplaces are the ones that are always open — for everyone, in every city.
          </p>
          <p className="text-muted text-base leading-[1.7] mb-4 max-w-[620px] mx-auto lg:mx-0">
            We built 247Market to bring Nigeria&apos;s informal buying and selling online, with the
            trust and structure it deserves: verified accounts, transparent listings, and soon, a
            built-in wallet so you can fund your account and pay for what you want without ever
            leaving the app.
          </p>
        </div>
      </section>

      <section className="w-[90%] max-w-[1240px] mx-auto px-4 lg:px-5 pt-10 pb-[70px] lg:pb-[110px] text-center">
        <div className={sectionHeading}>
          <span className={eyebrow}>Across the continent</span>
          <h2 className={sectionHeadingH2}>Ads in Nigeria, Ghana &amp; beyond</h2>
          <p className="mt-3 text-muted text-[15px] leading-[1.6]">
            247Market is live across Africa. Pick a country to see local listings, popular
            categories and top cities.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-[30px]">
          {visibleCountries.map((c) => (
            <Link
              href={`/ads-in-${c.slug}`}
              key={c.slug}
              className="bg-white border border-[#e7e2d8] rounded-[14px] px-[18px] py-[26px] flex flex-col items-center gap-2 transition-[0.25s] hover:-translate-y-1 hover:shadow-[0_18px_30px_-16px_rgba(7,19,40,0.25)] hover:border-transparent"
            >
              <span className="text-[38px]">{c.flag}</span>
              <h3 className="text-navy text-base font-bold">{c.name}</h3>
              <span className="text-xs text-muted">{c.listings} listings</span>
            </Link>
          ))}
        </div>

        {countries.length > INITIAL_COUNTRIES_SHOWN && (
          <button
            type="button"
            className={`${btnSecondary} mx-auto`}
            onClick={() => setShowAllCountries((v) => !v)}
          >
            {showAllCountries ? "See Less" : "See More Countries"}
          </button>
        )}
      </section>

      <section className="w-[90%] max-w-[1240px] mx-auto px-4 lg:px-5 pt-10 pb-[70px] lg:pb-[110px]">
        <div className={sectionHeading}>
          <span className={eyebrow}>Why 247Market</span>
          <h2 className={sectionHeadingH2}>Everything you need to trade with confidence</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#e7e2d8] rounded-2xl px-6 py-[30px] text-left transition-[0.25s] hover:-translate-y-1 hover:shadow-[0_20px_34px_-18px_rgba(7,19,40,0.25)] hover:border-transparent">
            <RiCompassDiscoverLine className="text-[30px] text-accent mb-4 bg-accent-soft p-2.5 rounded-xl box-content" />
            <h3 className="text-lg mb-2 text-navy font-bold">Discover Easily</h3>
            <p className="text-sm text-muted leading-[1.6]">
              Browse by category, location or search for exactly what you need.
            </p>
          </div>

          <div className="bg-white border border-[#e7e2d8] rounded-2xl px-6 py-[30px] text-left transition-[0.25s] hover:-translate-y-1 hover:shadow-[0_20px_34px_-18px_rgba(7,19,40,0.25)] hover:border-transparent">
            <RiWallet3Line className="text-[30px] text-accent mb-4 bg-accent-soft p-2.5 rounded-xl box-content" />
            <h3 className="text-lg mb-2 text-navy font-bold">Wallet-Powered</h3>
            <p className="text-sm text-muted leading-[1.6]">
              Fund your wallet and pay for listings and ad boosts, all in one place.
            </p>
          </div>

          <div className="bg-white border border-[#e7e2d8] rounded-2xl px-6 py-[30px] text-left transition-[0.25s] hover:-translate-y-1 hover:shadow-[0_20px_34px_-18px_rgba(7,19,40,0.25)] hover:border-transparent">
            <RiShieldCheckLine className="text-[30px] text-accent mb-4 bg-accent-soft p-2.5 rounded-xl box-content" />
            <h3 className="text-lg mb-2 text-navy font-bold">Trusted Sellers</h3>
            <p className="text-sm text-muted leading-[1.6]">
              A community built on verified accounts and transparent listings.
            </p>
          </div>

          <div className="bg-white border border-[#e7e2d8] rounded-2xl px-6 py-[30px] text-left transition-[0.25s] hover:-translate-y-1 hover:shadow-[0_20px_34px_-18px_rgba(7,19,40,0.25)] hover:border-transparent">
            <MdOutlineSpeed className="text-[30px] text-accent mb-4 bg-accent-soft p-2.5 rounded-xl box-content" />
            <h3 className="text-lg mb-2 text-navy font-bold">Fast &amp; Simple</h3>
            <p className="text-sm text-muted leading-[1.6]">Post an ad or find a deal in minutes, not hours.</p>
          </div>
        </div>
      </section>

      <section className="w-[90%] max-w-[1240px] mx-auto px-4 lg:px-5 pt-10 pb-[70px] lg:pb-[110px]">
        <div className={sectionHeading}>
          <span className={eyebrow}>How it works</span>
          <h2 className={sectionHeadingH2}>From listing to sold, in three steps</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
          {STEPS.map((step) => (
            <div className="bg-white border border-[#e7e2d8] rounded-2xl px-7 py-[34px] relative" key={step.n}>
              <span className="font-sora font-extrabold text-4xl text-accent-soft [-webkit-text-stroke:1.5px_#12b886] block mb-3.5">
                {step.n}
              </span>
              <h3 className="text-lg text-navy mb-2.5 font-bold">{step.title}</h3>
              <p className="text-sm text-muted leading-[1.6]">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-[90%] max-w-[640px] mx-auto px-4 lg:px-5 pt-10 pb-[70px] lg:pb-[110px] text-center">
        <RiChat3Line className="text-[34px] text-accent bg-accent-soft p-3.5 rounded-2xl mb-5 inline-block box-content" />
        <h2 className="text-[28px] text-navy mb-3 font-extrabold">Stay in the loop</h2>
        <p className="text-muted mb-[26px] text-[15px]">
          Get the best new listings and 247Market updates straight to your inbox. No spam, unsubscribe anytime.
        </p>

        {subscribed ? (
          <p className="text-accent font-bold text-base">You&apos;re subscribed — thank you! 🎉</p>
        ) : (
          <form
            className="flex flex-col sm:flex-row gap-2.5 bg-white border border-[#e7e2d8] p-2.5 sm:p-1.5 rounded-2xl sm:rounded-full shadow-[0_16px_30px_-18px_rgba(7,19,40,0.25)]"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-none outline-none px-[18px] py-3 text-[15px] bg-transparent font-[inherit]"
            />
            <button
              type="submit"
              className="bg-navy text-white border-none px-[26px] py-3 rounded-xl sm:rounded-full font-bold text-[15px] transition-[0.25s] hover:bg-navy-deep"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>

      <section className="bg-[linear-gradient(135deg,#0d2140_0%,#071328_100%)] text-white text-center px-4 lg:px-5 py-[60px] lg:py-[90px]">
        <h2 className="text-[28px] lg:text-[32px] mb-3 font-extrabold">Ready to get started?</h2>
        <p className="text-base opacity-85 mb-[30px]">Join 247Market and turn your listings into sales today.</p>
        <Link
          href="/app"
          className="px-6 py-3.5 lg:px-[30px] lg:py-[15px] rounded-full font-bold text-base transition-[0.25s] inline-flex items-center gap-2 bg-accent text-navy-deep shadow-[0_14px_30px_-10px_rgba(18,184,134,0.6)] hover:bg-[#0fa374]"
        >
          Get Started <HiOutlineArrowRight />
        </Link>
      </section>

      <footer id="footer" className="bg-navy-deep text-white/85 px-4 lg:px-5 pt-[50px] lg:pt-[70px] pb-[30px]">
        <div className="w-[90%] max-w-[1240px] mx-auto flex flex-col lg:flex-row justify-between gap-9 lg:gap-[60px] pb-[50px] flex-wrap">
          <div>
            <h2 className="text-white text-[22px] font-extrabold flex items-center mb-3">
              247
              <span className="text-accent-soft ml-px flex items-center gap-1">
                Market <FaStore />
              </span>
            </h2>
            <p className="text-white/55 text-sm max-w-[260px]">Nigeria&apos;s marketplace, open around the clock.</p>
          </div>

          <div className="flex gap-9 sm:gap-[70px] flex-wrap">
            <div className="flex flex-col gap-2.5">
              <h4 className="text-sm mb-4 text-white font-bold">Marketplace</h4>
              <Link href="/app" className="text-white/60 text-sm transition-[0.2s] hover:text-accent-soft">Home</Link>
              <Link href="/app/discover" className="text-white/60 text-sm transition-[0.2s] hover:text-accent-soft">Discover</Link>
              <Link href="/app/categories" className="text-white/60 text-sm transition-[0.2s] hover:text-accent-soft">Categories</Link>
              <Link href="/app/create-ad" className="text-white/60 text-sm transition-[0.2s] hover:text-accent-soft">Post an Ad</Link>
            </div>

            <div className="flex flex-col gap-2.5">
              <h4 className="text-sm mb-4 text-white font-bold">Company</h4>
              <a href="#footer" className="text-white/60 text-sm transition-[0.2s] hover:text-accent-soft">About Us</a>
              <a href="#footer" className="text-white/60 text-sm transition-[0.2s] hover:text-accent-soft">Contact</a>
              <a href="#footer" className="text-white/60 text-sm transition-[0.2s] hover:text-accent-soft">Terms of Use</a>
              <a href="#footer" className="text-white/60 text-sm transition-[0.2s] hover:text-accent-soft">Privacy Policy</a>
            </div>
          </div>
        </div>

        <div className="w-[90%] max-w-[1240px] mx-auto border-t border-white/10 pt-[22px] text-center text-[13px] text-white/45">
          <p>&copy; {new Date().getFullYear()} 247Market. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
