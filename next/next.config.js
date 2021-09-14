/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  async headers() {
    return [
      // if the header `x-add-header` is present,
      // the `x-another-header` header will be applied
      {
        source: '/:path*',
        has: [
          {
            type: 'Set-Cookie',
          },
        ],
        headers: [
          {
            key: 'access-control-expose-headers',
            value: 'Set-Cookie',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
