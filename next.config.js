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
        hostname:
          "https://farm-bora-frontend.18rsgxmzc56t.eu-gb.codeengine.appdomain.cloud",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
