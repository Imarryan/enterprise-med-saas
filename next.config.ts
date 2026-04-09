import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Prisma to work correctly in Next.js serverless
  serverExternalPackages: ["@prisma/client", "prisma"],

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
