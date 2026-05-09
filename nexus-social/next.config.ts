import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {}, // Adicione esta linha para silenciar o erro do Next.js 16
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;