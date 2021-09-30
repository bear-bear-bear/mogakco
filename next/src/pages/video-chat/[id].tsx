import { createContext, useEffect, useMemo, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';

import useUser from '@hooks/useUser';
import useHandleChatErrorEvent from '@hooks/chat/useHandleChatErrorEvent';
import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import Sidebar from '@components/video-chat/Sidebar';
import apiClient, { logAxiosError } from '@lib/apiClient';
import devModeLog from '@lib/devModeLog';
import { refreshAccessTokenApiSSR } from '@lib/apis';
import getChatSocket from '@lib/getChatSocket';
import token from '@lib/token';
import type { GeneralAxiosError } from 'typings/common';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

export const SocketContext = createContext<Socket>(
  io({
    autoConnect: false,
  }),
);

export const ChatShowContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => undefined]);

const ChatRoom = () => {
  // const { user } = useUser({ redirectTo: '/' });
  const { user } = useUser();
  const router = useRouter();
  const chatShowState = useState<boolean>(true);

  const socketClient = useMemo(
    () => getChatSocket(user, router.query),
    [router.query, user],
  );

  /**
   * @desc 채팅 에러를 제어하는 useEffect
   */
  useHandleChatErrorEvent(socketClient, user, router);

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
        <ChatShowContext.Provider value={chatShowState}>
          <Container>
            <Sidebar />
            <ChatSection />
            <CamSection />
          </Container>
        </ChatShowContext.Provider>
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
