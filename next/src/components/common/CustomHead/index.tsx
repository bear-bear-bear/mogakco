import Head from 'next/head';
import { FC } from 'react';

interface IProps {
  title: string;
  description: string;
  url: string;
  locale: string;
}

const CustomHead: FC<IProps> = ({
  title = '모여서 각자 코딩 - Mogakco',
  description = 'Free online video chat for developers',
  url = '',
  locale = 'ko_KR',
}) => {
  // TODO: favicon 제작하여 추가하기
  // html <head>에 들어갈 정보: https://github.com/joshbuchea/HEAD
  const logoUrl =
    'https://github.com/bear-bear-bear/mogakco/blob/master/public/assets/svg/logo1.svg';

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:site_name" content="Mogakco" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image" content={logoUrl} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@mogakco" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image:src" content={logoUrl} />
    </Head>
  );
};

export default CustomHead;
