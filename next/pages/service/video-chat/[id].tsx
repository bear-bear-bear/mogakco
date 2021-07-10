import { useEffect, useMemo } from 'react';
import log from 'loglevel';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import devModeLog from '@lib/devModeLog';
import apiClient, { logAxiosError, Memory, memoryStore } from '@lib/apiClient';
import type { Error } from '@lib/apiClient';
import { refreshAccessTokenApiSSR } from '@lib/fetchers';
// import { socketServer } from '@pages/_app';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const ChatRoom = () => {
  const router = useRouter();
  const { id } = useMemo(() => router.query, [router.query]);

  // useEffect(() => {
  //   socketServer.emit('joinChatRoom', id);
  //   socketServer.on('joinUserMessage', (clientId: string) => {
  //     devModeLog(`${clientId} 유저가 접속하였다고 응답 되었음.`);
  //   });
  // }, [id]);

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

export const getServerSideProps: GetServerSideProps = async ({
  req: { headers },
  query: { id },
}) => {
  log.setLevel('debug');
  try {
    const {
      data: { accessToken },
    } = await refreshAccessTokenApiSSR(headers);
    memoryStore.set(Memory.ACCESS_TOKEN, accessToken);
    devModeLog('서버사이드에서 로그인이 연장처리 되었습니다.');

    const { data } = await apiClient.get<{
      message: boolean;
      statusCode: number;
    }>(`/api/chat/available/${id}`);
    devModeLog(`Server Response Message: ${data.message}`);
    devModeLog(`Response Status Code: ${data.statusCode}`);

    return { props: {} };
  } catch (error) {
    logAxiosError(error as Error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default ChatRoom;
