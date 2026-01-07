import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ghuntley.com',
        pathname: '/content/images/**',
      },
    ],
  },
};

export default nextConfig;
