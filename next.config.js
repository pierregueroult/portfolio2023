/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.postimg.cc",
      },
    ],
  },
};

module.exports = nextConfig;
