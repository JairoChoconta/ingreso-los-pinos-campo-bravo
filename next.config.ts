import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent-bog2-1.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'lh5.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
