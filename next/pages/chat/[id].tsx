import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import { GetServerSideProps } from 'next';
import apiClient from '@lib/apiClient';
import io from 'socket.io-client';
import { useEffect } from 'react';
import log from 'loglevel';
import { isDevelopment } from '@lib/enviroment';

export const END_POINT = 'http://localhost:8001/chat';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const ChatRoom = () => {
  const socketServer = io(END_POINT, {
    autoConnect: true,
    reconnection: true,
  });

  useEffect(() => {
    socketServer.emit('connection');
    socketServer.on('connect', () => {
      console.log('connected');
    });
  }, [socketServer]);

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
  log.setLevel('debug');

  try {
    const { data } = await apiClient.get<{
      message: boolean;
      statusCode: number;
    }>(`/api/chat/available/${context.query.id}`);
    if (isDevelopment) {
      log.debug(`Server Response Message: ${data.message}`);
      log.debug(`Response Status Code: ${data.statusCode}`);
    }

    return { props: {} };
  } catch (error) {
    if (isDevelopment) {
      log.error(error);
    }
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default ChatRoom;
