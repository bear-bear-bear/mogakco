import { useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import CustomHead from '@components/common/CustomHead';
import Container from '@components/video-chat/Container';
import CamSection from '@components/video-chat/CamSection';
import ChatSection from '@components/video-chat/ChatSection';
import useUser from '@hooks/useUser';
import useSocket from '@hooks/useSocket';
import { refreshAccessTokenApiSSR } from '@lib/apis';
import { ACCESS_TOKEN, memoryStorage } from '@lib/token';
import apiClient, { logAxiosError } from '@lib/apiClient';
import devModeLog from '@lib/devModeLog';
import type { GeneralAxiosError, IGeneralServerResponse } from 'typings/common';
import type { IUserGetSuccessResponse } from 'typings/auth';

const pageProps = {
  title: '화상채팅 - Mogakco',
  description: 'Free online video chat for developers',
  url: '', // TODO: 도메인 정해지면 url에 추가하기
  locale: 'ko_KR',
};

const ChatRoom = () => {
  const router = useRouter();
  const { user } = useUser({ redirectTo: '/' });
  const socket = useSocket();
  socket?.emit('events', { text: 'text' });
  console.log({ socket });

  useEffect(() => {
    if (socket && user?.isLoggedIn) {
      socket.on('test', (data: string) => console.log('test: ', data));
      // TODO: 타입 다시 만들어야함 (cur: any)
      const { id } = user as IUserGetSuccessResponse;
      const props: any = {
        userId: id,
        roomId: String(router.query.id),
      };

      socket.emit('join-chat-room', props);
      socket.emit('events', { name: 'Nest' }, (data: string) =>
        console.log(data),
      );
    }
  }, [router.query.id, socket, user]);

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
    memoryStorage.set(ACCESS_TOKEN, accessToken);
    devModeLog('서버사이드에서 로그인이 연장처리 되었습니다.');

    const { data } = await apiClient.get<IGeneralServerResponse>(
      `/api/chat/available/${id}`,
    );
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
