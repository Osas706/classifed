import type { MetadataRoute } from "next";
import countries from "../src/data/africanCountriesAds.json";
import { blogPosts } from "../src/data/blogPosts";

const SITE_URL = "https://247market.org";
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
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const countryRoutes: MetadataRoute.Sitemap = (countries as any[]).map((c) => ({
    url: `${SITE_URL}/ads-in-${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: p.date,
  }));

  const adRoutes: MetadataRoute.Sitemap = adIds.map((id) => ({
    url: `${SITE_URL}/app/ad/${id}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...countryRoutes, ...blogRoutes, ...adRoutes];
}
