// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path');

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 * */
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      // 웹팩설정에 로더 추가함
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
