import type { MetadataRoute } from "next";
import countries from "../src/data/africanCountriesAds.json";

const SITE_URL = "https://247market.vercel.app";
const API_URL = "https://classifed-247market.onrender.com";

async function getAllAdIds(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/ads/list`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data || []).map((ad: any) => ad._id);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const adIds = await getAllAdIds();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/app`, changeFrequency: "daily", priority: 0.8 },
  ];

  const countryRoutes: MetadataRoute.Sitemap = (countries as any[]).map((c) => ({
    url: `${SITE_URL}/ads-in-${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const adRoutes: MetadataRoute.Sitemap = adIds.map((id) => ({
    url: `${SITE_URL}/app/ad/${id}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...countryRoutes, ...adRoutes];
}
