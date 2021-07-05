import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import { GetServerSideProps } from 'next';
import apiClient, { Memory, memoryStore } from '@lib/apiClient';
import io from 'socket.io-client';
import { useEffect } from 'react';
import log from 'loglevel';
import { isDevelopment } from '@lib/enviroment';
import { useRouter } from 'next/router';
import { IProlongTokenProps } from '../../typings/auth';

export const END_POINT = 'http://localhost:8001/chat';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

export const socketServer = io.connect(END_POINT);

const ChatRoom = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    socketServer.on('connect', () => {
      console.log('connected');
      socketServer.emit('joinChatRoom', id);
      socketServer.on('joinUserMessage', (clientId: string) => {
        console.log(`${clientId} 유저가 접속하였다고 응답 되었음.`);
      });
    });
  }, [id]);

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
    const {
      data: { accessToken },
    } = await apiClient.get<IProlongTokenProps>('/api/auth/refresh-token', {
      headers: {
        ...context.req.headers,
      },
    });
    memoryStore.set(Memory.ACCESS_TOKEN, accessToken);
    if (isDevelopment) {
      log.debug('서버사이드에서 로그인이 연장처리 되었습니다.');
    }
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
      log.error(error.response?.data ?? error);
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
