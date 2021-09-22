// eslint-disable-next-line @typescript-eslint/no-var-requires
const removeImports = require('next-remove-imports')({});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: { esmExternals: true },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = removeImports(nextConfig);
