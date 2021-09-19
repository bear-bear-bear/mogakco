import React from 'react';
import { useRouter } from 'next/router';

import useUser from '@hooks/useUser';
import CustomHead from '@components/common/CustomHead';
import Container from '@components/dashboard/Container';
import ServiceHeader from '@components/common/ServiceHeader';
import Card from '@components/dashboard/Card';
import { getRecommendChatRoom } from '@lib/apis';

export const pageProps = {
  title: '대시보드 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const Dashboard = () => {
  const { user } = useUser({ redirectTo: '/' });
  const router = useRouter();

  const handleVideoChatCardClick = async () => {
    const roomId = await getRecommendChatRoom();
    await router.push(`/video-chat/${roomId}`);
  };

  if (!user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <ServiceHeader />
      <Container>
        {/* <Link href={`/video-chat/${id}`}> */}
        {/* 임시로 화상채팅 1번 룸으로 가도록 설정 */}
        <Card
          onClick={handleVideoChatCardClick}
          svgName="video-chat.svg"
          title="화상 채팅"
          desc="모각코를 시작해요!"
        />
        <Card
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
