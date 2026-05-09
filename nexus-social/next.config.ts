import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Diz ao Webpack para ignorar o 'fs' no navegador
      };
    }
    return config;
  },
};

export default nextConfig;