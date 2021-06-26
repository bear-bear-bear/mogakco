import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import { GetServerSideProps } from 'next';
import apiClient from '@lib/apiClient';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const ChatRoom = () => {
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
  console.log(context.req);
  const { data: chatAvailable } = await apiClient.get<{
    message: boolean;
    statusCode: number;
  }>(`/api/chat/available/${context.query.id}`);
  const isChatRoom = chatAvailable.message;
  if (!isChatRoom) {
    return {
      redirect: {
        destination: context.req.headers.referer ?? '/',
      },
    };
  }

  return {};
};

export default ChatRoom;
