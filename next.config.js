const { resolve } = require('path');
const Dotenv = require('dotenv-webpack');

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
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
};
