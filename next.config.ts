import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Custom loader for Cloudflare Pages (no default optimization)
    loader: 'custom',
    loaderFile: './sanity-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
