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
  async redirects() {
    return [
      // 인가 서비스, 비인가 서비스 구분 리다이렉션
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'x-authorized',
            value: 'true',
          },
        ],
        permanent: false,
        destination: '/service/',
      },
      {
        source: '/auth/:path*',
        has: [
          {
            type: 'header',
            key: 'x-authorized',
            value: 'true',
          },
        ],
        permanent: false,
        destination: '/service/',
      },
      {
        source: '/service/:path*',
        has: [
          {
            type: 'header',
            key: 'x-authorized',
            value: 'false',
          },
        ],
        permanent: false,
        destination: '/',
      },
    ];
  },
};
