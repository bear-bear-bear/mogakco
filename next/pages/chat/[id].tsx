import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import apiClient from '@lib/apiClient';
import { useEffect } from 'react';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

type Props = {
  chatAvailable: { message: boolean; statusCode: number };
};

const ChatRoom = ({ chatAvailable: { message: isChat } }: Props) => {
  const router = useRouter();

  // TODO: 06-27 일단 메인으로 리다이렉션 시키고 추후 사후처리 변경
  // TODO: 페이지를 더 빨리 전환할 수 있는 방법 찾기
  useEffect(() => {
    if (!isChat) router.push('/');
  }, [isChat, router]);

  if (!isChat) return null;

  return (
    <>
      <CustomHead {...pageProps} />
      <Container>
        <CamSection />
        <ChatSection />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: chatAvailable } = await apiClient.get<{
    message: boolean;
    statusCode: number;
  }>(`/api/chat/available/${context.query.id}`);
  return { props: { chatAvailable } };
};

export default ChatRoom;
