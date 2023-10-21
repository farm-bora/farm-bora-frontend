/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        protocol: "https",
        hostname: "**.codeengine.appdomain.cloud",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
