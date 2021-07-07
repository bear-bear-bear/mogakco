<<<<<<< HEAD
import { useEffect } from 'react';
=======
import { useEffect, useMemo } from 'react';
import log from 'loglevel';
>>>>>>> 5210577870ef6a98dd30fc4320ca4cd8d10a9b9c
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import devModeLog from '@lib/devModeLog';
import apiClient, { Memory, memoryStore } from '@lib/apiClient';
<<<<<<< HEAD
import { IProlongTokenProps } from 'typings/auth';

export const END_POINT = 'http://localhost:8001/chat';
=======
import { refreshAccessTokenApiSSR } from '@lib/fetchers';
import { socketServer } from '@pages/_app';
>>>>>>> 5210577870ef6a98dd30fc4320ca4cd8d10a9b9c

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const ChatRoom = () => {
  const router = useRouter();
  const { id } = useMemo(() => router.query, [router.query]);

  useEffect(() => {
<<<<<<< HEAD
    socketServer.on('connect', () => {
      devModeLog('connected');
      socketServer.emit('joinChatRoom', id);
      socketServer.on('joinUserMessage', (clientId: string) => {
        devModeLog(`${clientId} 유저가 접속하였다고 응답 되었음.`);
      });
=======
    socketServer.emit('joinChatRoom', id);
    socketServer.on('joinUserMessage', (clientId: string) => {
      console.log(`${clientId} 유저가 접속하였다고 응답 되었음.`);
>>>>>>> 5210577870ef6a98dd30fc4320ca4cd8d10a9b9c
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

<<<<<<< HEAD
export const getServerSideProps: GetServerSideProps = async (context) => {
=======
export const getServerSideProps: GetServerSideProps = async ({
  req: { headers },
  query: { id },
}) => {
  log.setLevel('debug');
>>>>>>> 5210577870ef6a98dd30fc4320ca4cd8d10a9b9c
  try {
    const {
      data: { accessToken },
    } = await refreshAccessTokenApiSSR(headers);
    memoryStore.set(Memory.ACCESS_TOKEN, accessToken);
    devModeLog('서버사이드에서 로그인이 연장처리 되었습니다.');

    const { data } = await apiClient.get<{
      message: boolean;
      statusCode: number;
<<<<<<< HEAD
    }>(`/api/chat/available/${context.query.id}`);
    devModeLog(`Server Response Message: ${data.message}`);
    devModeLog(`Response Status Code: ${data.statusCode}`);
=======
    }>(`/api/chat/available/${id}`);
    if (isDevelopment) {
      log.debug(`Server Response Message: ${data.message}`);
      log.debug(`Response Status Code: ${data.statusCode}`);
    }
>>>>>>> 5210577870ef6a98dd30fc4320ca4cd8d10a9b9c

    return { props: {} };
  } catch (error) {
    devModeLog(error.response?.data ?? error, 'error');
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default ChatRoom;
