import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nw-hub.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
