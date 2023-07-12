/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  experimental: { serverComponentsExternalPackages: ['mongoose'] },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;
