import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Prisma to work correctly in Next.js serverless
  serverExternalPackages: ["@prisma/client", "prisma"],

  // Don't fail the build on TypeScript errors (type-check separately)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Don't fail the build on ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
