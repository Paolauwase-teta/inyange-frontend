import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.logotypes101.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'halalfoodcouncil.eu',
      },
      {
        protocol: 'https',
        hostname: 'www.aenor.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ifs-certification.com',
      },
    ],
  },
};

export default nextConfig;
