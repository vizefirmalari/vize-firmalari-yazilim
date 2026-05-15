import type { NextConfig } from "next";

import { FIRM_BLOG_COVER_MAX_MB } from "./lib/blog/firm-blog-cover-limits";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      /** Varsayılan 1 MB; kapak görseli FormData ile bu sınırı aşıyordu. @see FIRM_BLOG_COVER_MAX_BYTES */
      bodySizeLimit: `${FIRM_BLOG_COVER_MAX_MB}mb`,
    },
  },
  async redirects() {
    return [
      { source: "/firma-panel", destination: "/panel", permanent: false },
      { source: "/firma-panel/:path*", destination: "/panel/:path*", permanent: false },
      { source: "/hizmet-vitrini", destination: "/yazilim-cozumleri", permanent: true },
      { source: "/hizmet-vitrini/:slug", destination: "/yazilim-cozumleri/:slug", permanent: true },
      { source: "/isini-buyut", destination: "/yazilim-cozumleri", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
