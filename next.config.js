/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Removed to allow API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Keep unoptimized to avoid build issues
  },
  // Removed experimental features that could cause build problems
  compiler: {
    removeConsole: false, // Don't remove console logs for now
  },
};

module.exports = nextConfig;
