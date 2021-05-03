const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['~'] = path.resolve(__dirname);
    config.resolve.alias.assets = path.resolve('public/assets');
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
