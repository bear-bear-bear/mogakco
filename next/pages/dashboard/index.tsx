import React from 'react';
import Link from 'next/link';

import CustomHead from '@components/common/CustomHead';
import Container from '@components/dashboard/Container';
import Card from '@components/dashboard/Card';

export const pageProps = {
  title: '대시보드 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const SignIn = () => {
  return (
    <>
      <CustomHead {...pageProps} />
      <Container>
        <Link href="/video-chat/1.js">
          {/* <Link href={`/video-chat/${id}.js`}> */}
          {/* 임시로 화상채팅 1번 룸으로 가도록 설정 */}
          <a>
            <Card
              svgName="video-chat.svg"
              title="화상 채팅"
              desc="모각코를 시작해요!"
            />
          </a>
        </Link>
        <Link href="/my-page">
          <a>
            <Card
              svgName="chart-line-alt1.svg"
              title="마이페이지"
              desc="내 정보를 확인해보세요."
            />
          </a>
        </Link>
      </Container>
    </>
  );
};

export default SignIn;
