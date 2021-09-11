import React from 'react';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';
import Container from '@components/dashboard/Container';
import CardLink from '@components/dashboard/CardLink';
import ServiceHeader from '@components/common/ServiceHeader';

export const pageProps = {
  title: '대시보드 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const Dashboard = () => {
  const { user } = useUser({ redirectTo: '/' });

  // TODO: 로그아웃 버튼 스타일, 위치 등 수정하기 (공용 헤더혹은 공용 버튼그룹으로 묶기)
  if (!user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <ServiceHeader />
      <Container>
        {/* <Link href={`/video-chat/${id}`}> */}
        {/* 임시로 화상채팅 1번 룸으로 가도록 설정 */}
        <CardLink
          href="/video-chat/1"
          svgName="video-chat.svg"
          title="화상 채팅"
          desc="모각코를 시작해요!"
        />
        <CardLink
          href="/my-page"
          svgName="chart-line-alt1.svg"
          title="마이페이지"
          desc="내 정보를 확인해보세요."
        />
      </Container>
    </>
  );
};

export default Dashboard;
