import { GetServerSideProps } from 'next';
import { createContext, useEffect, useState } from 'react';

import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import Sidebar from '@components/video-chat/Sidebar';
import apiClient, { logAxiosError } from '@lib/apiClient';
import devModeLog from '@lib/devModeLog';
import { refreshAccessTokenApiSSR } from '@lib/apis';
import token from '@lib/token';
import useUser from '@hooks/useUser';
import type { GeneralAxiosError } from 'typings/common';
import getChatSocket from '@lib/getChatSocket';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';
import { ChatEvent } from '@lib/enum';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

export const SocketContext = createContext<Socket>(io());

const ChatRoom = () => {
  // const { user } = useUser({ redirectTo: '/' });
  const { user } = useUser();
  const router = useRouter();
  const [isShowChat, setIsShowChat] = useState<boolean>(true);

  const socketClient = getChatSocket(user, router.query);

  /**
   * @desc 채팅 에러를 제어하는 useEffect
   */
  useEffect(() => {
    socketClient.on(ChatEvent.CHECK_MULTIPLE_USER, (id: number) => {
      if (user?.id === id) {
        router.push('/dashboard');
      }
    });
    socketClient.on(ChatEvent.CONNECT_ERROR, (err) => {
      devModeLog(err.message);
      router.push('/dashboard');
    });
    return () => {
      socketClient.off(ChatEvent.CHECK_MULTIPLE_USER);
      socketClient.off(ChatEvent.CONNECT_ERROR);
    };
  }, [router, socketClient, user?.id]);

  /**
   * @desc ComponentDidUnMount 시 소켓 연결을 종료하는 useEffect
   */
  useEffect(() => {
    return () => {
      socketClient.disconnect();
    };
  }, [socketClient]);

  if (!user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <SocketContext.Provider value={socketClient}>
        <Container>
          <Sidebar setIsShowChat={setIsShowChat} />
          <ChatSection isShowChat={isShowChat} setIsShowChat={setIsShowChat} />
          <CamSection />
        </Container>
      </SocketContext.Provider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req: { headers },
  query: { id },
}) => {
  try {
    const {
      data: { accessToken },
    } = await refreshAccessTokenApiSSR(headers);
    token.set({ accessToken });
    devModeLog('서버사이드에서 로그인이 연장처리 되었습니다.');

    const { data } = await apiClient.get<{
      message: boolean;
      statusCode: number;
    }>(`/api/chat/${id}/available/`);
    devModeLog(`Server Response Message: ${data.message}`);
    devModeLog(`Response Status Code: ${data.statusCode}`);

    return { props: {} };
  } catch (error) {
    logAxiosError(error as GeneralAxiosError);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default ChatRoom;
