import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output 'export' when building mobile APK or if CAPACITOR_BUILD is set;
  // on Vercel, it builds standard Next.js with full serverless API routes support!
  output: process.env.CAPACITOR_BUILD === 'true' ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
