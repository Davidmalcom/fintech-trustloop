import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //disable type cheking when building
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
