import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Event forms can include a cover image plus several gallery photos.
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
