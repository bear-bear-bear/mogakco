import { useEffect } from 'react';
import { useRouter } from 'next/router';

import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import useUser from '@hooks/useUser';
import apiClient, { logAxiosError } from '@lib/apiClient';
import devModeLog from '@lib/devModeLog';
import type { GeneralAxiosError } from 'typings/common';
import type { IUserGetSuccessResponse } from 'typings/auth';
import { GetServerSideProps } from 'next';
import { refreshAccessTokenApiSSR } from '@lib/apis';
import token from '@lib/token';
import useSocketTest from '@hooks/useSocketTest';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const ChatRoom = () => {
  const router = useRouter();
  const { user } = useUser({ redirectTo: '/' });
  const { client } = useSocketTest();
  client?.emit('events', { text: 'text' });
  devModeLog({ client, user });

  useEffect(() => {
    if (!client || !user?.isLoggedIn) return;

    client.on('test', (data: string) => devModeLog({ data }));
    const { id: userId } = user as IUserGetSuccessResponse;
    const props: any = {
      userId,
      roomId: String(router.query.id),
    };

    client.emit('join-chat-room', props);
    client.emit('events', { name: 'Nest' }, (data: string) => devModeLog(data));
  }, [router.query.id, client, user]);

  if (!user?.isLoggedIn) return null;
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
  try {
    const {
      data: { accessToken },
    } = await refreshAccessTokenApiSSR(headers);
    token.set({ accessToken });
    devModeLog('서버사이드에서 로그인이 연장처리 되었습니다.');

    const { data } = await apiClient.get<{
      message: boolean;
      statusCode: number;
    }>(`/api/chat/available/${id}`);
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
