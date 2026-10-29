import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/create-ad", "/dashboard/profile/", "/dashboard/bookmark", "/reset-password/"],
      },
    ],
    sitemap: "https://247market.org/sitemap.xml",
  };
}
