import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/app/create-ad", "/app/profile/", "/app/bookmark", "/reset-password/"],
      },
    ],
    sitemap: "https://247market.vercel.app/sitemap.xml",
  };
}
