import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 全ドメインを許可（開発用）
      },
      {
        protocol: "http",
        hostname: "**", // 全ドメインを許可（開発用）
      },
    ],
  },
};

export default nextConfig;
