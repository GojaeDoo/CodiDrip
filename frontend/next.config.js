/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3005",
        pathname: "/uploads/profiles/**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
