/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for real-time multiplayer game
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
