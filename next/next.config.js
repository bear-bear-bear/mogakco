/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 * */
module.exports = {
  excludeFile: (str) => /test\/*/.test(str),
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.(test|spec).(js|ts|tsx)$/,
      loader: 'ignore-loader',
    });

    return config;
  },
};
