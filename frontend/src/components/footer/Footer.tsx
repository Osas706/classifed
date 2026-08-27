import Link from "next/link";
import { FaStore } from "react-icons/fa6";
import countries from "../../data/africanCountriesAds.json";

interface CountryData {
  slug: string;
  name: string;
}

const FEATURED_COUNTRIES = (countries as CountryData[]).slice(0, 4);

const Footer = () => {
  return (
    <footer id="footer" className="bg-navy-deep text-white/85 px-4 lg:px-5 pt-[50px] lg:pt-[70px] pb-[30px]">
      <div className="w-[90%] max-w-[1240px] mx-auto flex flex-col lg:flex-row justify-between gap-9 lg:gap-[60px] pb-[50px] flex-wrap">
        <div className="max-w-[280px]">
          <Link href="/" className="text-white text-[22px] font-extrabold flex items-center mb-3">
            247
            <span className="text-accent-soft ml-px flex items-center gap-1">
              Market <FaStore />
            </span>
          </Link>
          <p className="text-white/55 text-sm max-w-[260px]">
            Nigeria&apos;s marketplace, open around the clock — buy, sell and discover across Africa
            with verified sellers and no middlemen.
          </p>
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
            <Link href="/about" className="text-white/60 text-sm transition-[0.2s] hover:text-accent-soft">About Us</Link>
            <Link href="/blog" className="text-white/60 text-sm transition-[0.2s] hover:text-accent-soft">Blog</Link>
            <Link href="/contact" className="text-white/60 text-sm transition-[0.2s] hover:text-accent-soft">Contact</Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm mb-4 text-white font-bold">Explore</h4>
            {FEATURED_COUNTRIES.map((c) => (
              <Link
                key={c.slug}
                href={`/ads-in-${c.slug}`}
                className="text-white/60 text-sm transition-[0.2s] hover:text-accent-soft"
              >
                Ads in {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[90%] max-w-[1240px] mx-auto border-t border-white/10 pt-[22px] text-center text-[13px] text-white/45">
        <p>&copy; {new Date().getFullYear()} 247Market. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
