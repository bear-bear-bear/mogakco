import React from 'react';
import { useRouter } from 'next/router';

import CustomHead from '@components/common/CustomHead';
import Button from '@components/common/Button';
import Container from '@components/dashboard/Container';
import CardLink from '@components/dashboard/CardLink';
import { logOutApi } from '@lib/fetchers';
import { Memory, memoryStore } from '@lib/apiClient';

export const pageProps = {
  title: '대시보드 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    logOutApi()
      .then(() => {
        memoryStore.delete(Memory.ACCESS_TOKEN);
        localStorage.setItem('log-out', 'true');
        router.push('/', undefined, { shallow: true });
      })
      .catch(() => router.push('/'));
  };

  return (
    // TODO: 버튼 위치 스타일 수정
    <>
      <CustomHead {...pageProps} />
      <Button color="blue" outline onClick={handleLogout}>
        로그아웃
      </Button>
      <Container>
        {/* <Link href={`/service/video-chat/${id}.js`}> */}
        {/* 임시로 화상채팅 1번 룸으로 가도록 설정 */}
        <CardLink
          href="/service/video-chat/1"
          svgName="video-chat.svg"
          title="화상 채팅"
          desc="모각코를 시작해요!"
        />
        <CardLink
          href="/service/my-page"
          svgName="chart-line-alt1.svg"
          title="마이페이지"
          desc="내 정보를 확인해보세요."
        />
      </Container>
    </>
  );
};

export default Dashboard;
