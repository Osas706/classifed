import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RiMapPinLine, RiCalendarLine, RiPriceTag3Line, RiShieldCheckLine } from "react-icons/ri";
import MapClient from "../../../../src/components/map/MapClient";
import AdContactCard from "./AdContactCard";
import AdPrice from "./AdPrice";
import MoreFromSeller from "./MoreFromSeller";
import { formatAdDate } from "../../../../src/utils/utils";

const API_URL = "https://classifed-247market.onrender.com";
const SITE_URL = "https://247market.org";

async function getAd(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/ads/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const data = await getAd(params.id);
  const ad = data?.ad;

  if (!ad) return { title: "Ad not found" };

  const title = `${ad.title} — ₦${Number(ad.price || 0).toLocaleString()}`;
  const description = ad.description?.slice(0, 160) || `${ad.title} for sale on 247Market`;

  return {
    title,
    description,
    alternates: { canonical: `/app/ad/${params.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/app/ad/${params.id}`,
      type: "website",
      images: ad.adImage ? [ad.adImage] : undefined,
    },
  };
}

export default async function AdPage({ params }: { params: { id: string } }) {
  const data = await getAd(params.id);
  const ad = data?.ad;
  const relatedAds = data?.relatedAds || [];

  if (!ad) return notFound();

  const formattedDate = formatAdDate(ad.createdAt);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: ad.title,
    description: ad.description,
    image: ad.adImage ? [ad.adImage] : undefined,
    category: ad.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: ad.price || 0,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/app/ad/${params.id}`,
    },
  };

  return (
    <div className="flex flex-col gap-8 p-2.5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-surface-dark border border-navy/15 dark:border-white/10 rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ad.adImage}
              alt={ad.title}
              className="w-full max-h-[420px] object-cover bg-[whitesmoke] dark:bg-white/5"
            />

            <div className="p-6 flex flex-col gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold capitalize text-navy dark:text-white">{ad.title}</h1>
                <AdPrice price={ad?.price} terms={ad?.terms} />
              </div>

              <p className="text-navy-ink dark:text-white/70 leading-relaxed">{ad.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-navy/10 dark:border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-xs text-muted dark:text-white/50">
                    <RiPriceTag3Line /> Category
                  </span>
                  <span className="text-sm font-semibold text-navy dark:text-white capitalize">{ad.category || "—"}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-xs text-muted dark:text-white/50">
                    <RiShieldCheckLine /> Condition
                  </span>
                  <span className="text-sm font-semibold text-navy dark:text-white capitalize">{ad.condition || "—"}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-xs text-muted dark:text-white/50">
                    <RiMapPinLine /> Location
                  </span>
                  <span className="text-sm font-semibold text-navy dark:text-white capitalize">
                    {[ad.state, ad.country].filter(Boolean).join(", ") || "—"}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-xs text-muted dark:text-white/50">
                    <RiCalendarLine /> Posted
                  </span>
                  <span className="text-sm font-semibold text-navy dark:text-white">{formattedDate}</span>
                </div>
              </div>

              {ad.terms && (
                <span className="w-fit rounded-full bg-accent-soft dark:bg-white/10 text-accent dark:text-accent px-3 py-1 text-xs font-semibold">
                  {ad.terms}
                </span>
              )}
            </div>
          </div>

          {(ad.lat || ad.long) && (
            <div>
              <h3 className="flex items-center gap-1.5 text-sm font-semibold text-navy dark:text-white mb-2">
                <RiMapPinLine className="text-accent" /> Location on map
              </h3>
              <div className="bg-white dark:bg-surface-dark border border-navy/15 dark:border-white/10 rounded-2xl overflow-hidden h-[220px] sm:h-[280px] lg:h-[300px]">
                <MapClient lat={ad.lat} long={ad.long} title={ad?.title} />
              </div>
            </div>
          )}
        </div>

        <AdContactCard
          displayImage={ad.displayImage}
          firstName={ad.firstName}
          lastName={ad.lastName}
          email={ad.email}
          phoneNumber={ad.phoneNumber}
          sellerStatus={data?.sellerStatus}
        />
      </div>

      <div className="bg-white dark:bg-surface-dark border border-navy/15 dark:border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-navy dark:text-white mb-5">More Ads From This Seller</h2>

        <MoreFromSeller relatedAds={relatedAds.filter((item: any) => item._id !== ad._id)} />
      </div>
    </div>
  );
}
