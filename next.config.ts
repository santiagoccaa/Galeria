import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'q8di3m7vvw.ufs.sh'
    }],
  },
};

export default nextConfig;
