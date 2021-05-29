const { resolve } = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['~'] = resolve(__dirname);
    config.resolve.alias.assets = resolve(__dirname, './public/assets');
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
