/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async rewrites() {
    return [
      { source: "/ads-in-:country", destination: "/ads-in/:country" },
    ];
  },
};

export default nextConfig;
