import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ["better-sqlite3"],
  experimental: {
    // Tree-shake the all-in-one Radix and icon packages used by the Watermelon UI components.
    optimizePackageImports: ["radix-ui", "lucide-react", "react-icons"],
  },
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
