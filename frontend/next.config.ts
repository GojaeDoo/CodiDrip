import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // 강제 리렌더링 방지
  compiler: {
    styledComponents: true, // styled-components 활성화
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3005',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
