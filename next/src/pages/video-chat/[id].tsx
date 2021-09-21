import { GetServerSideProps } from 'next';
import { createContext, useEffect } from 'react';

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
import useSocket from '@hooks/useSocket';
import useChatError from '@hooks/video-chat/useChatError';
import type { GeneralAxiosError } from 'typings/common';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

export const SocketContext = createContext<ReturnType<typeof useSocket>>(null);

const ChatRoom = () => {
  // const { user } = useUser({ redirectTo: '/' });
  const { user } = useUser();
  const client = useSocket();

  useChatError(client);

  useEffect(() => {
    return () => {
      client?.disconnect();
    };
  }, [client]);

  if (!user?.isLoggedIn) return null;
  return (
    <>
      <CustomHead {...pageProps} />
      <SocketContext.Provider value={client}>
        <Container>
          <Sidebar />
          <ChatSection />
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
