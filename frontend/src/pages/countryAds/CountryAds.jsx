import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { FaStore } from "react-icons/fa6";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { RiMapPinLine, RiPriceTag3Line } from "react-icons/ri";
import countries from "../../data/africanCountriesAds.json";

const CountryAds = () => {
  const { country } = useParams();
  const data = countries.find((c) => c.slug === country);

  useEffect(() => {
    if (data) {
      document.title = `Ads in ${data.name} | 247Market`;
    }
  }, [data]);

  if (!data) {
    return <Navigate to="/" />;
  }

  const otherCountries = countries.filter((c) => c.slug !== data.slug).slice(0, 4);

  return (
    <div className="w-full min-h-screen bg-sand text-navy-ink font-outfit">
      <header className="w-[90%] max-w-[1100px] mx-auto px-5 py-6 flex justify-between items-center">
        <Link
          to="/"
          className="font-sora text-[22px] font-extrabold text-navy flex items-center"
        >
          247
          <span className="text-navy-ink ml-px flex items-center gap-1">
            Market <FaStore />
          </span>
        </Link>

        <Link
          to="/app"
          className="bg-navy text-white px-[22px] py-3 rounded-full font-semibold text-[15px] flex items-center gap-2 transition-[0.25s] hover:bg-navy-deep"
        >
          Go to Marketplace <HiOutlineArrowRight />
        </Link>
      </header>

      <section className="w-[90%] max-w-[780px] mx-auto text-center px-5 pt-5 pb-[60px]">
        <span className="text-[56px] block mb-2.5">{data.flag}</span>
        <span className="block text-[13px] font-bold tracking-[0.06em] uppercase text-accent mb-3">
          Ads in {data.name}
        </span>
        <h1 className="font-sora text-[36px] font-extrabold text-navy mb-4 leading-[1.2] max-md:text-[26px]">
          {data.tagline}
        </h1>
        <p className="text-muted text-base leading-[1.7] mb-8">{data.description}</p>

        <div className="flex justify-center gap-10 mb-[34px] flex-wrap">
          <div className="flex flex-col">
            <strong className="font-sora text-xl font-extrabold text-navy">
              {data.listings}
            </strong>
            <span className="text-xs text-muted">Active listings</span>
          </div>
          <div className="flex flex-col">
            <strong className="font-sora text-xl font-extrabold text-navy">
              {data.currency}
            </strong>
            <span className="text-xs text-muted">Local currency</span>
          </div>
          <div className="flex flex-col">
            <strong className="font-sora text-xl font-extrabold text-navy">
              {data.cities.length}+
            </strong>
            <span className="text-xs text-muted">Cities covered</span>
          </div>
        </div>

        <Link
          to="/app"
          className="inline-flex items-center gap-2 bg-navy text-white px-[30px] py-[15px] rounded-full font-bold text-base transition-[0.25s] shadow-[0_10px_24px_-8px_rgba(13,33,64,0.55)] hover:bg-navy-deep hover:-translate-y-0.5"
        >
          Browse {data.name} listings <HiOutlineArrowRight />
        </Link>
      </section>

      <section className="w-[90%] max-w-[900px] mx-auto grid grid-cols-2 gap-6 pb-[70px] max-md:grid-cols-1">
        <div className="bg-white border border-[#e7e2d8] rounded-2xl px-[26px] py-7">
          <RiMapPinLine className="text-[26px] text-accent bg-accent-soft p-2 rounded-[10px] box-content mb-3" />
          <h3 className="font-sora text-navy mb-3 text-[17px]">Top cities</h3>
          <ul className="list-none flex flex-col gap-2 text-muted text-sm">
            {data.cities.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-[#e7e2d8] rounded-2xl px-[26px] py-7">
          <RiPriceTag3Line className="text-[26px] text-accent bg-accent-soft p-2 rounded-[10px] box-content mb-3" />
          <h3 className="font-sora text-navy mb-3 text-[17px]">Popular categories</h3>
          <ul className="list-none flex flex-col gap-2 text-muted text-sm">
            {data.popularCategories.map((cat) => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-[90%] max-w-[900px] mx-auto pb-[90px] text-center">
        <h2 className="font-sora text-[22px] text-navy mb-6">
          Explore ads in other countries
        </h2>
        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
          {otherCountries.map((c) => (
            <Link
              to={`/ads-in/${c.slug}`}
              key={c.slug}
              className="bg-white border border-[#e7e2d8] rounded-xl px-3.5 py-5 flex flex-col items-center gap-2 transition-[0.2s] hover:-translate-y-[3px] hover:shadow-[0_14px_26px_-14px_rgba(7,19,40,0.25)]"
            >
              <span className="text-3xl">{c.flag}</span>
              <strong className="text-navy text-sm">{c.name}</strong>
            </Link>
          ))}
        </div>
      </section>

      <footer
        id="footer"
        className="text-center p-6 text-[13px] text-muted border-t border-[#e7e2d8]"
      >
        <p>&copy; {new Date().getFullYear()} 247Market. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CountryAds;
